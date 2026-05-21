"""
build_data.py — run once after each CSV update.
Reads resale_data.csv, outputs resale_data.json with all pre-aggregated
summaries the dashboard needs so the browser does zero heavy lifting.

Usage:
    python build_data.py
"""

import csv, json, math, os, sys, re
from collections import defaultdict

SRC    = os.path.join(os.path.dirname(__file__), "resale_data.csv")
DST    = os.path.join(os.path.dirname(__file__), "resale_data.json")
COORDS = os.path.join(os.path.dirname(__file__), "block_coords.json")

FLAT_ORDER = ["1 ROOM", "2 ROOM", "3 ROOM", "4 ROOM", "5 ROOM", "EXECUTIVE", "MULTI-GENERATION"]

# Real approximate lat/lon centroids for each town (used for Leaflet markers)
TOWN_COORDS = {
    "ANG MO KIO":      [1.3691, 103.8454],
    "BEDOK":           [1.3236, 103.9273],
    "BISHAN":          [1.3526, 103.8352],
    "BUKIT BATOK":     [1.3590, 103.7637],
    "BUKIT MERAH":     [1.2819, 103.8239],
    "BUKIT PANJANG":   [1.3774, 103.7719],
    "BUKIT TIMAH":     [1.3294, 103.7860],
    "CENTRAL AREA":    [1.2897, 103.8501],
    "CHOA CHU KANG":   [1.3840, 103.7470],
    "CLEMENTI":        [1.3162, 103.7649],
    "GEYLANG":         [1.3201, 103.8918],
    "HOUGANG":         [1.3612, 103.8863],
    "JURONG EAST":     [1.3329, 103.7436],
    "JURONG WEST":     [1.3404, 103.7090],
    "KALLANG/WHAMPOA": [1.3100, 103.8651],
    "MARINE PARADE":   [1.3023, 103.9071],
    "PASIR RIS":       [1.3721, 103.9494],
    "PUNGGOL":         [1.4043, 103.9021],
    "QUEENSTOWN":      [1.2942, 103.7861],
    "SEMBAWANG":       [1.4491, 103.8185],
    "SENGKANG":        [1.3868, 103.8914],
    "SERANGOON":       [1.3554, 103.8679],
    "TAMPINES":        [1.3530, 103.9450],
    "TOA PAYOH":       [1.3343, 103.8563],
    "WOODLANDS":       [1.4382, 103.7890],
    "YISHUN":          [1.4304, 103.8354],
}

REGION = {
    "ANG MO KIO": "North-East", "BEDOK": "East", "BISHAN": "Central",
    "BUKIT BATOK": "West", "BUKIT MERAH": "Central", "BUKIT PANJANG": "West",
    "BUKIT TIMAH": "Central", "CENTRAL AREA": "Central", "CHOA CHU KANG": "West",
    "CLEMENTI": "West", "GEYLANG": "East", "HOUGANG": "North-East",
    "JURONG EAST": "West", "JURONG WEST": "West", "KALLANG/WHAMPOA": "Central",
    "MARINE PARADE": "East", "PASIR RIS": "East", "PUNGGOL": "North-East",
    "QUEENSTOWN": "Central", "SEMBAWANG": "North", "SENGKANG": "North-East",
    "SERANGOON": "North-East", "TAMPINES": "East", "TOA PAYOH": "Central",
    "WOODLANDS": "North", "YISHUN": "North",
}

