"""
geocode_blocks.py — geocode all HDB block addresses using OneMap API.
Run once (or after adding new blocks). Outputs block_coords.json.

OneMap is Singapore's official mapping API — accurate for HDB addresses,
free, no API key required.

Usage:
    python geocode_blocks.py
"""

import csv, json, os, time, sys
import urllib.request, urllib.parse

SRC   = os.path.join(os.path.dirname(__file__), "resale_data.csv")
CACHE = os.path.join(os.path.dirname(__file__), "block_coords.json")

DELAY   = 0.05  # ~20 req/s — authenticated requests have no rate limit
RETRIES = 3
TOKEN   = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDEyOCwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Ik9uZU1hcCIsImlhdCI6MTc3OTExMjM1MywibmJmIjoxNzc5MTEyMzUzLCJleHAiOjE3NzkzNzE1NTMsImp0aSI6IjA3NzMyNGMwLTM3ZjktNDFiMC04NmQxLTc5ZTFlNmU2NzEwYiJ9.lovKoQR09b7uENt9y6GTd41_EA-X4oJ9qPUdv8ca7WQnQBHl_qx-UX1-h5tg9iTklOCxft3keuO9NJw2VKnKd0yXzFlYCwvWc8U80vFF5NDU_BZSR97WYEFtzzVb8pO1Vh5HI_fQB1YL_NTACj4ZpDR-TzbAZIHpgLRsJWHiBhQIoepC5Dr3KRFc_jqKoRMVeWyG2sb2xdIE4GAvg34B-zOk_NiiHhwdw_qAFPc4R101Vz6ojdyTDFCbQdBCYsgxS0wFwO0R5g2eVRm0scrlkOL2DLwoXBOOOkstS5YyqyNmiV_hejgYgMyvfGlEvHHSMfgBcwF18aYwGNu8jV5xHg"

def onemap_geocode(query):
    """Query OneMap search API with auth token. Returns (lat, lon) or None."""
    q = urllib.parse.quote(query)
    url = (
        "https://www.onemap.gov.sg/api/common/elastic/search"
        f"?searchVal={q}&returnGeom=Y&getAddrDetails=N&pageNum=1"
    )
    for attempt in range(RETRIES):
        try:
            req = urllib.request.Request(
                url, headers={
                    "User-Agent": "HDB-Dashboard/1.0",
                    "Authorization": TOKEN,
                }
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read())
                results = data.get("results", [])
                if results:
                    r = results[0]
                    return float(r["LATITUDE"]), float(r["LONGITUDE"])
                return None
        except Exception as e:
            code = getattr(e, "code", None)
            if code == 429:
                wait = 3 * (attempt + 1)
                print(f"  429 on '{query}' — waiting {wait}s", flush=True)
                time.sleep(wait)
            else:
                print(f"  Error '{query}': {e}")
                return None
    return None

# Load existing cache
cache = {}
if os.path.exists(CACHE):
    with open(CACHE, encoding="utf-8") as f:
        cache = json.load(f)
    print(f"Loaded {len(cache):,} cached entries from {CACHE}")

# Collect unique block+street pairs
print(f"Reading {SRC} ...")
combos = set()
with open(SRC, newline="", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        block  = r["block"].strip()
        street = r["street_name"].strip()
        combos.add((block, street))

print(f"  {len(combos):,} unique block+street combos")

missing = [(b, s) for (b, s) in sorted(combos) if f"{b}||{s}" not in cache]
print(f"  {len(missing):,} need geocoding  (ETA ~{len(missing)*DELAY/60:.0f} min at {1/DELAY:.1f} req/s)")

if not missing:
    print("Nothing to do — cache is complete.")
    sys.exit(0)

for i, (block, street) in enumerate(missing):
    key   = f"{block}||{street}"
    query = f"{block} {street} Singapore"
    result = onemap_geocode(query)
    time.sleep(DELAY)

    if not result:
        # Fallback: street only
        result = onemap_geocode(street + " Singapore")
        time.sleep(DELAY)

    cache[key] = list(result) if result else None

    if (i + 1) % 100 == 0 or (i + 1) == len(missing):
        with open(CACHE, "w", encoding="utf-8") as f:
            json.dump(cache, f, separators=(",", ":"))
        hits = sum(1 for v in cache.values() if v)
        pct  = (i + 1) / len(missing) * 100
        print(f"  [{i+1:,}/{len(missing):,}] {pct:.1f}%  hits={hits:,}", flush=True)

print(f"\nDone. Saved to {CACHE}")
hits   = sum(1 for v in cache.values() if v)
misses = sum(1 for v in cache.values() if not v)
print(f"  Hits: {hits:,}  |  Misses (town-centroid fallback): {misses:,}")
print("\nRun  python build_data.py  to rebuild resale_data.json with real coordinates.")