def lcd_band(lcd_year):
    return (lcd_year // 5) * 5

def percentile(data, p):
    if not data: return 0
    s = sorted(data)
    k = (len(s) - 1) * p / 100
    f, c = int(k), math.ceil(k)
    return s[f] if f == c else s[f] * (c - k) + s[c] * (k - f)

def median(data):
    return percentile(data, 50)

def fmt_name(town):
    return town.title().replace("Ang Mo Kio", "Ang Mo Kio").replace(
        "Kallang/Whampoa", "Kallang/Whampoa")

# Load geocoded block coordinates if available
block_coords = {}
if os.path.exists(COORDS):
    with open(COORDS, encoding="utf-8") as f:
        block_coords = json.load(f)
    hits = sum(1 for v in block_coords.values() if v)
    print(f"Loaded {hits:,} geocoded block coords from {COORDS}")
else:
    print(f"No {COORDS} found — run geocode_blocks.py for accurate block placement")

print(f"Reading {SRC} ...")
rows = []
with open(SRC, newline="", encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        price = round(float(r["resale_price"]))
        sqm   = float(r["floor_area_sqm"])
        # Parse remaining_lease to integer years (e.g. "61 years 04 months" -> 61)
        lease_str = r["remaining_lease"].strip()
        m_yr = re.match(r"(\d+)\s*year", lease_str)
        lease_yrs = int(m_yr.group(1)) if m_yr else None

        rows.append({
            "month":     r["month"],
            "town":      r["town"].strip().upper(),
            "type":      r["flat_type"].strip().upper(),
            "block":     r["block"].strip(),
            "street":    r["street_name"].strip(),
            "storey":    r["storey_range"].strip(),
            "sqm":       sqm,
            "model":     r["flat_model"].strip(),
            "lcd":       int(r["lease_commence_date"]),
            "lease":     lease_str,
            "lease_yrs": lease_yrs,
            "price":     price,
            "ppsqm":     round(price / sqm) if sqm else 0,
        })

print(f"  {len(rows):,} rows loaded")

towns = sorted(TOWN_COORDS.keys())
all_months = sorted(set(r["month"] for r in rows))
all_lease_years = sorted(set(r["lcd"] for r in rows))

# ── per-town monthly medians (for sparklines & town timeline) ──────────────
print("Building town monthly medians ...")
town_month_rows        = defaultdict(lambda: defaultdict(list))   # town -> month -> [row]
town_type_month_rows   = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))  # town -> type -> month -> [row]
for r in rows:
    town_month_rows[r["town"]][r["month"]].append(r)
    town_type_month_rows[r["town"]][r["type"]][r["month"]].append(r)

def storey_band(storey_str):
    """Return 'low'/'mid'/'high' from storey_range string like '07 TO 09'."""
    m = re.match(r"(\d+)", storey_str)
    if not m:
        return None
    fl = int(m.group(1))
    return "low" if fl <= 6 else "mid" if fl <= 12 else "high"

town_timeline = {}
for t in towns:
    tl = []
    for m in all_months:
        rs = town_month_rows[t].get(m, [])
        if not rs:
            tl.append({"m": m, "med": None})
            continue
        prices = [r["price"] for r in rs]
        ppsqms = [r["ppsqm"] for r in rs if r["ppsqm"]]
        leases = [r["lease_yrs"] for r in rs if r["lease_yrs"] is not None]
        storey_bands = {"low": [], "mid": [], "high": []}
        for r in rs:
            b = storey_band(r["storey"])
            if b:
                storey_bands[b].append(r["price"])
        row = {
            "m":   m,
            "med": round(median(prices) / 1000, 1),
            "vol": len(rs),
        }
        if ppsqms:
            row["ppsqm"] = round(median(ppsqms))
        if leases:
            row["med_lease"] = round(median(leases))
        for band, bps in storey_bands.items():
            if bps:
                row[f"storey_{band}"] = round(median(bps) / 1000, 1)
        tl.append(row)
    town_timeline[t] = tl

# per-town per-type timelines — include ppsqm and vol
town_type_timelines = {}
for t in towns:
    by_type = {}
    for ft in FLAT_ORDER:
        tl = []
        for m in all_months:
            rs = town_type_month_rows[t][ft].get(m, [])
            if not rs:
                tl.append({"m": m, "med": None})
                continue
            prices = [r["price"] for r in rs]
            ppsqms = [r["ppsqm"] for r in rs if r["ppsqm"]]
            row = {
                "m":   m,
                "med": round(median(prices) / 1000, 1),
                "vol": len(rs),
            }
            if ppsqms:
                row["ppsqm"] = round(median(ppsqms))
            tl.append(row)
        # only include if there are any data points
        if any(d["med"] is not None for d in tl):
            by_type[ft] = tl
    town_type_timelines[t] = by_type

# ── per-town per-LCD-band monthly timelines (for town page LCD filter) ───────
# Only emit towns/bands that have data. Each monthly row includes med, ppsqm, med_lease,
# storey_low/mid/high so the town page can slice by period AND by LCD band simultaneously.
print("Building town LCD-band timelines ...")
town_lcd_band_rows = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
# town -> lcd_band_start -> month -> [row]
for r in rows:
    band = lcd_band(r["lcd"])
    town_lcd_band_rows[r["town"]][band][r["month"]].append(r)

town_lcd_band_timelines = {}
for t in towns:
    by_band = {}
    for band_start, month_map in town_lcd_band_rows[t].items():
        tl = []
        for m in all_months:
            rs = month_map.get(m, [])
            if not rs:
                tl.append({"m": m, "med": None})
                continue
            prices = [r["price"] for r in rs]
            ppsqms = [r["ppsqm"] for r in rs if r["ppsqm"]]
            leases = [r["lease_yrs"] for r in rs if r["lease_yrs"] is not None]
            sbands = {"low": [], "mid": [], "high": []}
            for r in rs:
                b = storey_band(r["storey"])
                if b:
                    sbands[b].append(r["price"])
            row = {"m": m, "med": round(median(prices) / 1000, 1), "vol": len(rs)}
            if ppsqms:
                row["ppsqm"] = round(median(ppsqms))
            if leases:
                row["med_lease"] = round(median(leases))
            for bk, bps in sbands.items():
                if bps:
                    row[f"storey_{bk}"] = round(median(bps) / 1000, 1)
            tl.append(row)
        if any(d["med"] is not None for d in tl):
            by_band[str(band_start)] = tl
    if by_band:
        town_lcd_band_timelines[t] = by_band

print(f"  {sum(len(v) for v in town_lcd_band_timelines.values())} town×band combinations")

# ── per-town per-type per-LCD-band aggregate stats (compact, for flat type panel) ──
# Stores all-time med + ppsqm + vol per town×type×band.
# Size: ~26 towns × 6 types × ~12 bands ≈ tiny.
print("Building town type LCD-band stats ...")
town_type_lcd_rows = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))
# town -> type -> lcd_band_start -> [row]
for r in rows:
    band = lcd_band(r["lcd"])
    town_type_lcd_rows[r["town"]][r["type"]][band].append(r)

town_type_lcd_stats = {}
for t in towns:
    by_type = {}
    for ft in FLAT_ORDER:
        by_band = {}
        for band_start, rs in town_type_lcd_rows[t][ft].items():
            if not rs: continue
            prices = [r["price"] for r in rs]
            ppsqms = [r["ppsqm"] for r in rs if r["ppsqm"]]
            entry = {"med": round(median(prices) / 1000, 1), "vol": len(rs)}
            if ppsqms:
                entry["ppsqm"] = round(median(ppsqms))
            by_band[str(band_start)] = entry
        if by_band:
            by_type[ft] = by_band
    if by_type:
        town_type_lcd_stats[t] = by_type

# ── global monthly medians (for national timeline) ─────────────────────────
print("Building national timeline ...")
global_month_prices      = defaultdict(list)
global_type_month_prices = defaultdict(lambda: defaultdict(list))
for r in rows:
    global_month_prices[r["month"]].append(r["price"])
    global_type_month_prices[r["type"]][r["month"]].append(r["price"])

national_timeline = [
    {"m": m, "med": round(median(global_month_prices[m]) / 1000, 1), "vol": len(global_month_prices[m])}
    for m in all_months
]

# per-type national timelines
national_type_timelines = {}
for ft in FLAT_ORDER:
    tl = []
    for m in all_months:
        ps = global_type_month_prices[ft].get(m, [])
        tl.append({"m": m, "med": round(median(ps) / 1000, 1) if ps else None, "vol": len(ps)})
    if any(d["med"] is not None for d in tl):
        national_type_timelines[ft] = tl

# ── per-town summary (latest 3 months for current stats) ─────────────────
print("Building town summaries ...")
latest_months     = all_months[-3:]
last12_months     = all_months[-12:]
prev_year_months  = [m for m in all_months if
    all_months[-1][:4] != m[:4] and m >= all_months[-13]][-3:] if len(all_months) >= 13 else []
# For lease-decay warning: national % of last-12m txns with <60 yr remaining lease
nat_last12_rows   = [r for r in rows if r["month"] in last12_months]
nat_low_lease     = sum(1 for r in nat_last12_rows if r["lease_yrs"] is not None and r["lease_yrs"] < 60)
nat_low_lease_pct = round(nat_low_lease / len(nat_last12_rows) * 100, 1) if nat_last12_rows else 0

town_summaries = {}
for t in towns:
    latest_rows = [r for r in rows if r["town"] == t and r["month"] in latest_months]
    prev_rows   = [r for r in rows if r["town"] == t and r["month"] in prev_year_months]

    prices_now  = [r["price"]  for r in latest_rows]
    prices_prev = [r["price"]  for r in prev_rows]
    ppsqm_now   = [r["ppsqm"]  for r in latest_rows if r["ppsqm"]]

    med_now  = median(prices_now)
    med_prev = median(prices_prev)
    dpct = round((med_now - med_prev) / med_prev * 100, 1) if med_prev else 0.0

    # flat type mix (% of volume in latest 3 months)
    type_counts = defaultdict(int)
    for r in latest_rows:
        type_counts[r["type"]] += 1
    total = sum(type_counts.values()) or 1
    type_mix = {ft: round(type_counts[ft] / total * 100, 1) for ft in FLAT_ORDER if type_counts[ft]}

    # flat type median prices
    type_medians = {}
    for ft in FLAT_ORDER:
        ps = [r["price"] for r in latest_rows if r["type"] == ft]
        if ps:
            type_medians[ft] = round(median(ps) / 1000, 1)

    # price distribution (10 buckets, $300k–$1.5M+)
    BUCKETS = [300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1500]
    dist = [0] * (len(BUCKETS) + 1)
    for r in latest_rows:
        pk = r["price"] / 1000
        placed = False
        for i, b in enumerate(BUCKETS):
            if pk < b:
                dist[i] += 1
                placed = True
                break
        if not placed:
            dist[-1] += 1

    # storey premium (low 01-06, mid 07-12, high 13+)
    storey_meds = {}
    for band, label in [("01 TO 03|04 TO 06", "low"), ("07 TO 09|10 TO 12", "mid"), ("13 TO 15|16 TO 18|19 TO 21|high", "high")]:
        check = band.split("|")
        ps = [r["price"] for r in latest_rows
              if any(r["storey"].startswith(c[:5]) for c in check)
              or (label == "high" and r["storey"] >= "13")]
        if ps:
            storey_meds[label] = round(median(ps) / 1000, 1)

    # top blocks (most transactions in latest months)
    block_rows = defaultdict(list)
    for r in latest_rows:
        block_rows[(r["block"], r["street"])].append(r["price"])
    top_blocks = sorted(
        [{"block": k[0], "street": k[1], "med": round(median(v)/1000,1), "vol": len(v)}
         for k, v in block_rows.items()],
        key=lambda x: -x["vol"]
    )[:10]

    # last-12-month rows for velocity + lease profile + scatter
    last12_rows  = [r for r in rows if r["town"] == t and r["month"] in last12_months]
    vol_12m      = len(last12_rows)
    avg_monthly_12m = round(vol_12m / 12, 1)

    # Transaction velocity: 3m vs 12m monthly average
    velocity_status = "above" if len(latest_rows) > avg_monthly_12m else "below"

    # Lease profile histogram (last 12 months) — bucket by decade
    LEASE_BUCKETS = list(range(30, 100, 5))  # 30,35,40,...,95
    lease_hist = [0] * (len(LEASE_BUCKETS) + 1)
    low_lease_count = 0
    lease_vals = [r["lease_yrs"] for r in last12_rows if r["lease_yrs"] is not None]
    for ly in lease_vals:
        if ly < 60:
            low_lease_count += 1
        placed = False
        for i, b in enumerate(LEASE_BUCKETS):
            if ly < b:
                lease_hist[i] += 1
                placed = True
                break
        if not placed:
            lease_hist[-1] += 1
    low_lease_pct = round(low_lease_count / len(lease_vals) * 100, 1) if lease_vals else 0
    med_lease = round(median(lease_vals)) if lease_vals else None

    # Price vs size scatter (last 12 months, max 300 points)
    scatter_rows = sorted(last12_rows, key=lambda x: -x["price"])[:300]
    scatter = [{"x": r["sqm"], "y": round(r["price"]/1000,1), "t": r["type"]} for r in scatter_rows]

    # recent transactions (last 100) — include lease_yrs for flag + floor_area_sqm for $/sqm
    recent_txns = sorted(
        [r for r in rows if r["town"] == t],
        key=lambda x: x["month"],
        reverse=True
    )[:100]
    recent_out = [{"month": r["month"], "block": r["block"], "street": r["street"],
                   "type": r["type"], "sqm": r["sqm"], "storey": r["storey"],
                   "price": r["price"], "ppsqm": r["ppsqm"], "lcd": r["lcd"],
                   "lease_yrs": r["lease_yrs"],
                   "floor_area_sqm": r["sqm"]} for r in recent_txns]

    town_summaries[t] = {
        "id":              t,
        "name":            fmt_name(t),
        "region":          REGION.get(t, ""),
        "coords":          TOWN_COORDS.get(t, [1.35, 103.82]),
        "median":          round(med_now / 1000, 1),
        "median_prev":     round(med_prev / 1000, 1),
        "dpct":            dpct,
        "vol":             len(latest_rows),
        "vol_12m":         vol_12m,
        "avg_monthly_12m": avg_monthly_12m,
        "velocity":        velocity_status,
        "ppsqm":           round(median(ppsqm_now)) if ppsqm_now else 0,
        "p25":             round(percentile(prices_now, 25) / 1000, 1),
        "p75":             round(percentile(prices_now, 75) / 1000, 1),
        "type_mix":        type_mix,
        "type_medians":    type_medians,
        "price_dist":      dist,
        "dist_labels":     [f"<${b}k" for b in BUCKETS] + [f">${BUCKETS[-1]}k"],
        "storey_meds":     storey_meds,
        "top_blocks":      top_blocks,
        "recent_txns":     recent_out,
        "lease_hist":      lease_hist,
        "lease_hist_lbls": [f"{b}y" for b in LEASE_BUCKETS] + [f"{LEASE_BUCKETS[-1]}y+"],
        "low_lease_pct":   low_lease_pct,
        "med_lease":       med_lease,
        "scatter":         scatter,
    }

# ── per-block summary (for map zoom level) ────────────────────────────────
print("Building block summaries ...")
block_data     = defaultdict(lambda: defaultdict(list))
block_lcds     = defaultdict(set)
block_months   = defaultdict(list)
block_yr_vol   = defaultdict(lambda: defaultdict(int))  # key -> year -> count
block_type_vol = defaultdict(lambda: defaultdict(int))  # key -> type -> count
for r in rows:
    key = (r["town"], r["block"], r["street"])
    block_data[key][r["type"]].append(r["price"])
    block_lcds[key].add(r["lcd"])
    block_months[key].append(r["month"])
    block_yr_vol[key][r["month"][:4]] += 1
    block_type_vol[key][r["type"]] += 1

blocks_out = []
geocoded = 0
fallback = 0
for (town, block, street), type_prices in block_data.items():
    all_prices = [p for ps in type_prices.values() for p in ps]
    type_meds = {ft: round(median(ps)/1000, 1) for ft, ps in type_prices.items() if ps}
    town_coords = TOWN_COORDS.get(town)
    if not town_coords:
        continue
    key = f"{block}||{street}"
    real = block_coords.get(key)
    if real:
        coords = real
        geocoded += 1
    else:
        coords = town_coords
        fallback += 1
    lcds   = sorted(block_lcds[(town, block, street)])
    months = sorted(block_months[(town, block, street)])
    blocks_out.append({
        "town":       town,
        "block":      block,
        "street":     street,
        "coords":     coords,
        "med":        round(median(all_prices)/1000, 1),
        "vol":        len(all_prices),
        "types":      type_meds,
        "lcd":        lcds[0] if lcds else None,
        "first_txn":  months[0][:4] if months else None,
        "last_txn":   months[-1][:4] if months else None,
        "vol_by_year": dict(block_yr_vol[(town, block, street)]),
        "vol_by_type": dict(block_type_vol[(town, block, street)]),
    })
print(f"  Block coords: {geocoded:,} geocoded, {fallback:,} using town centroid fallback")

# ── lcd band timelines (5-year bands, for filtered national trend chart) ──
# Each transaction is bucketed into its 5-year LCD band (band start = floor to nearest 5).
# Monthly medians are computed per band. Bands with <5 transactions in a month get null.
# Frontend merges overlapping bands via volume-weighted median when slider is active.
print("Building LCD band timelines ...")
LCD_BAND_MIN_TXN = 5  # suppress noisy months below this count

def lcd_band(lcd_year):
    return (lcd_year // 5) * 5

lcd_band_month_prices      = defaultdict(lambda: defaultdict(list))        # band -> month -> [prices]
lcd_band_type_month_prices = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))  # band -> type -> month -> [prices]
for r in rows:
    band = lcd_band(r["lcd"])
    lcd_band_month_prices[band][r["month"]].append(r["price"])
    lcd_band_type_month_prices[band][r["type"]][r["month"]].append(r["price"])

lcd_band_timelines = {}
for band_start in sorted(lcd_band_month_prices.keys()):
    tl = []
    for m in all_months:
        ps = lcd_band_month_prices[band_start].get(m, [])
        med_val = round(median(ps) / 1000, 1) if len(ps) >= LCD_BAND_MIN_TXN else None
        tl.append({"m": m, "med": med_val, "vol": len(ps)})
    if any(d["med"] is not None for d in tl):
        lcd_band_timelines[str(band_start)] = tl

# Per-type breakdown within each LCD band (for flat type + LCD combined filtering)
lcd_band_type_timelines = {}
for band_start in sorted(lcd_band_type_month_prices.keys()):
    by_type = {}
    for ft in FLAT_ORDER:
        tl = []
        for m in all_months:
            ps = lcd_band_type_month_prices[band_start][ft].get(m, [])
            med_val = round(median(ps) / 1000, 1) if len(ps) >= LCD_BAND_MIN_TXN else None
            tl.append({"m": m, "med": med_val, "vol": len(ps)})
        if any(d["med"] is not None for d in tl):
            by_type[ft] = tl
    if by_type:
        lcd_band_type_timelines[str(band_start)] = by_type

print(f"  {len(lcd_band_timelines)} LCD bands: {sorted(int(k) for k in lcd_band_timelines)}")
print(f"  {sum(len(v) for v in lcd_band_type_timelines.values())} LCD band×type combinations")

# ── price range stats (for filter sliders) ────────────────────────────────
all_prices = [r["price"] for r in rows]
price_stats = {
    "min":  min(all_prices),
    "max":  max(all_prices),
    "p5":   round(percentile(all_prices, 5)),
    "p95":  round(percentile(all_prices, 95)),
}

# ── assemble output ────────────────────────────────────────────────────────
output = {
    "generated":            all_months[-1],
    "total_txns":           len(rows),
    "nat_low_lease_pct":    nat_low_lease_pct,
    "date_range":        [all_months[0], all_months[-1]],
    "months":            all_months,
    "towns":             towns,
    "flat_types":        FLAT_ORDER,
    "lease_years":       all_lease_years,
    "price_stats":       price_stats,
    "national_timeline":       national_timeline,
    "national_type_timelines": national_type_timelines,
    "lcd_band_timelines":      lcd_band_timelines,
    "lcd_band_type_timelines": lcd_band_type_timelines,
    "town_summaries":          town_summaries,
    "town_timelines":          town_timeline,
    "town_type_timelines":     town_type_timelines,
    "town_lcd_band_timelines": town_lcd_band_timelines,
    "town_type_lcd_stats":     town_type_lcd_stats,
    "blocks":                  blocks_out,
}

print(f"Writing {DST} ...")
with open(DST, "w", encoding="utf-8") as f:
    json.dump(output, f, separators=(",", ":"))

size_mb = os.path.getsize(DST) / 1_048_576
print(f"Done — {DST} ({size_mb:.1f} MB, {len(rows):,} transactions)")
