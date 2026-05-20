/* ═══════════════════════════════════════════════════════════════════════════
   HDB Resale Atlas — main application
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Amenities data (curated real entries per town) ─────────────────────── */
const AMENITIES = {
  "ANG MO KIO": {
    mrt: ["Ang Mo Kio (NS16)", "Yio Chu Kang (NS15)", "Mayflower (TE6)", "Lentor (TE5)"],
    hawker: ["Blk 226D AMK Ave 1 Market", "Blk 724 AMK Ave 6", "Mayflower Market & FC", "Kebun Baru Market"],
    parks: ["Bishan-Ang Mo Kio Park", "Lower Peirce Reservoir Park", "AMK Town Garden"],
    schools: ["CHIJ St Nicholas Girls'", "Anderson Primary", "Anderson Serangoon JC", "Mayflower Primary", "Peirce Secondary"]
  },
  "BEDOK": {
    mrt: ["Bedok (EW5)", "Bedok North (DT29)", "Bedok Reservoir (DT30)", "Tanah Merah (EW4)", "Kembangan (EW6)"],
    hawker: ["Bedok Interchange Hawker Centre", "Bedok 85 Fengshan FC", "Bedok 511 FC", "Bedok South Rd 16", "Chai Chee FC"],
    parks: ["Bedok Reservoir Park", "East Coast Park", "Tampines Quarry Park"],
    schools: ["Red Swastika School", "Yu Neng Primary", "Anglican High", "Temasek Secondary", "Bedok View Secondary"]
  },
  "BISHAN": {
    mrt: ["Bishan (NS17 / CC15)", "Marymount (CC16)", "Bright Hill (TE7)", "Upper Thomson (TE8)"],
    hawker: ["Blk 510 Bishan St 13", "Junction 8 Food Courts", "Bishan Bus Interchange FC"],
    parks: ["Bishan-Ang Mo Kio Park", "MacRitchie Reservoir Park", "Lower Peirce Reservoir Park"],
    schools: ["Raffles Institution", "Catholic High School", "Ai Tong School", "Kuo Chuan Presbyterian", "Catholic JC"]
  },
  "BUKIT BATOK": {
    mrt: ["Bukit Batok (NS2)", "Bukit Gombak (NS3)", "Hillview (DT3)"],
    hawker: ["Bukit Batok West Ave 6 Mkt", "Blk 511 Bukit Batok St 52", "Bukit Batok East Ave 4"],
    parks: ["Bukit Batok Nature Park", "Bukit Batok Town Park (Little Guilin)", "Bukit Timah Hill (border)"],
    schools: ["Bukit View Primary & Secondary", "Bukit Batok Secondary", "Princess Elizabeth Primary", "Lianhua Primary"]
  },
  "BUKIT MERAH": {
    mrt: ["Tiong Bahru (EW17)", "Outram Park (EW16/NE3/TE17)", "Tanjong Pagar (EW15)", "HarbourFront (NE1/CC29)", "Labrador Park (CC27)"],
    hawker: ["ABC Brickworks Market & FC", "Bukit Merah View Mkt", "Tiong Bahru Market", "Redhill Lane Blk 85 FC"],
    parks: ["Mount Faber Park", "Telok Blangah Hill Park", "Labrador Nature Reserve", "Henderson Waves"],
    schools: ["Gan Eng Seng Primary & Secondary", "Radin Mas Primary", "Cantonment Primary", "CHIJ Kellock"]
  },
  "BUKIT PANJANG": {
    mrt: ["Bukit Panjang (DT1/BP6)", "Cashew (DT2)", "Senja (BP5)", "Jelapang (BP4)", "Petir (BP3)"],
    hawker: ["Bukit Panjang Hawker Centre", "Senja Hawker Centre"],
    parks: ["Bukit Panjang Park", "Zhenghua Park", "Bukit Timah Nature Reserve (border)"],
    schools: ["Bukit Panjang Primary", "Bukit Panjang Govt High", "Greenridge Primary & Secondary", "CHIJ OLQP"]
  },
  "BUKIT TIMAH": {
    mrt: ["King Albert Park (DT6)", "Beauty World (DT5)", "Hillview (DT3)", "Botanic Gardens (CC19/DT9)"],
    hawker: ["Bukit Timah Market & FC", "Cheong Chin Nam Rd FC"],
    parks: ["Bukit Timah Nature Reserve", "Hindhede Nature Park", "Dairy Farm Nature Park"],
    schools: ["Methodist Girls' School", "Hwa Chong Institution", "National Junior College", "Pei Hwa Presbyterian Primary"]
  },
  "CENTRAL AREA": {
    mrt: ["City Hall (EW13/NS25)", "Raffles Place (EW14/NS26)", "Bugis (EW12/DT14)", "Marina Bay (NS27/CE2/TE20)", "Bayfront (CE1/DT16)", "Clarke Quay (NE5)"],
    hawker: ["Maxwell Food Centre", "Chinatown Complex Mkt", "Amoy Street Food Centre", "Lau Pa Sat", "Hong Lim Market"],
    parks: ["Fort Canning Park", "Esplanade Park", "Gardens by the Bay", "Marina Bay Waterfront"],
    schools: ["Stamford Primary", "River Valley Primary", "SMU", "LASALLE", "School of the Arts (SOTA)"]
  },
  "CHOA CHU KANG": {
    mrt: ["Choa Chu Kang (NS4/BP1)", "Yew Tee (NS5)", "Keat Hong (BP2)", "Teck Whye (BP13)"],
    hawker: ["Choa Chu Kang Ave 4 Hawker Centre", "Yew Tee Square FC", "Blk 304 Choa Chu Kang Ave 4"],
    parks: ["Choa Chu Kang Park", "Pang Sua Park", "Little Guilin (border)"],
    schools: ["Concord Primary", "South View Primary", "Unity Primary & Secondary", "Kranji Secondary"]
  },
  "CLEMENTI": {
    mrt: ["Clementi (EW23)", "Dover (EW22)", "Kent Ridge (CC24)", "one-north (CC23)"],
    hawker: ["Clementi 448 Market & FC", "Clementi 353 Market", "Ayer Rajah Food Centre"],
    parks: ["West Coast Park", "Kent Ridge Park", "Clementi Woods Park"],
    schools: ["NUS", "ACS (Independent)", "Nan Hua Primary & High", "Clementi Primary & Secondary", "Pei Tong Primary"]
  },
  "GEYLANG": {
    mrt: ["Aljunied (EW9)", "Paya Lebar (EW8/CC9)", "Dakota (CC8)", "Mountbatten (CC7)"],
    hawker: ["Old Airport Road Food Centre", "Geylang Serai Market", "Haig Road FC", "Dunman FC", "Sims Vista Blk 49"],
    parks: ["Geylang Park Connector"],
    schools: ["Geylang Methodist Primary & Secondary", "Kong Hwa School", "Maha Bodhi School", "Canossa Catholic Primary"]
  },
  "HOUGANG": {
    mrt: ["Hougang (NE14)", "Kovan (NE13)", "Buangkok (NE15)"],
    hawker: ["Hainanese Village Centre", "Hougang Ave 6 Blk 105 FC", "Kovan 209 FC", "Hougang Ave 1 Blk 22"],
    parks: ["Hougang Neighbourhood Park", "Punggol Park (border)", "Sungei Punggol"],
    schools: ["Holy Innocents' Primary & High", "Hougang Primary", "Xinmin Secondary", "Yio Chu Kang Secondary"]
  },
  "JURONG EAST": {
    mrt: ["Jurong East (EW24/NS1)", "Chinese Garden (EW25)", "Lakeside (EW26)"],
    hawker: ["Yuhua Market & Hawker Centre", "Jurong East St 31 Blk 347 FC"],
    parks: ["Jurong Lake Gardens", "Chinese Garden", "Japanese Garden"],
    schools: ["Yuhua Primary", "Crest Secondary", "Fuhua Primary & Secondary", "Yuying Secondary"]
  },
  "JURONG WEST": {
    mrt: ["Boon Lay (EW27)", "Lakeside (EW26)", "Pioneer (EW28)", "Joo Koon (EW29)", "Tuas Link (EW33)"],
    hawker: ["Taman Jurong Market & FC", "Yuhua Market", "Boon Lay Place Market & FC", "Blk 505 Jurong West St 52"],
    parks: ["Jurong Lake Gardens", "Jurong Central Park", "Bukit Batok Bird Park"],
    schools: ["Westwood Primary & Secondary", "Pioneer Primary & Secondary", "Rulang Primary", "Boon Lay Garden Primary"]
  },
  "KALLANG/WHAMPOA": {
    mrt: ["Kallang (EW10)", "Lavender (EW11)", "Bendemeer (DT23)", "Boon Keng (NE9)", "Stadium (CC6)", "Mountbatten (CC7)"],
    hawker: ["Kallang Estate Fresh Market", "Pek Kio Market & FC", "Boon Keng Blk 22 FC", "Crawford Lane FC"],
    parks: ["Kallang Riverside Park", "Stadium Waterfront", "Toa Payoh Park (border)"],
    schools: ["Bendemeer Primary & Secondary", "Hong Wen School", "St Andrew's Sec & JC", "Stamford Primary"]
  },
  "MARINE PARADE": {
    mrt: ["Marine Parade (TE26)", "Marine Terrace (TE27)", "Katong Park (TE24)", "Tanjong Katong (TE25)"],
    hawker: ["Marine Parade Central Market & FC", "Marine Terrace Blk 50 FC"],
    parks: ["East Coast Park", "Marine Cove"],
    schools: ["Tanjong Katong Primary", "CHIJ Katong Primary", "Tao Nan School", "Haig Girls' School", "Tanjong Katong Girls' & Secondary"]
  },
  "PASIR RIS": {
    mrt: ["Pasir Ris (EW1)", "Tampines East (DT33)"],
    hawker: ["Loyang Point FC", "Pasir Ris Central Hawker Centre"],
    parks: ["Pasir Ris Park", "Pasir Ris Town Park", "Tampines Eco Green"],
    schools: ["Pasir Ris Primary", "Casuarina Primary", "Loyang View Secondary", "Pasir Ris Secondary"]
  },
  "PUNGGOL": {
    mrt: ["Punggol (NE17/PTC)", "Punggol Coast (NE18)", "Sam Kee (PW1)", "Nibong (PW2)", "Samudera (PW3)"],
    hawker: ["Oasis Terraces Hawker Centre", "Northshore Hawker Centre", "Waterway Point Food Court"],
    parks: ["Punggol Waterway Park", "Punggol Point Park", "Coney Island Park"],
    schools: ["Punggol Cove Primary", "Punggol Primary", "Edgefield Primary & Secondary", "Greendale Primary"]
  },
  "QUEENSTOWN": {
    mrt: ["Queenstown (EW19)", "Commonwealth (EW20)", "Redhill (EW18)", "Holland Village (CC21)", "one-north (CC23)"],
    hawker: ["Tanglin Halt FC", "Alexandra Village FC", "Mei Ling Market & FC", "Holland Village Market"],
    parks: ["HortPark", "Telok Blangah Hill Park", "Southern Ridges", "Labrador Nature Reserve (border)"],
    schools: ["Queenstown Primary", "Queensway Secondary", "NUS High School", "Anglo-Chinese JC"]
  },
  "SEMBAWANG": {
    mrt: ["Sembawang (NS11)", "Canberra (NS12)"],
    hawker: ["Sembawang Hills Food Centre", "Canberra Market & FC", "Sun Plaza FC"],
    parks: ["Sembawang Park", "Sembawang Hot Spring Park"],
    schools: ["Sembawang Primary", "Wellington Primary", "Canberra Primary & Secondary", "Sembawang Secondary"]
  },
  "SENGKANG": {
    mrt: ["Sengkang (NE16/STC)", "Buangkok (NE15)", "Compassvale (STC1)", "Rumbia (STC2)", "Bakau (STC3)"],
    hawker: ["Sengkang Hawker Centre (Anchorvale)", "Compass One Food Court", "Blk 211 Sengkang Central FC"],
    parks: ["Sengkang Riverside Park", "Anchorvale Community Park", "Punggol Park"],
    schools: ["Compassvale Primary & Secondary", "Nan Chiau High", "Springdale Primary", "Sengkang Secondary"]
  },
  "SERANGOON": {
    mrt: ["Serangoon (NE12/CC13)", "Lorong Chuan (CC14)", "Bartley (CC12)", "Woodleigh (NE11)"],
    hawker: ["Serangoon Garden Market", "Chomp Chomp Food Centre"],
    parks: ["Serangoon Park", "Bartley Park Connector", "Bishan-AMK Park (border)"],
    schools: ["Maris Stella High", "Rosyth School", "Paya Lebar Methodist Girls'", "Zhonghua Secondary"]
  },
  "TAMPINES": {
    mrt: ["Tampines (EW2/DT32)", "Tampines West (DT31)", "Tampines East (DT33)", "Simei (EW3)"],
    hawker: ["Tampines Round Market Blk 137", "Our Tampines Hub Hawker", "Blk 201 Tampines St 21"],
    parks: ["Tampines Eco Green", "Bedok Reservoir Park (border)", "Sun Plaza Park"],
    schools: ["Temasek Polytechnic", "Temasek Primary", "St Hilda's Primary & Secondary", "Junyuan Primary"]
  },
  "TOA PAYOH": {
    mrt: ["Toa Payoh (NS19)", "Braddell (NS18)", "Caldecott (CC17/TE9)", "Potong Pasir (NE10)"],
    hawker: ["Toa Payoh West Market & FC", "Lor 8 Toa Payoh Blk 22 FC", "Lor 4 Blk 75 FC", "Lor 1 Blk 127 FC", "Kim Keat Palm Market"],
    parks: ["Toa Payoh Town Park", "Toa Payoh Park", "Braddell Heights Park"],
    schools: ["CHIJ Toa Payoh Primary & Secondary", "Pei Chun Public School", "First Toa Payoh Primary", "Beatty Secondary"]
  },
  "WOODLANDS": {
    mrt: ["Woodlands (NS9/TE2)", "Marsiling (NS8)", "Admiralty (NS10)", "Woodlands North (TE1)", "Woodlands South (TE3)"],
    hawker: ["Kampung Admiralty Hawker Centre", "Marsiling Mall Hawker Centre", "Woodlands St 12 Blk 768 FC"],
    parks: ["Admiralty Park", "Woodlands Waterfront Park", "Marsiling Park"],
    schools: ["Woodgrove Secondary", "Christ Church Secondary", "Si Ling Primary", "Woodlands Primary", "Republic Polytechnic"]
  },
  "YISHUN": {
    mrt: ["Yishun (NS13)", "Khatib (NS14)", "Springleaf (TE4)", "Lentor (TE5)"],
    hawker: ["Chong Pang Market & FC", "Yishun Park Hawker Centre", "Northpoint City FC"],
    parks: ["Yishun Park", "Yishun Pond Park", "Lower Seletar Reservoir Park"],
    schools: ["Chongfu School", "Naval Base Primary", "Northland Secondary", "Yishun Innova JC", "Ahmad Ibrahim Primary"]
  },
};

/* ── Price tier colours ─────────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════════════════
   SHORTLIST
   ══════════════════════════════════════════════════════════════════════════ */
const SHORTLIST_KEY = "hdb-atlas-shortlist-v1";
const _shortlist = {
  items: new Set(JSON.parse(localStorage.getItem(SHORTLIST_KEY) || "[]")),
  save() { localStorage.setItem(SHORTLIST_KEY, JSON.stringify([...this.items])); },
  toggle(id) { if (this.items.has(id)) this.items.delete(id); else this.items.add(id); this.save(); updateShortlistUI(); },
  has(id) { return this.items.has(id); },
  toArray() { return [...this.items]; }
};

function updateShortlistUI() {
  const count = _shortlist.items.size;
  const pill = document.getElementById("shortlistPillBtn");
  const cnt = document.getElementById("shortlistCount");
  if (!pill) return;
  pill.classList.toggle("has-items", count > 0);
  if (cnt) { cnt.style.display = count > 0 ? "" : "none"; cnt.textContent = count; }
  renderShortlistDrawer();
  document.querySelectorAll(".star-btn[data-town]").forEach(btn => {
    btn.classList.toggle("starred", _shortlist.has(btn.dataset.town));
  });
}

function renderShortlistDrawer() {
  const body = document.getElementById("shortlistDrawerBody");
  const footer = document.getElementById("shortlistDrawerFooter");
  if (!body) return;
  const ids = _shortlist.toArray();
  if (ids.length === 0) {
    body.innerHTML = `<div class="shortlist-empty"><div class="shortlist-empty-icon">★</div>Star towns on the map to save them here</div>`;
    if (footer) footer.style.display = "none";
    return;
  }
  if (footer) footer.style.display = "";
  const rows = ids.map(id => {
    const s = DB?.town_summaries?.[id];
    const color = s ? tierColor(s.median) : "#6e6b63";
    const price = s ? fmtKs(s.median) : "—";
    return `<div class="shortlist-item">
      <span class="shortlist-item-dot" style="background:${color}"></span>
      <span class="shortlist-item-name">${id}</span>
      <span class="shortlist-item-price">${price}</span>
      <button class="shortlist-item-remove" onclick="_shortlist.toggle('${id}');updateShortlistUI()" title="Remove">✕</button>
    </div>`;
  }).join("");
  body.innerHTML = rows;
}

window.toggleShortlistDrawer = function() {
  const drawer = document.getElementById("shortlistDrawer");
  const backdrop = document.getElementById("shortlistBackdrop");
  const isOpen = drawer.classList.toggle("open");
  if (backdrop) backdrop.classList.toggle("open", isOpen);
  if (isOpen) renderShortlistDrawer();
};

window.shortlistToCompare = function() {
  const ids = _shortlist.toArray().slice(0, 3);
  state.compareSlots = ids;
  compareState.mode = "town";
  window.toggleShortlistDrawer();
  showView("compare");
};

/* ══════════════════════════════════════════════════════════════════════════
   FILTER BAR (horizontal, desktop)
   ══════════════════════════════════════════════════════════════════════════ */
function initLeaseYearPicker() {
  const minSel = document.getElementById("leaseMinSelect");
  const maxSel = document.getElementById("leaseMaxSelect");
  if (!minSel || !maxSel) return;
  const minYear = 1960, maxYear = 2030;
  minSel.innerHTML = `<option value="${minYear}">All years</option>` +
    Array.from({length: maxYear - minYear}, (_, i) => minYear + i + 1)
      .map(y => `<option value="${y}">${y}</option>`).join("");
  maxSel.innerHTML = Array.from({length: maxYear - minYear}, (_, i) => minYear + i)
      .map(y => `<option value="${y}">${y}</option>`).join("") +
    `<option value="${maxYear}" selected>Present</option>`;
}

window.fbLeaseMinChange = function(val) {
  const y = +val;
  state.filters.minLease = y;
  const maxSel = document.getElementById("leaseMaxSelect");
  if (maxSel && +maxSel.value < y) { maxSel.value = y; state.filters.maxLease = y; }
  updateMapMarkers();
  renderDataBadge();
  updateFbTxnCount();
  renderPulsePanel();
};

window.fbLeaseMaxChange = function(val) {
  const y = +val;
  state.filters.maxLease = y;
  const minSel = document.getElementById("leaseMinSelect");
  if (minSel && +minSel.value > y) { minSel.value = y; state.filters.minLease = y; }
  updateMapMarkers();
  renderDataBadge();
  updateFbTxnCount();
  renderPulsePanel();
};

window.fbTxnChip = function(btn, minY, maxY) {
  document.querySelectorAll("#txnYearChips .fb-year-chip").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  state.filters.minTxnYear = minY;
  state.filters.maxTxnYear = maxY;
  updateMapMarkers();
  renderDataBadge();
  updateFbTxnCount();
  renderPulsePanel();
};

function updateFbTxnCount() {
  const el = document.getElementById("fbTxnCount");
  if (!el) return;
  const count = countFilteredTxns();
  el.innerHTML = `<strong>${count.toLocaleString()}</strong> txns`;
}

function renderPulsePanel() {
  const body = document.getElementById("pulsePanelBody");
  if (!body || !DB) return;

  const f = state.filters;
  const hasTypeFilter  = f.types.length > 0;
  const hasLeaseFilter = f.minLease > 1960 || f.maxLease < 2030;
  const isFiltered     = hasTypeFilter || hasLeaseFilter || (f.minTxnYear !== 2017 || f.maxTxnYear !== 2026);

  // Build array with id attached; apply type filter if active
  let towns = Object.entries(DB.town_summaries).map(([id, s]) => ({ ...s, _id: id }));
  if (hasTypeFilter) {
    towns = towns.filter(t => f.types.some(ft => t.type_medians && t.type_medians[ft]));
  }

  // Compute per-town median from timeline entries in the selected txn year range
  function txnYearMedian(townId) {
    const tl = DB.town_timelines?.[townId] || [];
    const entries = tl.filter(d => {
      const y = parseInt(d.m);
      return y >= f.minTxnYear && y <= f.maxTxnYear && d.med != null;
    });
    if (!entries.length) return null;
    const prices = entries.map(d => d.med).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  }

  // Compute per-town filtered median: txn year first, then type overlay
  function filteredMedian(t) {
    let base = txnYearMedian(t._id) ?? t.median;
    if (hasTypeFilter) {
      const vals = f.types.map(ft => t.type_medians?.[ft]).filter(Boolean);
      if (vals.length) base = Math.round(vals.reduce((a, v) => a + v, 0) / vals.length);
    }
    return base;
  }

  // Compute per-town filtered vol for txn year filter (use vol_by_year if available)
  function filteredVol(t) {
    if (!t.vol_by_year) return t.vol;
    let v = 0;
    for (let y = f.minTxnYear; y <= f.maxTxnYear; y++) v += (t.vol_by_year[y] || 0);
    return v;
  }

  // dpct from timeline: compare last entry in range vs first entry in range
  function filteredDpct(t) {
    const tl = DB.town_timelines?.[t._id] || [];
    const inRange = tl.filter(d => { const y = parseInt(d.m); return y >= f.minTxnYear && y <= f.maxTxnYear && d.med != null; });
    if (inRange.length < 2) return t.dpct || 0;
    const last = inRange[inRange.length - 1].med;
    const prev = inRange[0].med;
    return prev > 0 ? ((last - prev) / prev * 100) : 0;
  }

  const sorted_med  = [...towns].sort((a, b) => filteredMedian(a) - filteredMedian(b));
  const sorted_gain = [...towns].sort((a, b) => filteredDpct(b) - filteredDpct(a));
  const sorted_vol  = [...towns].sort((a, b) => filteredVol(b) - filteredVol(a));

  const budMin = f.budgetMin;
  const budMax = f.budgetMax;
  const hasBudget = budMin > 0 || (budMax < 9999 && budMax > 0);

  const natMedianVals = towns.map(t => filteredMedian(t)).filter(Boolean);
  const natMedian = natMedianVals.length ? Math.round(natMedianVals.reduce((a, v) => a + v, 0) / natMedianVals.length) : 0;

  // nat12m: compare avg median of last month in range vs 12m prior
  const nat12m = (() => {
    const tls = Object.entries(DB.town_timelines || {});
    const lastInRange = tls.map(([, tl]) => {
      const e = [...tl].reverse().find(d => parseInt(d.m) <= f.maxTxnYear && d.med != null);
      return e?.med;
    }).filter(Boolean);
    const prevInRange = tls.map(([, tl]) => {
      const e = [...tl].reverse().find(d => parseInt(d.m) <= f.maxTxnYear - 1 && d.med != null);
      return e?.med;
    }).filter(Boolean);
    if (!lastInRange.length || !prevInRange.length) return 0;
    const l = lastInRange.reduce((a, v) => a + v, 0) / lastInRange.length;
    const p = prevInRange.reduce((a, v) => a + v, 0) / prevInRange.length;
    return p > 0 ? ((l - p) / p * 100) : 0;
  })();

  const filterTag = isFiltered ? `<span class="pulse-filter-tag">Filtered</span>` : "";

  const rowHtml = (arr, valFn, dpctFn) => arr.slice(0, 5).map((t, i) => {
    const dpct = dpctFn ? dpctFn(t) : null;
    const pillCls = dpct !== null ? (dpct >= 0 ? 'up' : 'down') : null;
    return `<button class="pulse-row" onclick="openTownDrawer('${t._id}')">
      <span class="pulse-row-rank">${i + 1}</span>
      <span class="pulse-row-name">${t.name || t._id}</span>
      <span class="pulse-row-val">${valFn(t)}</span>
      ${pillCls ? `<span class="pulse-row-pill ${pillCls}">${dpct >= 0 ? '+' : ''}${dpct.toFixed(1)}%</span>` : ''}
    </button>`;
  }).join("");

  const gainTitle = f.minTxnYear === f.maxTxnYear ? `Price change in ${f.minTxnYear}` : `Biggest movers (${f.minTxnYear}–${f.maxTxnYear})`;

  const budgetSection = hasBudget ? `
    <div>
      <div class="pulse-section-title">In your budget (${fmtKs(budMin)}–${fmtKs(budMax)})</div>
      <div class="pulse-list">${rowHtml(
        sorted_med.filter(t => (!budMin || filteredMedian(t) >= budMin) && (!budMax || budMax >= 9999 || filteredMedian(t) <= budMax)),
        t => fmtKs(filteredMedian(t)), null
      )}</div>
    </div>` : `
    <div>
      <div class="pulse-section-title">Most affordable</div>
      <div class="pulse-list">${rowHtml(sorted_med, t => fmtKs(filteredMedian(t)), null)}</div>
    </div>
    <div>
      <div class="pulse-section-title">${gainTitle}</div>
      <div class="pulse-list">${rowHtml(sorted_gain, t => fmtKs(filteredMedian(t)), t => filteredDpct(t))}</div>
    </div>
    <div>
      <div class="pulse-section-title">Most active (vol)</div>
      <div class="pulse-list">${rowHtml(sorted_vol, t => `${filteredVol(t)} sales`, null)}</div>
    </div>`;

  body.innerHTML = `
    <div class="pulse-stat-grid">
      <div class="pulse-stat">
        <div class="pulse-stat-label">Nat'l median ${filterTag}</div>
        <div class="pulse-stat-value">${fmtKs(natMedian)}</div>
        <div class="pulse-stat-sub">${nat12m >= 0 ? '+' : ''}${nat12m.toFixed(1)}% 12m</div>
      </div>
      <div class="pulse-stat">
        <div class="pulse-stat-label">Matching towns</div>
        <div class="pulse-stat-value">${towns.length}</div>
        <div class="pulse-stat-sub">${isFiltered ? "after filters" : "all regions"}</div>
      </div>
    </div>
    ${budgetSection}`;
}

window.togglePulsePanel = function() {
  const panel = document.getElementById("pulsePanel");
  const openBtn = document.getElementById("pulseOpenBtn");
  const isHidden = panel.classList.toggle("hidden");
  if (openBtn) openBtn.style.display = isHidden ? "flex" : "none";
  const legend = document.getElementById("mapLegend");
  if (legend) legend.classList.toggle("no-rail", isHidden);
};

function tierColor(medK) {
  if (medK < 400)  return "#34d399"; // green
  if (medK < 600)  return "#60a5fa"; // blue
  if (medK < 800)  return "#a78bfa"; // violet
  if (medK < 1000) return "#fb923c"; // orange
  return "#f87171";                   // red
}
function tierLabel(medK) {
  if (medK < 400)  return "< $400k";
  if (medK < 600)  return "$400–600k";
  if (medK < 800)  return "$600–800k";
  if (medK < 1000) return "$800k–$1M";
  return "> $1M";
}

/* ── Formatters ─────────────────────────────────────────────────────────── */
const fmtK  = n => n >= 1000 ? `$${(n/1000).toFixed(2)}M` : `$${Number(n).toFixed(2)}k`;
const fmtKs = n => `$${Number(n).toFixed(2)}k`;
const fmtPct = n => (n >= 0 ? "+" : "") + n.toFixed(1) + "%";
const fmtMonth = m => {
  const [y, mo] = m.split("-");
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][+mo-1] + " '" + y.slice(2);
};

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
const Icons = {
  map:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>`,
  compare: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M8 7L4 11l4 4"/><path d="M16 17l4-4-4-4"/></svg>`,
  trends:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-8 4 6 4-4"/></svg>`,
  filter:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18M6 12h12M10 19h4"/></svg>`,
  back:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`,
  close:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  plus:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  mrt:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="13" rx="3"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/><path d="M6 20l3-3M18 20l-3-3"/></svg>`,
  hawker:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l1-7h16l1 7"/><path d="M3 11h18v2a7 7 0 0 1-14 0v-2z"/><path d="M12 13v6M8 19h8"/></svg>`,
  park:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-4 6h2.5l-3 5h3l-2 4h7l-2-4h3l-3-5H16z"/></svg>`,
  school:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11v5c2 2 8 2 10 0v-5"/></svg>`,
  search:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  layers:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
};

/* ── Sparkline SVG (no canvas, no Chart.js, pure SVG) ──────────────────── */
function sparklineSVG(data, opts = {}) {
  const { w = 300, h = 80, color = "var(--accent)", fill = true, dots = false, axis = false } = opts;
  const valid = data.filter(d => d.med != null);
  if (valid.length < 2) return `<svg width="${w}" height="${h}"></svg>`;
  const vals = valid.map(d => d.med);
  const min = Math.min(...vals), max = Math.max(...vals);
  const pad = { t: 8, b: axis ? 20 : 8, l: 4, r: 4 };
  const W = w - pad.l - pad.r, H = h - pad.t - pad.b;
  const px = (i) => pad.l + (i / (valid.length - 1)) * W;
  const py = (v) => pad.t + (1 - (v - min) / (max - min || 1)) * H;
  const pts = valid.map((d, i) => [px(i), py(d.med)]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length-1][0]},${h-pad.b} L${pts[0][0]},${h-pad.b} Z`;
  const gradId = `sg${Math.random().toString(36).slice(2,7)}`;
  return `<svg width="100%" viewBox="0 0 ${w} ${h}" style="display:block;overflow:visible">
    ${fill ? `<defs><linearGradient id="${gradId}" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#${gradId})"/>` : ""}
    <path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots ? pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.5" fill="${color}" stroke="var(--bg-1)" stroke-width="1.5"/>`).join("") : ""}
    ${axis ? `<text x="${pad.l}" y="${h}" font-size="10" fill="var(--ink-3)" font-family="inherit">${fmtMonth(valid[0].m)}</text>
    <text x="${w - pad.r}" y="${h}" font-size="10" fill="var(--ink-3)" text-anchor="end" font-family="inherit">${fmtMonth(valid[valid.length-1].m)}</text>` : ""}
  </svg>`;
}

/* ── Delta pill HTML ────────────────────────────────────────────────────── */
function deltaPill(pct) {
  const cls = pct > 0.3 ? "up" : pct < -0.3 ? "down" : "flat";
  const arrow = pct > 0.3 ? "↑" : pct < -0.3 ? "↓" : "→";
  return `<span class="delta-pill ${cls}">${arrow} ${fmtPct(pct)}</span>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   MRT DATA
   ══════════════════════════════════════════════════════════════════════════ */
const MRT_LINES = {
  NS: { color: "#c8614a", name: "North-South Line" },
  EW: { color: "#3a9e6a", name: "East-West Line" },
  NE: { color: "#8b5faa", name: "North-East Line" },
  CC: { color: "#c89630", name: "Circle Line" },
  DT: { color: "#4a7ab5", name: "Downtown Line" },
  TE: { color: "#8c6845", name: "Thomson-East Coast Line" },
  BP: { color: "#6a7d70", name: "Bukit Panjang LRT" },
  SE: { color: "#6a7d70", name: "Sengkang LRT" },
  PE: { color: "#6a7d70", name: "Punggol LRT" },
};

// Each station: [name, lat, lon, ...line_codes]
const MRT_STATIONS = [
  // NS Line
  ["Jurong East",      1.3332, 103.7424, "NS","EW"],
  ["Bukit Batok",      1.3491, 103.7496, "NS"],
  ["Bukit Gombak",     1.3588, 103.7519, "NS"],
  ["Choa Chu Kang",    1.3853, 103.7443, "NS","BP"],
  ["Yew Tee",          1.3970, 103.7474, "NS"],
  ["Kranji",           1.4252, 103.7619, "NS"],
  ["Marsiling",        1.4325, 103.7742, "NS"],
  ["Woodlands",        1.4369, 103.7864, "NS","TE"],
  ["Admiralty",        1.4406, 103.8006, "NS"],
  ["Sembawang",        1.4491, 103.8201, "NS"],
  ["Canberra",         1.4432, 103.8297, "NS"],
  ["Yishun",           1.4294, 103.8354, "NS"],
  ["Khatib",           1.4174, 103.8330, "NS"],
  ["Yio Chu Kang",     1.3818, 103.8448, "NS"],
  ["Ang Mo Kio",       1.3700, 103.8496, "NS"],
  ["Bishan",           1.3511, 103.8484, "NS","CC"],
  ["Braddell",         1.3401, 103.8470, "NS"],
  ["Toa Payoh",        1.3323, 103.8470, "NS"],
  ["Novena",           1.3204, 103.8438, "NS"],
  ["Newton",           1.3123, 103.8384, "NS","DT"],
  ["Orchard",          1.3043, 103.8319, "NS"],
  ["Somerset",         1.2998, 103.8388, "NS"],
  ["Dhoby Ghaut",      1.2990, 103.8458, "NS","NE","CC"],
  ["City Hall",        1.2931, 103.8521, "NS","EW"],
  ["Raffles Place",    1.2839, 103.8513, "NS","EW"],
  ["Marina Bay",       1.2763, 103.8547, "NS","CC","TE"],
  ["Marina South Pier",1.2708, 103.8632, "NS"],

  // EW Line (East branch)
  ["Pasir Ris",        1.3731, 103.9495, "EW"],
  ["Tampines",         1.3527, 103.9451, "EW","DT"],
  ["Simei",            1.3432, 103.9530, "EW"],
  ["Tanah Merah",      1.3273, 103.9460, "EW"],
  ["Bedok",            1.3237, 103.9300, "EW"],
  ["Kembangan",        1.3211, 103.9129, "EW"],
  ["Eunos",            1.3197, 103.9030, "EW"],
  ["Paya Lebar",       1.3178, 103.8921, "EW","CC"],
  ["Aljunied",         1.3163, 103.8830, "EW"],
  ["Kallang",          1.3113, 103.8710, "EW"],
  ["Lavender",         1.3073, 103.8627, "EW"],
  ["Bugis",            1.3007, 103.8559, "EW","DT"],
  ["City Hall",        1.2931, 103.8521, "EW","NS"],
  ["Raffles Place",    1.2839, 103.8513, "EW","NS"],
  ["Tanjong Pagar",    1.2766, 103.8454, "EW"],
  ["Outram Park",      1.2797, 103.8393, "EW","NE","TE"],
  ["Tiong Bahru",      1.2863, 103.8271, "EW"],
  ["Redhill",          1.2895, 103.8167, "EW"],
  ["Queenstown",       1.2944, 103.8060, "EW"],
  ["Commonwealth",     1.3022, 103.7984, "EW"],
  ["Buona Vista",      1.3072, 103.7898, "EW","CC"],
  ["Dover",            1.3113, 103.7785, "EW"],
  ["Clementi",         1.3152, 103.7654, "EW"],
  ["Chinese Garden",   1.3423, 103.7321, "EW"],
  ["Lakeside",         1.3440, 103.7210, "EW"],
  ["Boon Lay",         1.3388, 103.7060, "EW"],
  ["Pioneer",          1.3370, 103.6972, "EW"],
  ["Joo Koon",         1.3275, 103.6784, "EW"],
  ["Gul Circle",       1.3195, 103.6608, "EW"],
  ["Tuas Crescent",    1.3212, 103.6490, "EW"],
  ["Tuas West Road",   1.3273, 103.6399, "EW"],
  ["Tuas Link",        1.3407, 103.6369, "EW"],
  // EW spur to Expo
  ["Expo",             1.3353, 103.9613, "EW"],
  ["Changi Airport",   1.3573, 103.9889, "EW"],

  // NE Line
  ["HarbourFront",     1.2651, 103.8202, "NE","CC"],
  ["Outram Park",      1.2797, 103.8393, "NE","EW","TE"],
  ["Chinatown",        1.2846, 103.8442, "NE","DT"],
  ["Clarke Quay",      1.2886, 103.8462, "NE"],
  ["Dhoby Ghaut",      1.2990, 103.8458, "NE","NS","CC"],
  ["Little India",     1.3066, 103.8494, "NE","DT"],
  ["Farrer Park",      1.3125, 103.8544, "NE"],
  ["Boon Keng",        1.3197, 103.8614, "NE"],
  ["Potong Pasir",     1.3318, 103.8697, "NE"],
  ["Woodleigh",        1.3392, 103.8707, "NE"],
  ["Serangoon",        1.3497, 103.8731, "NE","CC"],
  ["Kovan",            1.3598, 103.8853, "NE"],
  ["Hougang",          1.3713, 103.8921, "NE"],
  ["Buangkok",         1.3826, 103.8929, "NE"],
  ["Sengkang",         1.3915, 103.8954, "NE","SE","PE"],
  ["Punggol",          1.4052, 103.9022, "NE","SE","PE"],

  // CC Line
  ["Dhoby Ghaut",      1.2990, 103.8458, "CC","NS","NE"],
  ["Bras Basah",       1.2965, 103.8501, "CC"],
  ["Esplanade",        1.2934, 103.8553, "CC"],
  ["Promenade",        1.2935, 103.8604, "CC","DT"],
  ["Nicoll Highway",   1.2998, 103.8639, "CC"],
  ["Stadium",          1.3024, 103.8742, "CC"],
  ["Mountbatten",      1.3068, 103.8823, "CC"],
  ["Dakota",           1.3088, 103.8884, "CC"],
  ["Paya Lebar",       1.3178, 103.8921, "CC","EW"],
  ["MacPherson",       1.3267, 103.8900, "CC","DT"],
  ["Tai Seng",         1.3355, 103.8879, "CC"],
  ["Bartley",          1.3424, 103.8797, "CC"],
  ["Serangoon",        1.3497, 103.8731, "CC","NE"],
  ["Lorong Chuan",     1.3518, 103.8647, "CC"],
  ["Bishan",           1.3511, 103.8484, "CC","NS"],
  ["Marymount",        1.3490, 103.8393, "CC"],
  ["Caldecott",        1.3376, 103.8393, "CC","TE"],
  ["Botanic Gardens",  1.3228, 103.8153, "CC","DT"],
  ["Farrer Road",      1.3170, 103.8075, "CC"],
  ["Holland Village",  1.3118, 103.7962, "CC"],
  ["Buona Vista",      1.3072, 103.7898, "CC","EW"],
  ["one-north",        1.2990, 103.7872, "CC"],
  ["Kent Ridge",       1.2934, 103.7841, "CC"],
  ["Haw Par Villa",    1.2832, 103.7820, "CC"],
  ["Pasir Panjang",    1.2762, 103.7917, "CC"],
  ["Labrador Park",    1.2720, 103.8024, "CC"],
  ["Telok Blangah",    1.2706, 103.8097, "CC"],
  ["HarbourFront",     1.2651, 103.8202, "CC","NE"],
  ["Bayfront",         1.2822, 103.8589, "CC","DT"],

  // DT Line
  ["Bukit Panjang",    1.3784, 103.7761, "DT","BP"],
  ["Cashew",           1.3697, 103.7765, "DT"],
  ["Hillview",         1.3622, 103.7672, "DT"],
  ["Beauty World",     1.3412, 103.7762, "DT"],
  ["King Albert Park", 1.3357, 103.7830, "DT"],
  ["Sixth Avenue",     1.3310, 103.7969, "DT"],
  ["Tan Kah Kee",      1.3256, 103.8076, "DT"],
  ["Botanic Gardens",  1.3228, 103.8153, "DT","CC"],
  ["Stevens",          1.3197, 103.8266, "DT","TE"],
  ["Newton",           1.3123, 103.8384, "DT","NS"],
  ["Little India",     1.3066, 103.8494, "DT","NE"],
  ["Rochor",           1.3040, 103.8527, "DT"],
  ["Bugis",            1.3007, 103.8559, "DT","EW"],
  ["Promenade",        1.2935, 103.8604, "DT","CC"],
  ["Bayfront",         1.2822, 103.8589, "DT","CC"],
  ["Downtown",         1.2793, 103.8527, "DT"],
  ["Telok Ayer",       1.2820, 103.8481, "DT"],
  ["Chinatown",        1.2846, 103.8442, "DT","NE"],
  ["Fort Canning",     1.2919, 103.8449, "DT"],
  ["Bencoolen",        1.2977, 103.8490, "DT"],
  ["Jalan Besar",      1.3052, 103.8555, "DT"],
  ["Bendemeer",        1.3134, 103.8626, "DT"],
  ["Geylang Bahru",    1.3214, 103.8712, "DT"],
  ["Mattar",           1.3265, 103.8836, "DT"],
  ["MacPherson",       1.3267, 103.8900, "DT","CC"],
  ["Ubi",              1.3293, 103.8984, "DT"],
  ["Kaki Bukit",       1.3344, 103.9058, "DT"],
  ["Bedok North",      1.3352, 103.9140, "DT"],
  ["Bedok Reservoir",  1.3364, 103.9323, "DT"],
  ["Tampines West",    1.3455, 103.9384, "DT"],
  ["Tampines",         1.3527, 103.9451, "DT","EW"],
  ["Tampines East",    1.3570, 103.9558, "DT"],
  ["Upper Changi",     1.3413, 103.9617, "DT"],
  ["Expo",             1.3353, 103.9613, "DT","EW"],

  // TE Line
  ["Woodlands North",  1.4476, 103.8271, "TE"],
  ["Woodlands",        1.4369, 103.7864, "TE","NS"],
  ["Woodlands South",  1.4266, 103.7971, "TE"],
  ["Springleaf",       1.4041, 103.8194, "TE"],
  ["Lentor",           1.3932, 103.8357, "TE"],
  ["Mayflower",        1.3820, 103.8393, "TE"],
  ["Bright Hill",      1.3687, 103.8335, "TE"],
  ["Upper Thomson",    1.3564, 103.8315, "TE"],
  ["Caldecott",        1.3376, 103.8393, "TE","CC"],
  ["Stevens",          1.3197, 103.8266, "TE","DT"],
  ["Napier",           1.3062, 103.8195, "TE"],
  ["Orchard Boulevard",1.2985, 103.8214, "TE"],
  ["Orchard",          1.3043, 103.8319, "TE","NS"],
  ["Great World",      1.2935, 103.8334, "TE"],
  ["Havelock",         1.2875, 103.8397, "TE"],
  ["Outram Park",      1.2797, 103.8393, "TE","EW","NE"],
  ["Maxwell",          1.2800, 103.8445, "TE"],
  ["Shenton Way",      1.2774, 103.8492, "TE"],
  ["Marina Bay",       1.2763, 103.8547, "TE","NS","CC"],
  ["Marina South",     1.2713, 103.8623, "TE"],
  ["Gardens by the Bay",1.2824,103.8665, "TE"],
  ["Tanjong Rhu",      1.2984, 103.8741, "TE"],
  ["Katong Park",      1.3031, 103.8816, "TE"],
  ["Tanjong Katong",   1.3040, 103.8927, "TE"],
  ["Marine Parade",    1.3026, 103.9030, "TE"],
  ["Marine Terrace",   1.3054, 103.9116, "TE"],
  ["Siglap",           1.3102, 103.9239, "TE"],
  ["Bayshore",         1.3166, 103.9327, "TE"],
  ["Bedok South",      1.3248, 103.9404, "TE"],
  ["Sungei Bedok",     1.3299, 103.9562, "TE"],
];

// Ordered sequences for drawing route lines (station name arrays per segment)
const MRT_ROUTES = [
  {
    line: "NS",
    stations: [
      "Jurong East","Bukit Batok","Bukit Gombak","Choa Chu Kang","Yew Tee",
      "Kranji","Marsiling","Woodlands","Admiralty","Sembawang","Canberra",
      "Yishun","Khatib","Yio Chu Kang","Ang Mo Kio","Bishan","Braddell",
      "Toa Payoh","Novena","Newton","Orchard","Somerset","Dhoby Ghaut",
      "City Hall","Raffles Place","Marina Bay","Marina South Pier"
    ]
  },
  {
    line: "EW",
    stations: [
      "Pasir Ris","Tampines","Simei","Tanah Merah","Bedok","Kembangan",
      "Eunos","Paya Lebar","Aljunied","Kallang","Lavender","Bugis",
      "City Hall","Raffles Place","Tanjong Pagar","Outram Park","Tiong Bahru",
      "Redhill","Queenstown","Commonwealth","Buona Vista","Dover","Clementi",
      "Jurong East","Chinese Garden","Lakeside","Boon Lay","Pioneer",
      "Joo Koon","Gul Circle","Tuas Crescent","Tuas West Road","Tuas Link"
    ]
  },
  {
    line: "EW",
    stations: ["Tanah Merah","Expo","Changi Airport"]
  },
  {
    line: "NE",
    stations: [
      "HarbourFront","Outram Park","Chinatown","Clarke Quay","Dhoby Ghaut",
      "Little India","Farrer Park","Boon Keng","Potong Pasir","Woodleigh",
      "Serangoon","Kovan","Hougang","Buangkok","Sengkang","Punggol"
    ]
  },
  {
    line: "CC",
    stations: [
      "Dhoby Ghaut","Bras Basah","Esplanade","Promenade","Nicoll Highway",
      "Stadium","Mountbatten","Dakota","Paya Lebar","MacPherson","Tai Seng",
      "Bartley","Serangoon","Lorong Chuan","Bishan","Marymount","Caldecott",
      "Botanic Gardens","Farrer Road","Holland Village","Buona Vista",
      "one-north","Kent Ridge","Haw Par Villa","Pasir Panjang","Labrador Park",
      "Telok Blangah","HarbourFront"
    ]
  },
  {
    line: "CC",
    stations: ["Promenade","Bayfront","Marina Bay"]
  },
  {
    line: "DT",
    stations: [
      "Bukit Panjang","Cashew","Hillview","Beauty World","King Albert Park",
      "Sixth Avenue","Tan Kah Kee","Botanic Gardens","Stevens","Newton",
      "Little India","Rochor","Bugis","Promenade","Bayfront","Downtown",
      "Telok Ayer","Chinatown","Fort Canning","Bencoolen","Jalan Besar",
      "Bendemeer","Geylang Bahru","Mattar","MacPherson","Ubi","Kaki Bukit",
      "Bedok North","Bedok Reservoir","Tampines West","Tampines",
      "Tampines East","Upper Changi","Expo"
    ]
  },
  {
    line: "TE",
    stations: [
      "Woodlands North","Woodlands","Woodlands South","Springleaf","Lentor",
      "Mayflower","Bright Hill","Upper Thomson","Caldecott","Stevens",
      "Napier","Orchard Boulevard","Orchard","Great World","Havelock",
      "Outram Park","Maxwell","Shenton Way","Marina Bay","Marina South",
      "Gardens by the Bay","Tanjong Rhu","Katong Park","Tanjong Katong",
      "Marine Parade","Marine Terrace","Siglap","Bayshore",
      "Bedok South","Sungei Bedok"
    ]
  },
];

// Build lookup: station name → [lat, lon] (using first occurrence)
const MRT_COORDS = {};
for (const [name, lat, lon] of MRT_STATIONS) {
  if (!MRT_COORDS[name]) MRT_COORDS[name] = [lat, lon];
}

/* ── MRT layer state ─────────────────────────────────────────────────── */
const mrtLayers = { lines: [], markers: [], visible: false };

// Catmull-Rom spline: insert interpolated midpoints between each pair for smooth curves
function catmullRomPoints(pts, steps = 6) {
  if (pts.length < 2) return pts;
  const out = [];
  const p = [[...pts[0]], ...pts, [...pts[pts.length - 1]]]; // pad ends
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i-1], p[i], p[i+1], p[i+2]];
    for (let t = 0; t < steps; t++) {
      const s = t / steps;
      const s2 = s * s, s3 = s2 * s;
      const lat = 0.5 * ((2*p1[0]) + (-p0[0]+p2[0])*s + (2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*s2 + (-p0[0]+3*p1[0]-3*p2[0]+p3[0])*s3);
      const lon = 0.5 * ((2*p1[1]) + (-p0[1]+p2[1])*s + (2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*s2 + (-p0[1]+3*p1[1]-3*p2[1]+p3[1])*s3);
      out.push([lat, lon]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function renderMRT() {
  if (mrtLayers.visible) return;
  mrtLayers.visible = true;

  // Draw route polylines with Catmull-Rom smoothing
  for (const route of MRT_ROUTES) {
    const color = MRT_LINES[route.line]?.color || "#888";
    const raw = route.stations.map(n => MRT_COORDS[n]).filter(Boolean);
    if (raw.length < 2) continue;
    const pts = catmullRomPoints(raw, 8);
    const poly = L.polyline(pts, {
      color, weight: 3, opacity: 0.7,
      lineJoin: "round", lineCap: "round",
      smoothFactor: 1,
    }).addTo(MAP);
    mrtLayers.lines.push(poly);
  }

  // Draw station dots (deduplicated)
  const seen = new Set();
  for (const [name, lat, lon, ...lines] of MRT_STATIONS) {
    if (seen.has(name)) continue;
    seen.add(name);

    // Interchange = multiple lines → white ring; single → line colour
    const isInterchange = lines.length > 1;
    const primaryColor = MRT_LINES[lines[0]]?.color || "#888";

    const icon = L.divIcon({
      className: "",
      html: `<div style="
        width:${isInterchange ? 10 : 8}px;
        height:${isInterchange ? 10 : 8}px;
        border-radius:50%;
        background:${isInterchange ? "#fff" : primaryColor};
        border:2px solid ${isInterchange ? primaryColor : "rgba(255,255,255,0.6)"};
        box-shadow:0 1px 4px rgba(0,0,0,0.5);
      "></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
    });

    const m = L.marker([lat, lon], { icon, interactive: true, zIndexOffset: 200 });
    m.bindTooltip(name, {
      permanent: false,
      direction: "top",
      offset: [0, -8],
      className: "mrt-tooltip",
    });
    m.addTo(MAP);
    mrtLayers.markers.push(m);
  }
}

function hideMRT() {
  mrtLayers.lines.forEach(l => l.remove());
  mrtLayers.markers.forEach(m => m.remove());
  mrtLayers.lines = [];
  mrtLayers.markers = [];
  mrtLayers.visible = false;
}

function toggleMRT() {
  const btn = document.getElementById("mrtToggleBtn");
  if (mrtLayers.visible) {
    hideMRT();
    state.mrtVisible = false;
    if (btn) btn.classList.remove("active");
  } else {
    renderMRT();
    state.mrtVisible = true;
    if (btn) btn.classList.add("active");
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   BUS STOPS
   ══════════════════════════════════════════════════════════════════════════ */
let BUS_STOPS = null;
const busLayer = { markers: null, visible: false };

async function loadBusStops() {
  if (BUS_STOPS) return;
  const res = await fetch("bus_stops.json");
  BUS_STOPS = await res.json();
}

function renderBusStops() {
  busLayer.markers = L.layerGroup(
    BUS_STOPS.map(s => {
      const m = L.circleMarker([s.lat, s.lon], {
        renderer: state.canvasRenderer,
        radius: 5,
        fillColor: "#fbbf24",
        fillOpacity: 0.95,
        color: "#92400e",
        weight: 1.5,
        interactive: true,
      });
      m.bindTooltip(`Bus Stop ${s.n}`, { permanent: false, direction: "top", offset: [0, -6], className: "mrt-tooltip" });
      return m;
    })
  );

  function updateVisibility() {
    if (!busLayer.visible) return;
    if (MAP.getZoom() >= 17) {
      busLayer.markers.addTo(MAP);
    } else {
      busLayer.markers.remove();
    }
  }
  MAP.on("zoomend", updateVisibility);
  updateVisibility();
}

function hideBusStops() {
  if (busLayer.markers) busLayer.markers.remove();
}

async function toggleBus() {
  const btn = document.getElementById("busToggleBtn");
  if (busLayer.visible) {
    hideBusStops();
    busLayer.visible = false;
    if (btn) btn.classList.remove("active");
  } else {
    busLayer.visible = true;
    if (btn) btn.classList.add("active");
    await loadBusStops();
    if (!busLayer.markers) {
      renderBusStops();
    } else {
      // reuse existing layer, just re-attach zoom listener behaviour
      if (MAP.getZoom() >= 17) busLayer.markers.addTo(MAP);
    }
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   APP STATE
   ══════════════════════════════════════════════════════════════════════════ */
let DB = null;   // full data from resale_data.json
let MAP = null;  // Leaflet map instance

const state = {
  view: "map",           // map | town | compare | trends
  filters: {
    types:    [],
    minPrice: 0,
    maxPrice: 0,
    minLease: 0,
    maxLease: 9999,
    minTxnYear: 2026,
    maxTxnYear: 2026,
    budgetMin: 0,
    budgetMax: 9999,
  },
  activeTown: null,
  drawerOpen: false,
  sidebarOpen: true,
  compareSlots: [],      // up to 3 town ids
  modalOpen: false,
  modalSlotIdx: null,
  townMarkers: {},
  blockMarkers: [],
  blockLayerVisible: false,
  blocksByTown: {},
  blockLayer: null,
  blockRefreshTimer: null,
  canvasRenderer: null,
  mrtVisible: true,
  tileLayer: null,
};

/* ══════════════════════════════════════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════════════════════════════════════ */
async function boot() {
  const loading = document.getElementById("loading");
  const bar = loading.querySelector(".loading-bar");
  bar.style.width = "20%";

  try {
    const res = await fetch("resale_data.json");
    bar.style.width = "60%";
    DB = await res.json();
    bar.style.width = "90%";
  } catch (e) {
    console.error("Could not load resale_data.json:", e);
    document.querySelector(".loading-sub").textContent = "Error: could not load resale_data.json — run python build_data.py first";
    return;
  }

  // Init filter defaults
  state.filters.minPrice = Math.round(DB.price_stats.p5 / 1000) * 1;
  state.filters.maxPrice = Math.round(DB.price_stats.p95 / 1000) * 1;
  state.filters.minYear  = parseInt(DB.date_range[0]);
  state.filters.maxYear  = parseInt(DB.date_range[1]);

  buildFilters();
  initLeaseYearPicker();
  initMap();
  renderDataBadge();
  updateFbTxnCount();
  updateShortlistUI();
  // Set initial txn filter to 2026 (active chip default)
  state.filters.minTxnYear = 2026;
  state.filters.maxTxnYear = 2026;

  bar.style.width = "100%";
  setTimeout(() => {
    loading.classList.add("hidden");
    renderPulsePanel();
  }, 400);
}

/* ══════════════════════════════════════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════════════════════════════════════ */
function showView(viewId) {
  state.view = viewId;
  document.querySelectorAll(".view").forEach(el => {
    el.classList.toggle("active", el.dataset.view === viewId);
  });
  document.querySelectorAll(".topnav-tab").forEach(el => {
    el.classList.toggle("active", el.dataset.view === viewId);
  });
  if (viewId === "map" && MAP) setTimeout(() => MAP.invalidateSize(), 50);
  if (viewId === "compare") renderCompare();
  if (viewId === "trends") renderTrends();
}

/* ══════════════════════════════════════════════════════════════════════════
   DATA BADGE
   ══════════════════════════════════════════════════════════════════════════ */
function renderDataBadge() {
  const badge = document.getElementById("dataBadge");
  if (!badge || !DB) return;
  const filtered = countFilteredTxns();
  const isFiltered = filtered < DB.total_txns;
  badge.innerHTML = `<span class="data-badge-dot"></span> ${filtered.toLocaleString()} txns${isFiltered ? ` <span style="color:var(--ink-3);font-weight:400">of ${DB.total_txns.toLocaleString()}</span>` : ` · through ${fmtMonth(DB.date_range[1])}`}`;
}

function countFilteredTxns() {
  if (!DB || !DB.blocks) return 0;
  const minY      = state.filters.minTxnYear;
  const maxY      = state.filters.maxTxnYear;
  const typeFilter = state.filters.types;  // [] = all types
  let total = 0;
  for (const b of DB.blocks) {
    if (!blockPassesFilter(b)) continue;
    // How many txns in this block match the active type filter
    let blockVol;
    if (typeFilter.length > 0 && b.vol_by_type) {
      blockVol = typeFilter.reduce((s, ft) => s + (b.vol_by_type[ft] || 0), 0);
    } else {
      // No type filter — sum across all years in the date window
      if (b.vol_by_year) {
        blockVol = Object.entries(b.vol_by_year)
          .filter(([yr]) => +yr >= minY && +yr <= maxY)
          .reduce((s, [, cnt]) => s + cnt, 0);
      } else {
        blockVol = b.vol;
      }
    }
    total += blockVol;
  }
  return total;
}

/* ══════════════════════════════════════════════════════════════════════════
   FILTERS
   ══════════════════════════════════════════════════════════════════════════ */
function buildFilters() {
  if (!DB) return;

  // Budget state
  state.filters.budgetMin = 0;
  state.filters.budgetMax = 9999;

  // Budget input wiring
  ["budgetMin", "budgetMax"].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      const raw = el.value.replace(/[^0-9kKmM.]/g, "");
      let val = parseFloat(raw);
      if (raw.toLowerCase().endsWith("k")) val = parseFloat(raw) * 1000;
      else if (raw.toLowerCase().endsWith("m")) val = parseFloat(raw) * 1000000;
      if (!isNaN(val)) {
        if (id === "budgetMin") state.filters.budgetMin = Math.round(val / 1000);
        else state.filters.budgetMax = Math.round(val / 1000);
        updateMapMarkers();
        renderDataBadge();
        updateFbTxnCount();
        renderPulsePanel();
      }
    });
  });

  // Flat types — filter bar chips (desktop) and mobile sidebar chips
  const ftHtmlChip  = DB.flat_types.map(ft =>
    `<button class="chip active" data-type="${ft}" onclick="toggleType('${ft}')">${ft.replace(" ROOM","R").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</button>`
  ).join("");
  const ftHtmlFilter = DB.flat_types.map(ft =>
    `<button class="filter-chip active" data-type="${ft}" onclick="toggleType('${ft}')">${ft.replace(" ROOM","R").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</button>`
  ).join("");
  const typeContainer = document.getElementById("filterTypes");
  if (typeContainer) typeContainer.innerHTML = ftHtmlChip;
  const typeMobile = document.getElementById("filterTypesMobile");
  if (typeMobile) typeMobile.innerHTML = ftHtmlFilter;

  // Price range
  const ps = DB.price_stats;
  const minK = Math.floor(ps.min / 1000);
  const maxK = Math.ceil(ps.max / 1000);
  state.filters.minPrice = Math.round(ps.p5 / 1000);
  state.filters.maxPrice = Math.round(ps.p95 / 1000);

  document.getElementById("priceRangeMin").min   = minK;
  document.getElementById("priceRangeMin").max   = maxK;
  document.getElementById("priceRangeMin").value = state.filters.minPrice;
  document.getElementById("priceRangeMax").min   = minK;
  document.getElementById("priceRangeMax").max   = maxK;
  document.getElementById("priceRangeMax").value = state.filters.maxPrice;
  updatePriceRangeUI();

  // Lease commence year dual slider
  const leaseYears = DB.lease_years || [];
  if (leaseYears.length) {
    const ly0 = leaseYears[0];
    const ly1 = leaseYears[leaseYears.length - 1];
    state.filters.minLease = ly0;
    state.filters.maxLease = ly1;
    const lMin = document.getElementById("leaseRangeMin");
    const lMax = document.getElementById("leaseRangeMax");
    lMin.min = ly0; lMin.max = ly1; lMin.value = ly0;
    lMax.min = ly0; lMax.max = ly1; lMax.value = ly1;
    updateLeaseRangeUI();
  }

  // Transaction year dual slider
  const txnYears = DB.date_range ? [+DB.date_range[0].slice(0,4), +DB.date_range[1].slice(0,4)] : [2017, 2026];
  state.filters.minTxnYear = txnYears[0];
  state.filters.maxTxnYear = txnYears[1];
  const tMin = document.getElementById("txnRangeMin");
  const tMax = document.getElementById("txnRangeMax");
  tMin.min = txnYears[0]; tMin.max = txnYears[1]; tMin.value = txnYears[0];
  tMax.min = txnYears[0]; tMax.max = txnYears[1]; tMax.value = txnYears[1];
  updateTxnRangeUI();
}

function toggleType(ft) {
  const allTypes = DB.flat_types;
  // "all active" state is represented by empty array (no filter).
  // First click on any chip when all are active → switch to explicit mode with that one deselected.
  if (state.filters.types.length === 0) {
    state.filters.types = allTypes.filter(t => t !== ft);
  } else {
    const i = state.filters.types.indexOf(ft);
    if (i >= 0) state.filters.types.splice(i, 1);
    else state.filters.types.push(ft);
  }
  // Update chip visuals (both filter-bar chips and mobile sidebar chips)
  document.querySelectorAll("[data-type]").forEach(el => {
    el.classList.toggle("active", state.filters.types.length === 0 || state.filters.types.includes(el.dataset.type));
  });
  updateMapMarkers();
  renderPulsePanel();
}

function toggleLeaseYears(years, btn) {
  btn.classList.toggle("active");
  const activeYears = new Set(state.filters.activeLeaseYears || []);
  if (btn.classList.contains("active")) {
    years.forEach(y => activeYears.add(y));
  } else {
    years.forEach(y => activeYears.delete(y));
  }
  state.filters.activeLeaseYears = [...activeYears];
  updateMapMarkers();
}

function updatePriceRangeUI() {
  const minK = parseInt(DB.price_stats.min / 1000);
  const maxK = parseInt(DB.price_stats.max / 1000);
  const lo = state.filters.minPrice, hi = state.filters.maxPrice;
  const pctL = (lo - minK) / (maxK - minK) * 100;
  const pctR = (hi - minK) / (maxK - minK) * 100;
  const fill = document.getElementById("priceRangeFill");
  if (fill) { fill.style.left = pctL + "%"; fill.style.width = (pctR - pctL) + "%"; }
  const lo_el = document.getElementById("priceMin");
  const hi_el = document.getElementById("priceMax");
  if (lo_el) lo_el.textContent = fmtKs(lo);
  if (hi_el) hi_el.textContent = fmtKs(hi);
}

window.onPriceMinChange = (v) => {
  state.filters.minPrice = Math.min(+v, state.filters.maxPrice - 10);
  document.getElementById("priceRangeMin").value = state.filters.minPrice;
  updatePriceRangeUI();
  updateMapMarkers();
};
window.onPriceMaxChange = (v) => {
  state.filters.maxPrice = Math.max(+v, state.filters.minPrice + 10);
  document.getElementById("priceRangeMax").value = state.filters.maxPrice;
  updatePriceRangeUI();
  updateMapMarkers();
};

window.onLeaseMinChange = (v) => {
  state.filters.minLease = Math.min(+v, state.filters.maxLease - 1);
  document.getElementById("leaseRangeMin").value = state.filters.minLease;
  updateLeaseRangeUI();
  updateMapMarkers();
};
window.onLeaseMaxChange = (v) => {
  state.filters.maxLease = Math.max(+v, state.filters.minLease + 1);
  document.getElementById("leaseRangeMax").value = state.filters.maxLease;
  updateLeaseRangeUI();
  updateMapMarkers();
};

function updateLeaseRangeUI() {
  const lMin = document.getElementById("leaseRangeMin");
  const lMax = document.getElementById("leaseRangeMax");
  if (!lMin || !lMax) return;
  const lo = state.filters.minLease, hi = state.filters.maxLease;
  const min = +lMin.min, max = +lMin.max;
  const pctL = (lo - min) / (max - min) * 100;
  const pctR = (hi - min) / (max - min) * 100;
  const fill = document.getElementById("leaseRangeFill");
  if (fill) { fill.style.left = pctL + "%"; fill.style.width = (pctR - pctL) + "%"; }
  const loEl = document.getElementById("leaseMin");
  const hiEl = document.getElementById("leaseMax");
  if (loEl) loEl.textContent = lo;
  if (hiEl) hiEl.textContent = hi;
}

window.onTxnMinChange = (v) => {
  state.filters.minTxnYear = Math.min(+v, state.filters.maxTxnYear - 1);
  document.getElementById("txnRangeMin").value = state.filters.minTxnYear;
  updateTxnRangeUI();
  updateMapMarkers();
};
window.onTxnMaxChange = (v) => {
  state.filters.maxTxnYear = Math.max(+v, state.filters.minTxnYear + 1);
  document.getElementById("txnRangeMax").value = state.filters.maxTxnYear;
  updateTxnRangeUI();
  updateMapMarkers();
};

function updateTxnRangeUI() {
  const tMin = document.getElementById("txnRangeMin");
  const tMax = document.getElementById("txnRangeMax");
  if (!tMin || !tMax) return;
  const lo = state.filters.minTxnYear, hi = state.filters.maxTxnYear;
  const min = +tMin.min, max = +tMax.max;
  const pctL = (lo - min) / (max - min) * 100;
  const pctR = (hi - min) / (max - min) * 100;
  const fill = document.getElementById("txnRangeFill");
  if (fill) { fill.style.left = pctL + "%"; fill.style.width = (pctR - pctL) + "%"; }
  const loEl = document.getElementById("txnMin");
  const hiEl = document.getElementById("txnMax");
  if (loEl) loEl.textContent = lo;
  if (hiEl) hiEl.textContent = hi;
}

window.clearFilters = () => {
  state.filters.types = [];
  state.filters.activeLeaseYears = [];
  state.filters.budgetMin = 0;
  state.filters.budgetMax = 9999;
  // Reset all type chips (both filter bar and mobile)
  document.querySelectorAll("[data-type]").forEach(el => el.classList.add("active"));
  // Reset budget inputs
  const bMin = document.getElementById("budgetMin"); if (bMin) bMin.value = "";
  const bMax = document.getElementById("budgetMax"); if (bMax) bMax.value = "";
  // Reset lease year pickers
  state.filters.minLease = 1960;
  state.filters.maxLease = 2030;
  const lMinSel = document.getElementById("leaseMinSelect"); if (lMinSel) lMinSel.value = 1960;
  const lMaxSel = document.getElementById("leaseMaxSelect"); if (lMaxSel) lMaxSel.value = 2030;
  // Also reset mobile range sliders
  const lMin = document.getElementById("leaseRangeMin"); if (lMin) lMin.value = 1960;
  const lMax = document.getElementById("leaseRangeMax"); if (lMax) lMax.value = 2030;
  updateLeaseRangeUI();
  state.filters.minPrice = Math.round(DB.price_stats.p5 / 1000);
  state.filters.maxPrice = Math.round(DB.price_stats.p95 / 1000);
  const pMin = document.getElementById("priceRangeMin"); if (pMin) pMin.value = state.filters.minPrice;
  const pMax = document.getElementById("priceRangeMax"); if (pMax) pMax.value = state.filters.maxPrice;
  updatePriceRangeUI();
  // Reset txn year to 2026 (default)
  state.filters.minTxnYear = 2026;
  state.filters.maxTxnYear = 2026;
  document.querySelectorAll("#txnYearChips .fb-year-chip").forEach((b, i) => b.classList.toggle("active", i === 0));
  const tMin = document.getElementById("txnRangeMin"); if (tMin) tMin.value = 2026;
  const tMax = document.getElementById("txnRangeMax"); if (tMax) tMax.value = 2026;
  updateTxnRangeUI();
  updateMapMarkers();
  updateFbTxnCount();
  renderPulsePanel();
};

function townPassesFilter(summary) {
  if (state.filters.types.length > 0) {
    const hasType = state.filters.types.some(ft => summary.type_medians && summary.type_medians[ft]);
    if (!hasType) return false;
  }
  const med = summary.median;
  if (med < state.filters.minPrice || med > state.filters.maxPrice) return false;
  // Budget filter (from filter bar) — bMin/bMax in thousands, med in thousands
  const bMin = state.filters.budgetMin, bMax = state.filters.budgetMax;
  if (bMin > 0 && med < bMin) return false;
  if (bMax < 9999 && bMax > 0 && med > bMax) return false;
  return true;
}

function blockPassesFilter(block) {
  if (state.filters.types.length > 0) {
    const hasType = state.filters.types.some(ft => block.types && block.types[ft]);
    if (!hasType) return false;
  }
  if (block.med < state.filters.minPrice || block.med > state.filters.maxPrice) return false;
  if (block.lcd && (block.lcd < state.filters.minLease || block.lcd > state.filters.maxLease)) return false;
  // Transaction date: block must have had at least one sale within the selected year window
  if (block.last_txn && +block.last_txn < state.filters.minTxnYear) return false;
  if (block.first_txn && +block.first_txn > state.filters.maxTxnYear) return false;
  return true;
}

/* ══════════════════════════════════════════════════════════════════════════
   LEAFLET MAP
   ══════════════════════════════════════════════════════════════════════════ */
function initMap() {
  const SG_BOUNDS = L.latLngBounds(
    [1.1304, 103.6018],  // SW corner
    [1.4755, 104.0945]   // NE corner
  );

  MAP = L.map("map", {
    center: [1.3521, 103.8198],
    zoom: 12,
    minZoom: 12,
    maxZoom: 19,
    maxBounds: SG_BOUNDS,
    maxBoundsViscosity: 1.0,
    zoomControl: false,
    attributionControl: false,
  });

  // Dark OSM-compatible tile layer
  state.tileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd",
  }).addTo(MAP);

  L.control.zoom({ position: "topright" }).addTo(MAP);

  renderMRT();

  MAP.on("zoomend", onMapZoom);
  MAP.on("moveend", onMapMove);
  MAP.on("click", (e) => {
    if (!e.originalEvent.target.closest(".town-marker-inner, .block-marker-pin")) {
      closeTownDrawer();
    }
  });

  // Build spatial index: blocksByTown[townId] = sorted array (by vol desc)
  if (DB.blocks) {
    DB.blocks.forEach(b => {
      if (!state.blocksByTown[b.town]) state.blocksByTown[b.town] = [];
      state.blocksByTown[b.town].push(b);
    });
    Object.keys(state.blocksByTown).forEach(t => {
      state.blocksByTown[t].sort((a, b2) => b2.vol - a.vol);
    });
  }

  // Canvas renderer for dot mode — draws thousands of circles in one GPU call
  state.canvasRenderer = L.canvas({ padding: 0.1 });

  // Block layer group for fast bulk add/remove
  state.blockLayer = L.layerGroup().addTo(MAP);

  renderTownMarkers();
  onMapZoom();
}

function onMapZoom() {
  const z = MAP.getZoom();
  updateZoomHint(z);
  if (z >= 12) {
    scheduleBlockRefresh();
  } else {
    hideBlockMarkers();
  }
}

function onMapMove() {
  if (MAP.getZoom() >= 12) scheduleBlockRefresh();
}

function scheduleBlockRefresh() {
  clearTimeout(state.blockRefreshTimer);
  state.blockRefreshTimer = setTimeout(refreshBlockMarkers, 150);
}

function updateZoomHint(z) {
  document.querySelectorAll(".zoom-level-pill").forEach(el => {
    const zv = +el.dataset.zoom;
    el.classList.toggle("active",
      (zv === 12 && z <= 14) ||
      (zv === 14 && z >= 15 && z <= 16) ||
      (zv === 16 && z >= 17)
    );
  });
}

/* ── Town markers (zoom 11–13) ──────────────────────────────────────────── */
function townMarkerPrice(s) {
  // Return the price string shown on the marker, or empty string to hide it
  const f = state.filters;
  const hasLeaseFilter = f.minLease > 1960 || f.maxLease < 2030;
  // Hide price when lease filter is active (can't compute lease-filtered median per town)
  if (hasLeaseFilter) return "";
  // Show type-filtered median if types are selected
  if (f.types.length > 0) {
    const vals = f.types.map(ft => s.type_medians?.[ft]).filter(Boolean);
    if (vals.length) return fmtKs(Math.round(vals.reduce((a, v) => a + v, 0) / vals.length));
  }
  return fmtKs(s.median);
}

function renderTownMarkers() {
  if (!DB || !MAP) return;
  Object.values(state.townMarkers).forEach(m => m.remove());
  state.townMarkers = {};

  DB.towns.forEach(townId => {
    const s = DB.town_summaries[townId];
    if (!s) return;

    const passes = townPassesFilter(s);
    const color  = tierColor(s.median);
    const price  = townMarkerPrice(s);
    const icon   = L.divIcon({
      className: "town-marker",
      html: `<div class="town-marker-inner" style="${passes ? "" : "opacity:0.35"}">
        <span class="town-marker-dot" style="background:${color}"></span>
        <span class="town-marker-name">${s.name}</span>
        ${price ? `<span class="town-marker-price">${price}</span>` : ""}
      </div>`,
      iconSize: null, iconAnchor: [0, 0],
    });

    const marker = L.marker(s.coords, { icon, zIndexOffset: 100 });
    marker.on("click", () => openTownDrawer(townId));
    marker.addTo(MAP);
    state.townMarkers[townId] = marker;
  });
}

function updateMapMarkers() {
  if (!DB || !MAP) return;
  DB.towns.forEach(townId => {
    const s = DB.town_summaries[townId];
    const m = state.townMarkers[townId];
    if (!s || !m) return;
    const passes = townPassesFilter(s);
    const color  = tierColor(s.median);
    const price  = townMarkerPrice(s);
    const inner  = m.getElement()?.querySelector(".town-marker-inner");
    if (inner) {
      inner.style.opacity = passes ? "1" : "0.3";
      const dot = inner.querySelector(".town-marker-dot");
      if (dot) dot.style.background = color;
      const priceEl = inner.querySelector(".town-marker-price");
      if (priceEl) priceEl.textContent = price;
      else if (price) {
        const sp = document.createElement("span");
        sp.className = "town-marker-price";
        sp.textContent = price;
        inner.appendChild(sp);
      }
    }
  });
  // Refresh block markers if visible
  if (MAP.getZoom() >= 12) {
    state.blockLayerVisible = false; // force full refresh
    scheduleBlockRefresh();
  }
  renderDataBadge();
}

/* ── Block markers (zoom 12+) ────────────────────────────────────────────── */
// Grid cell size per zoom level — fewer, larger cells at low zoom
const GRID_CELL = { 12: 0.012, 13: 0.006, 14: 0.003 }; // degrees lat/lon per cell

// Returns the best available median for a block given the active txn year filter.
// Block data has no med_by_year, so we proxy via the town's monthly timeline.
function blockFilteredMed(b) {
  const f = state.filters;
  const minY = f.minTxnYear, maxY = f.maxTxnYear;
  const tl = DB.town_timelines?.[b.town] || [];
  const entries = tl.filter(d => d.med != null && parseInt(d.m) >= minY && parseInt(d.m) <= maxY);
  if (!entries.length) return b.med;
  const prices = entries.map(d => d.med).sort((a, b) => a - b);
  return prices[Math.floor(prices.length / 2)];
}

function getGridKey(lat, lon, cellSize) {
  return `${Math.floor(lat / cellSize)},${Math.floor(lon / cellSize)}`;
}

function refreshBlockMarkers() {
  if (!DB || !state.blockLayer) return;
  state.blockLayer.clearLayers();
  state.blockMarkers = [];
  state.blockLayerVisible = true;

  const z      = MAP.getZoom();
  const bounds = MAP.getBounds().pad(0.05);

  // Collect all passing blocks in viewport
  const passing = [];
  for (const blocks of Object.values(state.blocksByTown)) {
    for (const b of blocks) {
      if (!blockPassesFilter(b)) continue;
      const [lat, lon] = b.coords;
      if (!bounds.contains([lat, lon])) continue;
      passing.push(b);
    }
  }

  if (z <= 16) {
    // ── Grid-aggregate mode: one canvas circle per grid cell ──────────────
    // Collapses 9,706 blocks into ~200 cells at zoom 12 — zero lag
    const cellSize = GRID_CELL[Math.min(z, 14)] || GRID_CELL[12];
    const cells = new Map();
    for (const b of passing) {
      const [lat, lon] = b.coords;
      const key = getGridKey(lat, lon, cellSize);
      if (!cells.has(key)) cells.set(key, { prices: [], lats: [], lons: [], count: 0 });
      const c = cells.get(key);
      c.prices.push(b.med);
      c.lats.push(lat);
      c.lons.push(lon);
      c.count++;
    }

    for (const [, c] of cells) {
      const avgLat = c.lats.reduce((a, v) => a + v, 0) / c.lats.length;
      const avgLon = c.lons.reduce((a, v) => a + v, 0) / c.lons.length;
      const medPrice = c.prices.sort((a, b) => a - b)[Math.floor(c.prices.length / 2)];
      const color = tierColor(medPrice);
      // Radius scales with block count so denser areas appear larger
      const radius = Math.min(4 + Math.sqrt(c.count) * 1.2, 18);

      const m = L.circleMarker([avgLat, avgLon], {
        renderer: state.canvasRenderer,
        radius,
        fillColor: color,
        fillOpacity: 0.8,
        color: "rgba(0,0,0,0.4)",
        weight: 1,
        interactive: true,
      });
      m.bindTooltip(
        `${c.count} block${c.count > 1 ? "s" : ""} · median ${fmtKs(medPrice)}`,
        { sticky: true, className: "block-tooltip" }
      );
      state.blockLayer.addLayer(m);
      state.blockMarkers.push(m);
    }

  } else if (z <= 16) {
    // ── Pill mode: compact divIcon per block, viewport is ~1 town ─────────
    for (const b of passing) {
      const [lat, lon] = b.coords;
      const med = blockFilteredMed(b);
      const color = tierColor(med);
      const icon = L.divIcon({
        className: "",
        html: `<div class="block-marker-pin" style="width:44px;height:30px;background:${color};">
          <span class="block-marker-blk">${b.block}</span>
          <span class="block-marker-med">${fmtKs(med)}</span>
        </div>`,
        iconSize: [44, 30], iconAnchor: [22, 15],
      });
      const m = L.marker([lat, lon], { icon });
      m.on("click", () => showBlockPopup(m, b, DB.town_summaries[b.town], [lat, lon]));
      state.blockLayer.addLayer(m);
      state.blockMarkers.push(m);
    }

  } else {
    // ── Full pin mode: zoom 17+ ────────────────────────────────────────────
    for (const b of passing) {
      const [lat, lon] = b.coords;
      const med = blockFilteredMed(b);
      const color = tierColor(med);
      const icon = L.divIcon({
        className: "",
        html: `<div class="block-marker-pin" style="width:52px;height:36px;background:${color};">
          <span class="block-marker-blk">${b.block}</span>
          <span class="block-marker-med">${fmtKs(med)}</span>
        </div>`,
        iconSize: [52, 36], iconAnchor: [26, 18],
      });
      const m = L.marker([lat, lon], { icon });
      m.on("click", () => showBlockPopup(m, b, DB.town_summaries[b.town], [lat, lon]));
      state.blockLayer.addLayer(m);
      state.blockMarkers.push(m);
    }
  }
}

function hideBlockMarkers() {
  if (!state.blockLayerVisible) return;
  state.blockLayerVisible = false;
  if (state.blockLayer) state.blockLayer.clearLayers();
  state.blockMarkers = [];
}

function showBlockPopup(marker, block, town, latlng) {
  const filteredMed = blockFilteredMed(block);
  const f = state.filters;
  const yearLabel = f.minTxnYear === f.maxTxnYear ? `${f.minTxnYear}` : `${f.minTxnYear}–${f.maxTxnYear}`;
  const rows = Object.entries(block.types || {})
    .map(([ft, med]) => `<div class="bp-row"><span class="bp-type">${ft}</span><span class="bp-price">${fmtKs(med)}</span></div>`)
    .join("");
  const blockKey = `${block.town}|${block.block}|${block.street}`;
  const isStarred = _shortlist.has(blockKey);
  const html = `<div>
    <div class="bp-header">
      <div class="bp-blk">Blk ${block.block}</div>
      <div class="bp-street">${block.street}</div>
    </div>
    <div class="bp-rows">
      <div class="bp-row"><span class="bp-type" style="color:var(--ink-3)">Flat type</span><span class="bp-price" style="color:var(--ink-3)">Median (${yearLabel})</span></div>
      ${rows || `<div class="bp-row"><span class="bp-type">All types</span><span class="bp-price">${fmtKs(filteredMed)}</span></div>`}
    </div>
    <div class="bp-actions">
      <button class="bp-action-btn${isStarred ? ' bp-action-starred' : ''}" id="bpStarBtn_${block.block}" onclick="bpToggleShortlist('${blockKey}',this)">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="${isStarred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span class="bp-star-lbl">${isStarred ? 'Shortlisted' : 'Shortlist'}</span>
      </button>
      <button class="bp-action-btn" onclick="bpAddToCompare('${blockKey}');MAP.closePopup()">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>
        Compare
      </button>
    </div>
  </div>`;
  L.popup({ className: "block-popup", closeButton: true, maxWidth: 260 })
    .setLatLng(latlng).setContent(html).openOn(MAP);
}

window.bpToggleShortlist = function(blockKey, btn) {
  _shortlist.toggle(blockKey);
  const starred = _shortlist.has(blockKey);
  btn.classList.toggle("bp-action-starred", starred);
  btn.querySelector("svg").setAttribute("fill", starred ? "currentColor" : "none");
  const lbl = btn.querySelector(".bp-star-lbl");
  if (lbl) lbl.textContent = starred ? "Shortlisted" : "Shortlist";
};

window.bpAddToCompare = function(blockKey) {
  compareState.mode = "block";
  const emptyIdx = state.compareSlots.findIndex(s => !s);
  if (emptyIdx >= 0) state.compareSlots[emptyIdx] = blockKey;
  else if (state.compareSlots.length < 3) state.compareSlots.push(blockKey);
  else state.compareSlots[2] = blockKey; // replace last slot if all full
  renderCompare();
  showView("compare");
};

/* ── Town drawer ─────────────────────────────────────────────────────────── */
function openTownDrawer(townId) {
  state.activeTown = townId;
  state.drawerOpen = true;
  const s = DB.town_summaries[townId];
  if (!s) return;

  // Ensure map view is active
  const wasOnMap = state.view === "map";
  if (!wasOnMap) showView("map");

  const drawer = document.getElementById("townDrawer");
  drawer.classList.add("open");

  // Zoom map to town (delay slightly if switching views)
  setTimeout(() => MAP.flyTo(s.coords, 17, { duration: 1.2 }), wasOnMap ? 0 : 100);

  // Render drawer content
  renderTownDrawer(s, townId);

  // Highlight active marker
  document.querySelectorAll(".town-marker-inner").forEach(el => el.classList.remove("active"));
  state.townMarkers[townId]?.getElement()?.querySelector(".town-marker-inner")?.classList.add("active");
}

function closeTownDrawer() {
  state.drawerOpen = false;
  state.activeTown = null;
  document.getElementById("townDrawer").classList.remove("open");
  document.querySelectorAll(".town-marker-inner").forEach(el => el.classList.remove("active"));
}

function renderTownDrawer(s, townId) {
  const f = state.filters;
  const minY = f.minTxnYear, maxY = f.maxTxnYear;
  const tl = DB.town_timelines[townId] || [];

  // Compute txn-year-filtered median + dpct from timeline
  const tlInRange = tl.filter(d => d.med != null && parseInt(d.m) >= minY && parseInt(d.m) <= maxY);
  const drawerMedian = (() => {
    if (!tlInRange.length) return s.median;
    const prices = tlInRange.map(d => d.med).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  })();
  const drawerDpct = (() => {
    if (tlInRange.length < 2) return s.dpct || 0;
    const first = tlInRange[0].med, last = tlInRange[tlInRange.length - 1].med;
    return first > 0 ? ((last - first) / first * 100) : 0;
  })();
  // Filtered vol: sum vol_by_year across all blocks for this town
  const drawerVol = (() => {
    const blocks = state.blocksByTown[townId] || [];
    if (!blocks.length) return s.vol;
    let v = 0;
    for (const b of blocks) {
      if (!b.vol_by_year) continue;
      for (let y = minY; y <= maxY; y++) v += (b.vol_by_year[y] || 0);
    }
    return v || s.vol;
  })();
  const volLabel = minY === maxY ? `${minY}` : `${minY}–${maxY}`;

  const spark = sparklineSVG(tlInRange.length >= 3 ? tlInRange : tl.slice(-24), { w: 370, h: 60, color: "var(--accent)" });

  const typeBars = Object.entries(s.type_mix || {}).map(([ft, pct]) => {
    const med = s.type_medians?.[ft];
    return `<div class="type-bar-row">
      <span class="type-bar-label">${ft.replace(" ROOM","R").replace("EXECUTIVE","Exec")}</span>
      <div class="type-bar-track"><div class="type-bar-fill" style="width:${pct}%"></div></div>
      <span class="type-bar-pct">${pct}%</span>
      <span class="type-bar-med">${med ? fmtKs(med) : "—"}</span>
    </div>`;
  }).join("");

  const isStarred = _shortlist.has(townId);
  document.getElementById("townDrawer").innerHTML = `
    <div class="town-drawer-hero">
      <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--bg-2) 0%,var(--bg-3) 100%);">
        <div style="padding:14px 14px 0;display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <span style="font-size:10px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:.1em">${s.region}</span>
          <div style="display:flex;align-items:center;gap:6px;">
            ${deltaPill(drawerDpct)}
            <button class="star-btn${isStarred ? ' starred' : ''}" data-town="${townId}" onclick="_shortlist.toggle('${townId}');updateShortlistUI();this.classList.toggle('starred')" title="${isStarred ? 'Remove from shortlist' : 'Add to shortlist'}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="${isStarred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="town-drawer-hero-overlay"></div>
      <div class="town-drawer-hero-content">
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:4px">${s.region}</div>
          <div style="font-size:20px;font-weight:700;color:white;letter-spacing:-0.02em">${s.name}</div>
        </div>
      </div>
      <button class="town-drawer-close" onclick="closeTownDrawer()">${Icons.close}</button>
    </div>
    <div class="town-drawer-body">
      <div class="drawer-stat-grid">
        <div class="drawer-stat">
          <div class="drawer-stat-label">Median</div>
          <div class="drawer-stat-value">${fmtKs(drawerMedian)}</div>
          <div class="drawer-stat-sub">${deltaPill(drawerDpct)}</div>
        </div>
        <div class="drawer-stat">
          <div class="drawer-stat-label">$/sqm</div>
          <div class="drawer-stat-value">$${s.ppsqm.toLocaleString()}</div>
          <div class="drawer-stat-sub" style="color:var(--ink-3);font-size:10px">per sqm</div>
        </div>
        <div class="drawer-stat">
          <div class="drawer-stat-label">Sales</div>
          <div class="drawer-stat-value">${drawerVol.toLocaleString()}</div>
          <div class="drawer-stat-sub" style="color:var(--ink-3);font-size:10px">${volLabel}</div>
        </div>
      </div>

      <div>
        <div class="drawer-section-title">Price range (P25–P75)</div>
        <div style="font-size:13px;color:var(--ink-2)">${fmtKs(s.p25)} <span style="color:var(--ink-3)">–</span> ${fmtKs(s.p75)}</div>
      </div>

      <div>
        <div class="drawer-section-title">12-month trend</div>
        <div class="spark-wrap">${spark}</div>
      </div>

      <div>
        <div class="drawer-section-title">Flat type mix</div>
        ${typeBars || '<div style="color:var(--ink-3);font-size:12px">No data</div>'}
      </div>
    </div>
    <div class="drawer-footer-btns">
      <button class="btn-secondary${isStarred ? ' starred' : ''}" id="drawerStarBtn_${townId}" onclick="drawerToggleShortlist('${townId}',this)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="${isStarred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span class="btn-lbl">${isStarred ? 'Shortlisted' : 'Shortlist'}</span>
      </button>
      <button class="btn-secondary" onclick="drawerAddToCompare('${townId}')">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>
        <span>Compare</span>
      </button>
      <button class="drawer-open-btn" onclick="openTownDashboard('${townId}')">
        Open ${Icons.back.replace('stroke-linecap="round" stroke-linejoin="round">', 'stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)">')}
      </button>
    </div>
  `;
}

window.drawerToggleShortlist = function(townId, btn) {
  _shortlist.toggle(townId);
  const starred = _shortlist.has(townId);
  btn.classList.toggle("starred", starred);
  btn.querySelector("svg").setAttribute("fill", starred ? "currentColor" : "none");
  const lbl = btn.querySelector(".btn-lbl");
  if (lbl) lbl.textContent = starred ? "Shortlisted" : "Shortlist";
};

window.drawerAddToCompare = function(townId) {
  compareState.mode = "town";
  const emptyIdx = state.compareSlots.findIndex(s => !s);
  if (emptyIdx >= 0) state.compareSlots[emptyIdx] = townId;
  else if (state.compareSlots.length < 3) state.compareSlots.push(townId);
  else state.compareSlots[2] = townId;
  renderCompare();
  showView("compare");
};

/* ══════════════════════════════════════════════════════════════════════════
   TOWN FULL DASHBOARD
   ══════════════════════════════════════════════════════════════════════════ */
function openTownDashboard(townId) {
  state.activeTown = townId;
  showView("town");
  renderTownDashboard(townId);
}

/* flat-type colour palette — consistent across chart + pills */
const TYPE_LINE_COLORS = {
  "2 ROOM":          "#34d399",
  "3 ROOM":          "#6c8cff",
  "4 ROOM":          "#fb923c",
  "5 ROOM":          "#f43f5e",
  "EXECUTIVE":       "#a78bfa",
  "MULTI-GENERATION":"#facc15",
};

function buildTypeTrendChart(townId, W = 620, sliceTlFn = null) {
  const ttl = DB.town_type_timelines?.[townId] || {};
  const types = Object.keys(ttl).filter(ft => ttl[ft]?.length >= 2);
  if (!types.length) return "<div class='td-insuf'>No flat-type timeline data</div>";

  const H = Math.round(W * (220 / 620));
  const pad = { t: 16, b: 28, l: 48, r: Math.min(110, Math.round(W * 0.18)) };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;

  // Unified month axis — sliced to period when fn is provided
  const rawTl = DB.town_timelines[townId] || [];
  const slicedTl = sliceTlFn ? sliceTlFn(rawTl.filter(d => d.med != null)) : rawTl;
  const allMonths = slicedTl.map(d => d.m);
  if (!allMonths.length) return "";

  // Y range across all types within the sliced window
  const monthSet = new Set(allMonths);
  const allVals = types.flatMap(ft => ttl[ft].filter(d => monthSet.has(d.m)).map(d => d.med).filter(Boolean));
  if (!allVals.length) return "";
  const minV = Math.min(...allVals) * 0.96;
  const maxV = Math.max(...allVals) * 1.03;

  const px = i  => pad.l + (i / (allMonths.length - 1)) * chartW;
  const py = v  => pad.t + (1 - (v - minV) / (maxV - minV)) * chartH;

  // Y-axis ticks
  const yTicks = Array.from({length: 4}, (_, i) => {
    const v = minV + (maxV - minV) * (i / 3);
    const y = py(v);
    return `<line x1="${pad.l - 3}" y1="${y.toFixed(1)}" x2="${W - pad.r}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <text x="${pad.l - 6}" y="${(y + 4).toFixed(1)}" font-size="9" fill="var(--ink-3)" text-anchor="end" font-family="Inter,sans-serif">$${Math.round(v)}k</text>`;
  }).join("");

  // X-axis year labels
  const seenYrs = new Set();
  const xLabels = allMonths.map((m, i) => {
    const yr = m.slice(0, 4);
    if (i % 12 !== 0 || seenYrs.has(yr)) return "";
    seenYrs.add(yr);
    return `<text x="${px(i).toFixed(1)}" y="${H}" font-size="9" fill="var(--ink-3)" text-anchor="middle" font-family="Inter,sans-serif">${yr}</text>`;
  }).join("");

  // Collect last-Y per type for label collision avoidance (same algorithm as combo chart)
  const LINE_H = 13;
  const typeEntries = types.map(ft => {
    const series = ttl[ft];
    const c = TYPE_LINE_COLORS[ft] || "var(--accent)";
    // Map each series point to a position on the shared x axis
    const pts = series
      .map(d => {
        const xi = allMonths.indexOf(d.m);
        if (xi < 0 || d.med == null) return null;
        return [px(xi), py(d.med)];
      })
      .filter(Boolean);
    if (pts.length < 2) return null;

    let lp = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const cp1x = (pts[i-1][0] + pts[i][0]) / 2;
      lp += ` C${cp1x.toFixed(1)},${pts[i-1][1].toFixed(1)} ${cp1x.toFixed(1)},${pts[i][1].toFixed(1)} ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
    }
    const lastPt = pts[pts.length - 1];
    return { ft, c, lp, dotY: lastPt[1], lblY: lastPt[1], lastX: lastPt[0] };
  }).filter(Boolean);

  // Spread labels
  typeEntries.sort((a, b) => a.dotY - b.dotY);
  for (let i = 1; i < typeEntries.length; i++) {
    if (typeEntries[i].lblY - typeEntries[i-1].lblY < LINE_H)
      typeEntries[i].lblY = typeEntries[i-1].lblY + LINE_H;
  }
  for (let i = typeEntries.length - 1; i >= 0; i--) {
    if (typeEntries[i].lblY > H - pad.b - 2) typeEntries[i].lblY = H - pad.b - 2;
  }
  for (let i = typeEntries.length - 2; i >= 0; i--) {
    if (typeEntries[i+1].lblY - typeEntries[i].lblY < LINE_H)
      typeEntries[i].lblY = typeEntries[i+1].lblY - LINE_H;
  }

  const labelX = W - pad.r + 8;
  const lines = typeEntries.map(({ ft, c, lp, dotY, lblY, lastX }) => {
    const lbl = ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen");
    const leader = Math.abs(lblY - dotY) > 3
      ? `<line x1="${lastX.toFixed(1)}" y1="${dotY.toFixed(1)}" x2="${labelX.toFixed(1)}" y2="${(lblY+1).toFixed(1)}" stroke="${c}" stroke-width="1" opacity="0.35" stroke-dasharray="2 2"/>`
      : "";
    return `<path d="${lp}" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>
            <circle cx="${lastX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="3" fill="${c}" stroke="var(--bg)" stroke-width="1.5"/>
            ${leader}
            <text x="${labelX.toFixed(1)}" y="${(lblY+4).toFixed(1)}" font-size="9" fill="${c}" font-family="Inter,sans-serif" font-weight="700">${lbl}</text>`;
  }).join("");

  return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:visible">
    ${yTicks}${xLabels}${lines}
  </svg>`;
}


function renderTownDashboard(townId) {
  const s  = DB.town_summaries[townId];
  const tl = DB.town_timelines[townId] || [];
  if (!s) return;

  townDashState.townId = townId;
  const period = townDashState.period;

  // Slice timeline to selected period
  const fullTl = tl.filter(d => d.med != null);
  function sliceTl(arr) {
    if (period === "1y") return arr.slice(-12);
    if (period === "3y") return arr.slice(-36);
    if (period === "5y") return arr.slice(-60);
    return arr;
  }
  const periodTl = sliceTl(fullTl);

  // Period-aware stats
  const periodMedian = (() => {
    if (!periodTl.length) return s.median;
    const prices = periodTl.map(d => d.med).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  })();
  const periodDpct = (() => {
    if (periodTl.length < 2) return s.dpct;
    const first = periodTl[0].med, last = periodTl[periodTl.length - 1].med;
    return first > 0 ? (last - first) / first * 100 : 0;
  })();
  const periodLabel = period === "1y" ? "1Y" : period === "3y" ? "3Y" : period === "5y" ? "5Y" : "All-time";
  const periodStart = periodTl.length ? fmtMonth(periodTl[0].m) : "";
  const periodEnd   = periodTl.length ? fmtMonth(periodTl[periodTl.length - 1].m) : "";

  // Period-aware volume: sum block vol_by_year
  const periodVol = (() => {
    if (!periodTl.length) return s.vol;
    const minY = parseInt(periodTl[0].m), maxY = parseInt(periodTl[periodTl.length - 1].m);
    const blocks = state.blocksByTown[townId] || [];
    let v = 0;
    for (const b of blocks) {
      if (!b.vol_by_year) continue;
      for (let y = minY; y <= maxY; y++) v += (b.vol_by_year[y] || 0);
    }
    return v || s.vol;
  })();

  // Hide the legacy header
  const legacyHeader = document.getElementById("townViewHeader");
  if (legacyHeader) legacyHeader.style.display = "none";

  const isTownStarred = _shortlist.has(townId);

  // Period selector buttons
  const periodBtns = ["1y","3y","5y","all"].map(p =>
    `<button class="trends-period-btn${period === p ? " active" : ""}" onclick="setTownPeriod('${p}')">${p.toUpperCase()}</button>`
  ).join("");

  // Hero strip
  const heroHtml = `<div class="town-hero">
    <div class="town-hero-top">
      <button class="town-hero-back" onclick="showView('map')">${Icons.back}</button>
      <div class="town-hero-titles">
        <div class="town-hero-eyebrow">${s.region} · HDB Town</div>
        <div class="town-hero-name">${s.name}</div>
        <div class="town-hero-region">${periodVol.toLocaleString()} transactions · ${periodLabel} view</div>
      </div>
      <div class="town-hero-actions">
        <div class="trends-period-btns" style="margin-right:12px">${periodBtns}</div>
        <button class="btn-secondary${isTownStarred ? " starred" : ""}" id="tdStarBtn"
          onclick="_shortlist.toggle('${townId}'); updateShortlistUI(); this.classList.toggle('starred'); this.textContent = _shortlist.has('${townId}') ? '★ Saved' : '☆ Save to shortlist';">
          ${isTownStarred ? "★ Saved" : "☆ Save to shortlist"}
        </button>
      </div>
    </div>
    <div class="town-strip">
      <div class="town-strip-cell">
        <div class="town-strip-lbl">Median price</div>
        <div class="town-strip-val">${fmtKs(periodMedian)}</div>
        <div class="town-strip-sub">${deltaPill(periodDpct)} ${periodLabel}</div>
      </div>
      <div class="town-strip-cell">
        <div class="town-strip-lbl">$ / sqm</div>
        <div class="town-strip-val">$${(s.ppsqm||0).toLocaleString()}</div>
        <div class="town-strip-sub">last 3 months</div>
      </div>
      <div class="town-strip-cell">
        <div class="town-strip-lbl">Transactions</div>
        <div class="town-strip-val">${periodVol.toLocaleString()}</div>
        <div class="town-strip-sub">${periodLabel} total</div>
      </div>
      <div class="town-strip-cell">
        <div class="town-strip-lbl">Median lease</div>
        <div class="town-strip-val">${s.med_lease ?? "—"}y</div>
        <div class="town-strip-sub">
          ${s.low_lease_pct > 30 ? `<span style="color:var(--amber)">${s.low_lease_pct}% &lt;60y</span>` : "remaining"}
        </div>
      </div>
      <div class="town-strip-cell">
        <div class="town-strip-lbl">Price band</div>
        <div class="town-strip-val">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${tierColor(periodMedian)};vertical-align:middle;margin-right:5px"></span>
          ${tierLabel(periodMedian)}
        </div>
        <div class="town-strip-sub">vs national</div>
      </div>
    </div>
  </div>`;

  // Story callout (period-aware)
  const bits = [];
  if (periodDpct > 5) bits.push(`prices are up ${periodDpct.toFixed(1)}% over the ${periodLabel} window`);
  else if (periodDpct < -2) bits.push(`prices have softened ${Math.abs(periodDpct).toFixed(1)}% over ${periodLabel}`);
  else if (periodDpct != null) bits.push(`prices are roughly flat (${fmtPct(periodDpct)} over ${periodLabel})`);
  if (s.velocity === "above") bits.push("transaction volume is running above its 12-month average");
  else if (s.velocity === "below") bits.push("transaction volume is running below average");
  if ((s.low_lease_pct||0) > 30) bits.push(`${s.low_lease_pct}% of recent sales had less than 60 years left on the lease`);
  const storyText = bits.length ? `In <strong>${s.name}</strong>, ${bits.join(", ")}.` : null;
  const storyHtml = storyText ? `<div class="story-callout">
    <div>
      <div class="story-callout-eyebrow">In a sentence</div>
      <div class="story-callout-body">${storyText}</div>
    </div>
  </div>` : "";

  function sectionHeader(num, title, sub) {
    return `<div class="town-section-header">
      <span class="town-section-num">0${num}</span>
      <span class="town-section-title">${title}</span>
      ${sub ? `<span class="town-section-sub">${sub}</span>` : ""}
    </div>`;
  }

  // Section 1: Snapshot — period-aware price trend
  const sec1 = `
    ${sectionHeader(1, "Snapshot", `${periodStart} – ${periodEnd}`)}
    ${storyHtml}
    <div class="td-card-hero td-col-7">
      <div class="td-card-title">Price Trend <span class="td-card-note">${periodLabel} · Monthly median by flat type</span></div>
      <div class="td-spark-wrap" id="townChartWrap">${buildTypeTrendChart(townId, 620, sliceTl)}</div>
      <div style="display:flex;gap:18px;margin-top:6px;font-size:11px;color:var(--ink-3)">
        <span>${periodStart}</span>
        <span style="flex:1;text-align:center">—</span>
        <span>${periodEnd}</span>
      </div>
    </div>
    <div class="td-card td-col-5">
      <div class="td-card-title">Quick Stats <span class="td-card-note">${periodLabel}</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:4px">
        <div><div class="kpi-label">P25 — P75</div><div class="kpi-value" style="font-size:16px">${fmtKs(s.p25)}–${fmtKs(s.p75)}</div><div class="kpi-sub">Last 3-month range</div></div>
        <div><div class="kpi-label">$ / sqm</div><div class="kpi-value" style="font-size:16px">$${(s.ppsqm||0).toLocaleString()}</div><div class="kpi-sub">Median, last 3 months</div></div>
        <div><div class="kpi-label">Transactions</div><div class="kpi-value" style="font-size:16px">${periodVol.toLocaleString()}</div><div class="kpi-sub">${periodLabel} total</div></div>
        <div><div class="kpi-label">Velocity</div><div class="kpi-value" style="font-size:16px;color:${s.velocity==="above"?"var(--green)":"var(--ink-3)"}">
          ${s.velocity === "above" ? "Hot" : "Cool"}
        </div><div class="kpi-sub">${s.velocity === "above" ? "Above 12mo avg" : "Below 12mo avg"}</div></div>
      </div>
    </div>`;

  // Section 2: Flat types + storey + price distribution
  const ftOrder = ["2 ROOM","3 ROOM","4 ROOM","5 ROOM","EXECUTIVE","MULTI-GENERATION"];
  const maxFtMed = Math.max(...Object.values(s.type_medians || {}), 1);
  const scatByType = {};
  (s.scatter || []).forEach(p => {
    if (!scatByType[p.t]) scatByType[p.t] = [];
    scatByType[p.t].push(p.y * 1000 / p.x);
  });
  const medPpsqm = ft => {
    const arr = (scatByType[ft] || []).sort((a,b) => a-b);
    if (!arr.length) return null;
    return Math.round(arr[Math.floor(arr.length / 2)]);
  };
  const typeBreakdownHtml = ftOrder
    .filter(ft => s.type_medians?.[ft])
    .map(ft => {
      const med2 = s.type_medians[ft];
      const pct  = s.type_mix?.[ft] || 0;
      const ppsqm2 = medPpsqm(ft);
      const c    = TYPE_LINE_COLORS[ft] || "var(--accent)";
      const barW = (med2 / maxFtMed * 100).toFixed(1);
      const shortFt = ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen");
      return `<div class="td-ftb-row">
        <span class="td-ftb-dot" style="background:${c}"></span>
        <span class="td-ftb-label">${shortFt}</span>
        <div class="td-ftb-bar-wrap"><div class="td-ftb-bar" style="width:${barW}%;background:${c}"></div></div>
        <span class="td-ftb-med">${fmtKs(med2)}</span>
        <span class="td-ftb-ppsqm">${ppsqm2 ? `$${ppsqm2.toLocaleString()}/m²` : "—"}</span>
        <span class="td-ftb-pct">${pct}%</span>
      </div>`;
    }).join("") || `<div class="td-insuf">No flat type data</div>`;

  const storeyGridHtml = Object.keys(s.storey_meds || {}).length > 0
    ? `<div class="storey-grid">${
        [["low","Lower (1–6)"],["mid","Mid (7–12)"],["high","High (13+)"]].map(([k,lbl]) => {
          const v = s.storey_meds[k];
          if (!v) return "";
          const base = s.storey_meds.low || v;
          const prem = ((v - base) / base * 100);
          return `<div class="storey-cell">
            <div class="storey-cell-lbl">${lbl}</div>
            <div class="storey-cell-val">${fmtKs(v)}</div>
            ${k !== "low" && prem > 0 ? `<div class="storey-cell-prem">+${prem.toFixed(0)}% vs low</div>` : ""}
          </div>`;
        }).join("")
      }</div>`
    : `<div class="td-insuf">Insufficient data</div>`;

  const dist   = s.price_dist || [];
  const dlbls  = s.dist_labels || [];
  const maxDist = Math.max(...dist, 1);
  const distBarsHtml = dist.map((v, i) => {
    const bh = Math.max(2, (v / maxDist) * 48);
    const hi = v === Math.max(...dist);
    return `<div class="td-dist-bar-col">
      <div class="td-dist-bar" style="height:${bh}px;background:${hi ? "var(--accent)" : "var(--surface-3)"}" title="${dlbls[i]}: ${v} txns"></div>
      <div class="td-dist-lbl">${(dlbls[i] || "").replace("$","").replace("k","")}</div>
    </div>`;
  }).join("");

  const sec2 = `
    ${sectionHeader(2, "What you can buy here", "Median price by flat type")}
    <div class="td-card td-col-7">
      <div class="td-card-title">Flat Type Breakdown <span class="td-card-note">last 12 months</span></div>
      ${typeBreakdownHtml}
    </div>
    <div class="td-card td-col-5">
      <div class="td-card-title">Storey Premium <span class="td-card-note">Median by floor band</span></div>
      ${storeyGridHtml}
    </div>
    <div class="td-card td-col-12">
      <div class="td-card-title">Price Distribution <span class="td-card-note">${s.vol} transactions in the last 3 months</span></div>
      <div class="td-dist-chart td-dist-chart--slim">${distBarsHtml}</div>
    </div>`;

  // Section 3: Blocks table (with LCD year + age) + similar towns
  const allBlocks = state.blocksByTown[townId] || [];

  // Period-filtered block volume
  const minPY = periodTl.length ? parseInt(periodTl[0].m) : 0;
  const maxPY = periodTl.length ? parseInt(periodTl[periodTl.length-1].m) : 9999;
  const blocksWithVol = allBlocks.map(b => {
    let vol = 0;
    if (b.vol_by_year) {
      for (let y = minPY; y <= maxPY; y++) vol += (b.vol_by_year[y] || 0);
    } else {
      vol = b.vol || 0;
    }
    const lcdYear = b.lcd ? Number(b.lcd) : null;
    const buildingAge = lcdYear ? (new Date().getFullYear() - lcdYear) : null;
    return { ...b, periodVol: vol, lcdYear, buildingAge };
  }).filter(b => b.periodVol > 0).sort((a, b) => b.periodVol - a.periodVol);

  const topBlocks = blocksWithVol.slice(0, 15);

  const blocksTableHtml = topBlocks.length === 0
    ? `<div class="td-insuf">No transactions in selected period</div>`
    : `<div class="td-blocks-table-wrap">
      <table class="td-blocks-table">
        <thead><tr>
          <th>Block</th><th>Street</th>
          <th class="num">Built</th><th class="num">Age</th>
          <th class="num">Txns</th><th class="num" style="text-align:right">Median</th><th></th>
        </tr></thead>
        <tbody>${topBlocks.map(b => {
          const blockKey = `${townId}|${b.block}|${b.street}`;
          const bkEsc = blockKey.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
          const isStar = _shortlist.has(blockKey);
          const ageStr = b.buildingAge != null ? `${b.buildingAge}y` : "—";
          const lcdStr = b.lcdYear != null ? String(b.lcdYear) : "—";
          const ageColor = b.buildingAge != null && b.buildingAge > 35
            ? "var(--amber)" : b.buildingAge != null && b.buildingAge > 20
            ? "var(--ink-2)" : "var(--green)";
          return `<tr>
            <td class="num mono">${b.block}</td>
            <td style="font-size:11px;color:var(--ink-2)">${b.street}</td>
            <td class="num mono" style="color:var(--ink-2)">${lcdStr}</td>
            <td class="num" style="color:${ageColor};font-weight:700">${ageStr}</td>
            <td class="num">${b.periodVol}</td>
            <td class="num" style="text-align:right;font-weight:700">${fmtKs(b.med)}</td>
            <td><button class="block-star-btn${isStar ? " starred" : ""}"
              onclick="_shortlist.toggle('${bkEsc}'); this.classList.toggle('starred'); updateShortlistUI();" title="Shortlist">★</button></td>
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>`;

  const med = periodMedian;
  const comparable = DB.towns
    .filter(id => id !== townId)
    .map(id => ({ id, cs: DB.town_summaries[id] }))
    .filter(({ cs }) => cs && cs.median && Math.abs(cs.median - med) / med <= 0.15)
    .sort((a, b) => Math.abs(a.cs.median - med) - Math.abs(b.cs.median - med))
    .slice(0, 5);
  const simTownsHtml = comparable.length
    ? comparable.map(({ id, cs }) => {
        const diff = cs.median - med;
        return `<div class="sim-town-row" onclick="openTownDashboard('${id}')">
          <div>
            <div class="block-row-name">${cs.name}</div>
            <div class="block-row-street">${cs.region}</div>
          </div>
          <span class="block-row-vol">${(cs.vol_12m||0).toLocaleString()}/12mo</span>
          <span class="block-row-med">${fmtKs(cs.median)}</span>
          <span style="font-size:11px;font-weight:700;color:${diff > 0 ? "var(--red)" : "var(--green)"};width:50px;text-align:right">${diff > 0 ? "+" : "−"}$${Math.abs(diff)}k</span>
        </div>`;
      }).join("")
    : `<div style="font-size:12px;color:var(--ink-3)">No comparable towns within ±15% median.</div>`;

  const sec3 = `
    ${sectionHeader(3, "Active blocks", `${periodLabel} · Top ${topBlocks.length} by volume`)}
    <div class="td-card td-col-7">
      <div class="td-card-title">Blocks with Transactions <span class="td-card-note">Built year, age, ${periodLabel} vol · ★ to shortlist</span></div>
      ${blocksTableHtml}
    </div>
    <div class="td-card td-col-5">
      <div class="td-card-title">Similar towns <span class="td-card-note">Closest median price</span></div>
      ${simTownsHtml}
      <div id="tdMiniMapWrap" style="margin-top:12px;border-radius:var(--r-sm);overflow:hidden;height:140px"></div>
    </div>`;

  // Section 4: Stock by Commencement Decade
  const decadeMap = {};
  for (const b of allBlocks) {
    if (!b.lcd) continue;
    const decade = Math.floor(Number(b.lcd) / 10) * 10;
    if (!decadeMap[decade]) decadeMap[decade] = { count: 0, blocks: [] };
    decadeMap[decade].count++;
    decadeMap[decade].blocks.push(b);
  }
  const decades = Object.keys(decadeMap).map(Number).sort((a, b) => a - b);
  const maxDecadeCount = Math.max(...decades.map(d => decadeMap[d].count), 1);

  let decadeHtml = "";
  if (decades.length === 0) {
    decadeHtml = `<div class="td-insuf">No commencement year data available</div>`;
  } else {
    decadeHtml = `<div class="td-decade-chart">${decades.map(d => {
      const info = decadeMap[d];
      const barW = (info.count / maxDecadeCount * 100).toFixed(1);
      const age = new Date().getFullYear() - d;
      const ageColor = age > 35 ? "var(--amber)" : age > 20 ? "var(--accent)" : "var(--green)";
      const leaseTip = `Built ~${d}s — approx ${99 - age}y lease remaining`;
      return `<div class="td-decade-row">
        <div class="td-decade-lbl">${d}s</div>
        <div class="td-decade-bar-wrap">
          <div class="td-decade-bar" style="width:${barW}%;background:${ageColor}" title="${leaseTip}"></div>
        </div>
        <div class="td-decade-count">${info.count} blks</div>
        <div class="td-decade-lease" style="color:${ageColor}">~${99 - age}y left</div>
      </div>`;
    }).join("")}</div>`;
  }

  const leaseNote = (s.low_lease_pct||0) > 50
    ? `This is a <strong style="color:var(--amber)">mature estate</strong> — most recent sales are older flats. Lease decay is a key value driver here.`
    : (s.low_lease_pct||0) > 20
    ? `Mixed lease profile. Some blocks are older, some recently launched. Compare lease before bidding.`
    : `Healthy lease profile: most flats here have <strong style="color:var(--green)">plenty of years left</strong>. Easier to secure financing.`;

  const sec4 = `
    ${sectionHeader(4, "Building stock by decade", "Commencement year of blocks in this town")}
    <div class="td-card td-col-7">
      <div class="td-card-title">Blocks by Commencement Decade <span class="td-card-note">${allBlocks.filter(b => b.lcdYear).length} blocks with data</span></div>
      ${decadeHtml}
    </div>
    <div class="td-card td-col-5">
      <div class="td-card-title">Lease Health Note</div>
      <p style="font-size:13px;color:var(--ink-2);line-height:1.6;margin:8px 0">${leaseNote}</p>
      <div style="margin-top:12px;padding:10px;background:var(--surface-2);border-radius:var(--r-sm);font-size:12px;color:var(--ink-2)">
        <div style="font-weight:700;color:var(--ink);margin-bottom:4px">Loan eligibility rule of thumb</div>
        HDB requires remaining lease to cover the youngest buyer to age 95. Blocks built in the ${decades[0] || "1970"}s may restrict CPF usage and bank financing.
      </div>
    </div>`;

  // Section 5: Recent transactions (full width, 15 rows)
  const txnRows = (s.recent_txns || []).slice(0, 15).map(t => {
    const low = t.lease_yrs != null && t.lease_yrs < 60;
    return `<tr>
      <td class="num">${fmtMonth(t.month)}</td>
      <td><span class="txn-block-link">Blk ${t.block}</span></td>
      <td>${t.type.replace(" ROOM","rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MG")}</td>
      <td class="num">${t.storey}</td>
      <td class="num">${t.lease_yrs != null ? t.lease_yrs+"y" : "—"}${low ? ` <span class="td-low-lease-badge">Short</span>` : ""}</td>
      <td class="txn-price">${fmtKs(Math.round(t.price / 1000))}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="6" class="empty-state">No recent transactions</td></tr>`;

  const sec5 = `
    ${sectionHeader(5, "Recent transactions", `Latest ${Math.min(15,(s.recent_txns||[]).length)} sales`)}
    <div class="td-card td-col-12">
      <div class="td-card-title">Recent Transactions <span class="td-card-note">latest ${Math.min(15,(s.recent_txns||[]).length)} sales</span></div>
      <div style="overflow:auto;max-height:480px">
        <table class="txn-table">
          <thead><tr><th>Month</th><th>Blk</th><th>Type</th><th>Storey</th><th>Lease</th><th style="text-align:right">Price</th></tr></thead>
          <tbody>${txnRows}</tbody>
        </table>
      </div>
    </div>`;

  // Write header
  document.getElementById("townViewTitle").innerHTML =
    `${s.name} <span style="font-size:12px;font-weight:500;color:var(--ink-3);background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-pill);padding:3px 10px;vertical-align:middle;margin-left:8px">${s.region}</span>`;

  document.getElementById("townViewBody").innerHTML = `
    ${heroHtml}
    <div class="town-body">
      <div class="town-grid td-page">
        ${sec1}${sec2}${sec3}${sec4}${sec5}
      </div>
    </div>`;

  // Mini-map
  const miniMapEl = document.getElementById("tdMiniMapWrap");
  if (miniMapEl && s.coords) {
    const miniMap = L.map(miniMapEl, {
      center: [1.352, 103.82], zoom: 9.5,
      zoomControl: false, attributionControl: false,
      dragging: false, scrollWheelZoom: false,
      doubleClickZoom: false, touchZoom: false,
    });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19, subdomains: "abcd",
    }).addTo(miniMap);
    L.circleMarker(s.coords, {
      radius: 10, color: "var(--accent)", fillColor: "var(--accent)",
      fillOpacity: 0.5, weight: 2.5,
    }).addTo(miniMap);
    setTimeout(() => miniMap.invalidateSize(), 120);
  }

  // Re-render type trend chart at actual container width
  requestAnimationFrame(() => {
    const townWrap = document.getElementById("townChartWrap");
    if (!townWrap) return;
    if (townWrap.clientWidth > 10) townWrap.innerHTML = buildTypeTrendChart(townId, townWrap.clientWidth, sliceTl);
    if (townWrap._resizeObs) townWrap._resizeObs.disconnect();
    let lastTownW = 0;
    townWrap._resizeObs = new ResizeObserver(entries => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w < 10 || w === lastTownW) return;
      lastTownW = w;
      townWrap.innerHTML = buildTypeTrendChart(townId, w, sliceTl);
    });
    townWrap._resizeObs.observe(townWrap);
  });
}
/* ══════════════════════════════════════════════════════════════════════════
   COMPARE VIEW
   ══════════════════════════════════════════════════════════════════════════ */
const COMPARE_COLORS = ["#e07b4f", "#5ec896", "#b48ee0"];

const compareState   = { mode: "town" }; // "town" | "block"
const townDashState  = { period: "all", townId: null }; // period: "1y"|"3y"|"5y"|"all"

function renderCompare() {
  renderCompareHead();
  renderCompareGrid();
}

function setCompareMode(m) {
  compareState.mode = m;
  // Clear slots that don't match the new mode
  if (m === "town") state.compareSlots = state.compareSlots.filter(id => DB.town_summaries[id]);
  else state.compareSlots = state.compareSlots.filter(id => id.includes("|"));
  renderCompare();
}

function renderCompareSlots() { renderCompareHead(); } // compat shim

function renderCompareHead() {
  const container = document.getElementById("compareSlots");
  if (!container) return;
  const header = document.getElementById("compareHeader");
  if (header) {
    header.className = "compare-head";
    header.innerHTML = `
      <div class="compare-head-titlerow">
        <h2 class="compare-head-title">Side-by-side</h2>
        <span class="compare-head-sub">Add up to 3 ${compareState.mode === "town" ? "towns" : "blocks"}</span>
      </div>
      <div class="compare-mode-tabs">
        <button class="compare-mode-tab${compareState.mode==="town"?" active":""}" onclick="setCompareMode('town')">Compare towns</button>
        <button class="compare-mode-tab${compareState.mode==="block"?" active":""}" onclick="setCompareMode('block')">Compare blocks</button>
      </div>`;
  }

  const slots = [0, 1, 2].map(i => {
    const id = state.compareSlots[i];
    if (id) {
      const c = COMPARE_COLORS[i];
      let name, meta;
      if (compareState.mode === "town") {
        const s = DB.town_summaries[id];
        name = s?.name || id;
        meta = s?.region || "";
      } else {
        const parts = id.split("|");
        name = `Blk ${parts[1]}`;
        meta = parts[2] || "";
      }
      return `<div class="compare-slot filled" style="border-color:${c}">
        <span class="compare-slot-color" style="background:${c}"></span>
        <div>
          <div class="compare-slot-name">${name}</div>
          <div class="compare-slot-meta">${meta}</div>
        </div>
        <button class="compare-slot-remove" onclick="removeCompareSlot(${i})">${Icons.close}</button>
      </div>`;
    }
    return `<div class="compare-slot" onclick="openComparePicker(${i})">
      ${Icons.plus} <span>Add ${compareState.mode}</span>
    </div>`;
  });
  container.innerHTML = slots.join("");
}

function removeCompareSlot(i) {
  state.compareSlots.splice(i, 1);
  renderCompare();
}

function buildCompareTrendChart(W = 900) {
  const slots = state.compareSlots;
  const H = Math.round(W * (200 / 900));
  const pad = { t: 14, b: 28, l: 52, r: Math.min(120, Math.round(W * 0.14)) };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;

  // Collect all timelines and find shared range
  const tls = slots.map(id => DB.town_timelines[id] || []);
  const allMonths = [...new Set(tls.flatMap(tl => tl.map(d => d.m)))].sort();
  if (allMonths.length < 2) return "";

  const allVals = tls.flatMap(tl => tl.map(d => d.med).filter(Boolean));
  const minV = Math.min(...allVals) * 0.97;
  const maxV = Math.max(...allVals) * 1.03;

  const px = i  => pad.l + (i / (allMonths.length - 1)) * chartW;
  const py = v  => pad.t + (1 - (v - minV) / (maxV - minV)) * chartH;

  // Grid + Y axis
  const yTicks = Array.from({length: 4}, (_, i) => {
    const v = minV + (maxV - minV) * (i / 3);
    const y = py(v);
    return `<line x1="${pad.l}" y1="${y.toFixed(1)}" x2="${W - pad.r}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <text x="${pad.l - 6}" y="${(y + 4).toFixed(1)}" font-size="9" fill="var(--ink-3)" text-anchor="end" font-family="Inter,sans-serif">$${Math.round(v)}k</text>`;
  }).join("");

  const seenYrs = new Set();
  const xLabels = allMonths.map((m, i) => {
    const yr = m.slice(0, 4);
    if (i % 12 !== 0 || seenYrs.has(yr)) return "";
    seenYrs.add(yr);
    return `<text x="${px(i).toFixed(1)}" y="${H}" font-size="9" fill="var(--ink-3)" text-anchor="middle" font-family="Inter,sans-serif">${yr}</text>`;
  }).join("");

  // One line per town with collision-avoided labels
  const LINE_H = 13;
  const entries = slots.map((id, ci) => {
    const tl = tls[ci];
    const c = COMPARE_COLORS[ci];
    const pts = allMonths.map((m, i) => {
      const d = tl.find(x => x.m === m);
      return d?.med != null ? [px(i), py(d.med)] : null;
    }).filter(Boolean);
    if (pts.length < 2) return null;
    let path = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const cpx = (pts[i-1][0] + pts[i][0]) / 2;
      path += ` C${cpx.toFixed(1)},${pts[i-1][1].toFixed(1)} ${cpx.toFixed(1)},${pts[i][1].toFixed(1)} ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
    }
    const last = pts[pts.length - 1];
    return { id, c, path, dotY: last[1], lblY: last[1], lastX: last[0] };
  }).filter(Boolean);

  entries.sort((a, b) => a.dotY - b.dotY);
  for (let i = 1; i < entries.length; i++)
    if (entries[i].lblY - entries[i-1].lblY < LINE_H) entries[i].lblY = entries[i-1].lblY + LINE_H;
  for (let i = entries.length - 1; i >= 0; i--)
    if (entries[i].lblY > H - pad.b - 2) entries[i].lblY = H - pad.b - 2;
  for (let i = entries.length - 2; i >= 0; i--)
    if (entries[i+1].lblY - entries[i].lblY < LINE_H) entries[i].lblY = entries[i+1].lblY - LINE_H;

  const labelX = W - pad.r + 8;
  const lines = entries.map(({ id, c, path, dotY, lblY, lastX }) => {
    const name = DB.town_summaries[id]?.name || id;
    const leader = Math.abs(lblY - dotY) > 3
      ? `<line x1="${lastX.toFixed(1)}" y1="${dotY.toFixed(1)}" x2="${labelX}" y2="${(lblY+1).toFixed(1)}" stroke="${c}" stroke-width="1" opacity="0.35" stroke-dasharray="2 2"/>`
      : "";
    return `<path d="${path}" fill="none" stroke="${c}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.9"/>
            <circle cx="${lastX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="3.5" fill="${c}" stroke="var(--bg)" stroke-width="1.5"/>
            ${leader}
            <text x="${labelX}" y="${(lblY+4).toFixed(1)}" font-size="10" fill="${c}" font-family="Inter,sans-serif" font-weight="700">${name}</text>`;
  }).join("");

  return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" style="display:block;overflow:visible">
    ${yTicks}${xLabels}${lines}
  </svg>`;
}

function renderCompareColumns() { renderCompareGrid(); } // compat shim

function renderCompareGrid() {
  const body = document.getElementById("compareBody");
  if (!body) return;
  if (state.compareSlots.length === 0) {
    body.innerHTML = `<div class="compare-empty">
      <div class="compare-empty-icon">⇄</div>
      <div>Pick at least one ${compareState.mode} to start comparing.</div>
      <button class="btn-primary" style="margin-top:18px" onclick="openComparePicker(0)">Add a ${compareState.mode}</button>
    </div>`;
    return;
  }

  const slots = state.compareSlots;
  const n = slots.length;
  const colsCls = n === 2 ? "cols-2" : "cols-3";

  // Build items
  const items = slots.map((id, i) => {
    if (compareState.mode === "town") {
      return { id, type: "town", data: DB.town_summaries[id], color: COMPARE_COLORS[i] };
    } else {
      const parts = id.split("|");
      const b = (DB.blocks || []).find(b => b.town === parts[0] && b.block === parts[1] && b.street === parts[2]);
      return { id, type: "block", data: b, color: COMPARE_COLORS[i] };
    }
  }).filter(it => it.data);

  if (items.length === 0) {
    body.innerHTML = `<div class="compare-empty"><div class="compare-empty-icon">⇄</div><div>No valid data for selected items.</div></div>`;
    return;
  }

  // Winner detection: returns Set of indices that win
  function winners(getFn, higherIsBetter = true) {
    if (items.length < 2) return new Set();
    const vals = items.map(getFn);
    const best = higherIsBetter ? Math.max(...vals.filter(v => v != null)) : Math.min(...vals.filter(v => v != null));
    const ws = new Set();
    items.forEach((it, i) => { if (getFn(it) === best) ws.add(i); });
    return ws;
  }

  function compareRow(label, sub, fmtFn, ws, winLabel) {
    const cells = items.map((it, i) => {
      const isWin = ws && ws.has(i);
      return `<div class="compare-cell${isWin ? " compare-cell-win" : ""}">
        <div class="compare-cell-val">${fmtFn(it)}</div>
        ${isWin && winLabel ? `<div class="compare-cell-sub">${winLabel}</div>` : ""}
      </div>`;
    }).join("");
    return `<div class="compare-row ${colsCls}">
      <div class="compare-cell compare-cell-label">${label}${sub ? `<div class="helper">${sub}</div>` : ""}</div>
      ${cells}
    </div>`;
  }

  // Header row
  const headerCells = items.map(it => {
    const name = it.type === "town" ? it.data.name : `Blk ${it.data.block}`;
    const meta = it.type === "town" ? it.data.region : `${it.data.street} · ${DB.town_summaries[it.data.town]?.name || ""}`;
    return `<div class="compare-cell compare-header-cell" style="border-top-color:${it.color}">
      <div class="compare-header-name">${name}</div>
      <div class="compare-header-meta">${meta}</div>
    </div>`;
  }).join("");

  let rows = "";
  if (compareState.mode === "town") {
    rows = [
      compareRow("Median price", "Last 3 months",
        it => fmtKs(it.data.median),
        winners(it => -it.data.median, true), "cheapest"),
      compareRow("YoY change", "vs same period last year",
        it => deltaPill(it.data.dpct || 0),
        winners(it => it.data.dpct || 0, true)),
      compareRow("$ / sqm", "Last 3 months median",
        it => `$${(it.data.ppsqm||0).toLocaleString()}`,
        winners(it => -(it.data.ppsqm||9999), true), "best value"),
      compareRow("12-mo volume", "Trades in past year",
        it => (it.data.vol_12m||it.data.vol||0).toLocaleString(),
        winners(it => it.data.vol_12m||it.data.vol||0, true), "most liquid"),
      compareRow("Median lease", "Years remaining",
        it => it.data.med_lease ? `${it.data.med_lease} years` : "—",
        winners(it => it.data.med_lease||0, true), "freshest"),
      compareRow("Lease <60y", "% of recent sales with short lease",
        it => `${it.data.low_lease_pct||0}%`,
        winners(it => -(it.data.low_lease_pct||0), true)),
      compareRow("3-room median", null,
        it => it.data.type_medians?.["3 ROOM"] ? fmtKs(it.data.type_medians["3 ROOM"]) : "—",
        winners(it => -(it.data.type_medians?.["3 ROOM"]||9999), true)),
      compareRow("4-room median", null,
        it => it.data.type_medians?.["4 ROOM"] ? fmtKs(it.data.type_medians["4 ROOM"]) : "—",
        winners(it => -(it.data.type_medians?.["4 ROOM"]||9999), true)),
      compareRow("5-room median", null,
        it => it.data.type_medians?.["5 ROOM"] ? fmtKs(it.data.type_medians["5 ROOM"]) : "—",
        winners(it => -(it.data.type_medians?.["5 ROOM"]||9999), true)),
      compareRow("MRT stations", null,
        it => (AMENITIES[it.id]?.mrt||[]).length,
        winners(it => (AMENITIES[it.id]?.mrt||[]).length, true)),
      compareRow("Schools", null,
        it => (AMENITIES[it.id]?.schools||[]).length,
        winners(it => (AMENITIES[it.id]?.schools||[]).length, true)),
      compareRow("Hawker centres", null,
        it => (AMENITIES[it.id]?.hawker||[]).length,
        winners(it => (AMENITIES[it.id]?.hawker||[]).length, true)),
      compareRow("", null,
        it => `<button class="btn-secondary" style="height:32px;font-size:12px" onclick="openTownDashboard('${it.id}')">Open dashboard</button>`,
        null),
    ].join("");
  } else {
    rows = [
      compareRow("Median price", "All flat types",
        it => it.data.med ? fmtKs(it.data.med) : "—",
        winners(it => -(it.data.med||9999), true), "cheapest"),
      compareRow("Transactions", "All time on record",
        it => (it.data.vol||0).toLocaleString(),
        winners(it => it.data.vol||0, true)),
      compareRow("Lease commenced", "Year built",
        it => it.data.lcd || "—",
        winners(it => it.data.lcd||0, true), "newest"),
      compareRow("3-room median", null,
        it => it.data.types?.["3 ROOM"] ? fmtKs(it.data.types["3 ROOM"]) : "—",
        winners(it => -(it.data.types?.["3 ROOM"]||9999), true)),
      compareRow("4-room median", null,
        it => it.data.types?.["4 ROOM"] ? fmtKs(it.data.types["4 ROOM"]) : "—",
        winners(it => -(it.data.types?.["4 ROOM"]||9999), true)),
      compareRow("5-room median", null,
        it => it.data.types?.["5 ROOM"] ? fmtKs(it.data.types["5 ROOM"]) : "—",
        winners(it => -(it.data.types?.["5 ROOM"]||9999), true)),
      compareRow("Executive median", null,
        it => it.data.types?.["EXECUTIVE"] ? fmtKs(it.data.types["EXECUTIVE"]) : "—",
        winners(it => -(it.data.types?.["EXECUTIVE"]||9999), true)),
      compareRow("", null,
        it => `<button class="btn-secondary" style="height:32px;font-size:12px" onclick="openTownDashboard('${it.data.town}')">Open town</button>`,
        null),
    ].join("");
  }

  body.innerHTML = `<div class="compare-grid">
    <div class="compare-row ${colsCls}">
      <div class="compare-cell compare-cell-label">${compareState.mode === "town" ? "Town" : "Block"}</div>
      ${headerCells}
    </div>
    ${rows}
  </div>

  <!-- Price Trend chart (towns only) -->
  ${compareState.mode === "town" && slots.length > 0 ? `
  <div class="td-section-divider" style="margin-bottom:14px">
    <div class="td-section-divider-line"></div>
    <div class="td-section-divider-label">Price History</div>
    <div class="td-section-divider-line"></div>
  </div>
  <div class="td-card-hero trends-col-12" style="grid-column:1/-1">
    <div class="td-card-title">Median resale price · all-time</div>
    <div class="td-spark-wrap" id="compareChartWrap">${buildCompareTrendChart()}</div>
  </div>` : ""}`;

  // Resize observer for compare chart
  requestAnimationFrame(() => {
    const cmpWrap = document.getElementById("compareChartWrap");
    if (!cmpWrap) return;
    if (cmpWrap.clientWidth > 10) cmpWrap.innerHTML = buildCompareTrendChart(cmpWrap.clientWidth);
    if (cmpWrap._resizeObs) cmpWrap._resizeObs.disconnect();
    let lastCmpW = 0;
    cmpWrap._resizeObs = new ResizeObserver(entries => {
      const w = Math.floor(entries[0].contentRect.width);
      if (w < 10 || w === lastCmpW) return;
      lastCmpW = w;
      cmpWrap.innerHTML = buildCompareTrendChart(w);
    });
    cmpWrap._resizeObs.observe(cmpWrap);
  });
}

/* ── Town / block picker modal ───────────────────────────────────────────── */
function openComparePicker(slotIdx) {
  state.modalSlotIdx = slotIdx;
  compareState._pickerMode = compareState.mode;
  openTownPicker(slotIdx);
}


/* ── Town picker modal ───────────────────────────────────────────────────── */
function openTownPicker(slotIdx) {
  state.modalSlotIdx = slotIdx;
  state.modalOpen    = true;
  const mode = compareState._pickerMode || compareState.mode || "town";
  const title = document.getElementById("modalTitle");
  if (title) title.textContent = mode === "block" ? "Choose a block" : "Choose a town";
  const searchEl = document.getElementById("modalSearch");
  if (searchEl) searchEl.placeholder = mode === "block" ? "Search blocks, streets…" : "Search towns…";
  document.getElementById("modalOverlay").classList.add("open");
  document.getElementById("modalSearch").value = "";
  renderModalList("");
  setTimeout(() => document.getElementById("modalSearch").focus(), 100);
}

function closeTownPicker() {
  state.modalOpen = false;
  document.getElementById("modalOverlay").classList.remove("open");
}

function renderModalList(q) {
  const list = document.getElementById("modalTownList");
  const excluded = state.compareSlots;
  const mode = compareState._pickerMode || compareState.mode || "town";

  if (mode === "block") {
    const lq = q.toLowerCase();
    const blocks = (DB.blocks || [])
      .filter(b => b.vol >= 3)
      .filter(b => {
        const key = `${b.town}|${b.block}|${b.street}`;
        return !excluded.includes(key);
      })
      .filter(b => !q ||
        b.block.toLowerCase().includes(lq) ||
        b.street.toLowerCase().includes(lq) ||
        b.town.toLowerCase().includes(lq))
      .slice(0, 80);
    list.innerHTML = blocks.map(b => {
      const key = `${b.town}|${b.block}|${b.street}`;
      const townName = DB.town_summaries[b.town]?.name || b.town;
      return `<div class="modal-town-item" onclick="selectCompareTown('${key.replace(/'/g,"\\'")}')">
        <div>
          <div class="modal-town-name">Blk ${b.block}, ${b.street}</div>
          <div class="modal-town-region">${townName}</div>
        </div>
        <span class="tag region">${fmtKs(b.med)}</span>
        <span style="font-size:11px;color:var(--ink-3)">${b.vol} txns</span>
      </div>`;
    }).join("") || `<div class="empty-state">No blocks found</div>`;
    return;
  }

  const towns = DB.towns
    .filter(id => !excluded.includes(id))
    .filter(id => !q || DB.town_summaries[id]?.name.toLowerCase().includes(q.toLowerCase()));
  list.innerHTML = towns.map(id => {
    const s = DB.town_summaries[id];
    return `<div class="modal-town-item" onclick="selectCompareTown('${id}')">
      <div>
        <div class="modal-town-name">${s.name}</div>
        <div class="modal-town-region">${s.region}</div>
      </div>
      <span class="tag region">${fmtKs(s.median)}</span>
      <span class="delta-pill ${s.dpct > 0 ? 'up' : 'down'}">${fmtPct(s.dpct)}</span>
    </div>`;
  }).join("") || `<div class="empty-state">No towns found</div>`;
}

function selectCompareTown(id) {
  const idx = state.modalSlotIdx;
  if (idx >= state.compareSlots.length) state.compareSlots.push(id);
  else state.compareSlots[idx] = id;
  closeTownPicker();
  renderCompare();
}

/* ══════════════════════════════════════════════════════════════════════════
   TRENDS VIEW
   ══════════════════════════════════════════════════════════════════════════ */
const OVERLAY_COLORS = ["#e05c5c", "#f5a623", "#4ecb71", "#9b72d6", "#5bc8f5"];
const trendsState = { period: "all", overlayTowns: new Set(), sortBy: "price", sortDir: 1, flatType: "ALL", _typeExpanded: false, _refMedian: null };

function overlayColor(id) {
  const idx = [...trendsState.overlayTowns].indexOf(id);
  return OVERLAY_COLORS[idx >= 0 ? idx % OVERLAY_COLORS.length : 0];
}

function getTrendsNatTL() {
  const ft = trendsState.flatType;
  if (ft === "ALL") return DB.national_timeline;
  return (DB.national_type_timelines || {})[ft] || DB.national_timeline;
}

function getTrendsTownTL(id) {
  const ft = trendsState.flatType;
  if (ft === "ALL") return DB.town_timelines[id] || [];
  return ((DB.town_type_timelines || {})[id] || {})[ft] || [];
}

function getFilteredTownTL(id) {
  const full = getTrendsTownTL(id).filter(t => t.med != null);
  const p = trendsState.period;
  if (p === "1y") return full.slice(-12);
  if (p === "3y") return full.slice(-36);
  if (p === "5y") return full.slice(-60);
  return full;
}

const HDB_FLOOR_AREA = {
  "1 ROOM": 35, "2 ROOM": 45, "3 ROOM": 68, "4 ROOM": 93,
  "5 ROOM": 113, "EXECUTIVE": 140, "MULTI-GENERATION": 155
};

function buildTownMovers() {
  const ft = trendsState.flatType;
  return DB.towns.map(id => {
    const s  = DB.town_summaries[id];
    const tl = getFilteredTownTL(id); // already period+type filtered
    if (!s || tl.length < 2) return null;
    const now  = tl[tl.length-1].med;
    const prev = tl[0].med;
    const medianVal = now || s.median;

    // Vol: sum block vol_by_year for the years covered by the selected period.
    // vol_by_year keys are strings. For flat type filter, scale by type share from vol_by_type.
    const natSlice = getFilteredNatTL();
    const minY = natSlice.length ? parseInt(natSlice[0].m) : 0;
    const maxY = natSlice.length ? parseInt(natSlice[natSlice.length - 1].m) : 9999;
    const blocks = state.blocksByTown[id] || [];
    let volInPeriod = 0;
    for (const b of blocks) {
      if (!b.vol_by_year) continue;
      let bVol = 0;
      for (let y = minY; y <= maxY; y++) bVol += (b.vol_by_year[String(y)] || 0);
      if (ft !== "ALL" && b.vol_by_type) {
        const ftVol = b.vol_by_type[ft] || 0;
        const totalBVol = Object.values(b.vol_by_type).reduce((s, v) => s + v, 0);
        bVol = totalBVol > 0 ? Math.round(bVol * ftVol / totalBVol) : 0;
      }
      volInPeriod += bVol;
    }
    if (!volInPeriod) volInPeriod = s.vol;

    // $/sqm: compute from filtered timeline median + floor area
    // When a specific flat type is selected, use its floor area directly.
    // When ALL, derive weighted average floor area from type_mix.
    const periodMed = (() => {
      const prices = tl.map(d => d.med).filter(Boolean).sort((a, b) => a - b);
      return prices.length ? prices[Math.floor(prices.length / 2)] : null;
    })();
    const floorArea = (() => {
      if (ft !== "ALL") return HDB_FLOOR_AREA[ft] || null;
      const mix = s.type_mix || {};
      let totalPct = 0, weightedArea = 0;
      for (const [type, area] of Object.entries(HDB_FLOOR_AREA)) {
        const pct = mix[type] || 0;
        weightedArea += pct * area;
        totalPct += pct;
      }
      return totalPct > 0 ? weightedArea / totalPct : 93; // default to 4-room
    })();
    const ppsqm = (periodMed && floorArea)
      ? Math.round(periodMed * 1000 / floorArea)
      : s.ppsqm;

    return { id, name: s.name, region: s.region, median: medianVal, ppsqm,
             dpct: prev > 0 ? (now - prev) / prev * 100 : 0, vol: volInPeriod };
  }).filter(Boolean);
}

function renderTrends() {
  const wrap = document.getElementById("trendsViewWrap") || document.getElementById("trendsBody")?.parentElement;
  const container = document.getElementById("trendsBody");
  if (!DB || !container) return;

  const validNat = getFilteredNatTL().filter(d => d.med != null);
  if (!validNat.length) return;
  const latest  = validNat[validNat.length - 1];
  const first   = validNat[0];
  const totalVol = validNat.reduce((s, d) => s + (d.vol || 0), 0);

  const p = trendsState.period;
  const ft = trendsState.flatType;
  const periodLabel = p === "1y" ? "1Y" : p === "3y" ? "3Y" : p === "5y" ? "5Y" : "All-time";
  const periodLen = validNat.length; // months in current window

  // Period median = median of all monthly medians in the window (not just latest month)
  const periodMedianNat = (() => {
    const prices = validNat.map(d => d.med).sort((a, b) => a - b);
    return prices[Math.floor(prices.length / 2)];
  })();
  trendsState._refMedian = periodMedianNat;
  const periodChg = first.med > 0 ? (latest.med - first.med) / first.med * 100 : 0;

  // --- KPI 1: Median resale price vs prior equivalent period ---
  // Use the type-filtered full timeline so it respects flat type selection
  const prevPeriodData = (() => {
    const fullTL = getTrendsNatTL().filter(d => d.med != null);
    if (!fullTL.length || periodLen < 2) return null;
    const startIdx = fullTL.findIndex(d => d.m === first.m);
    if (startIdx < periodLen) return null;
    const prevSlice = fullTL.slice(startIdx - periodLen, startIdx);
    const prices = prevSlice.map(d => d.med).sort((a, b) => a - b);
    const prevMedian = prices[Math.floor(prices.length / 2)];
    const prevFirst = prevSlice[0], prevLast = prevSlice[prevSlice.length - 1];
    return { median: prevMedian, from: prevFirst?.m, to: prevLast?.m };
  })();
  const vsEqPeriodChg = prevPeriodData
    ? (periodMedianNat - prevPeriodData.median) / prevPeriodData.median * 100
    : null;
  const prevPeriodTooltip = prevPeriodData
    ? `Period median ${fmtKs(periodMedianNat)} vs prior ${periodLabel} median ${fmtKs(prevPeriodData.median)} (${fmtMonth(prevPeriodData.from)}–${fmtMonth(prevPeriodData.to)})`
    : "Insufficient history for prior period comparison";

  // --- KPI 2: Price momentum tag ---
  const momentumTag = (() => {
    if (Math.abs(periodChg) < 1)   return { label: "Stable",  color: "var(--ink-3)" };
    if (periodChg >= 5)             return { label: "Heating", color: "var(--red)" };
    if (periodChg >= 1)             return { label: "Rising",  color: "var(--green)" };
    if (periodChg <= -5)            return { label: "Cooling", color: "var(--accent)" };
    return                                 { label: "Easing",  color: "var(--amber)" };
  })();
  const momentumArrow = periodChg >= 0 ? "↑" : "↓";
  const momentumDir   = periodChg >= 0 ? "up" : "down";

  // --- KPI 3: Transactions + YoY volume comparison ---
  // Compare total vol in current period vs same-length window 12 months earlier
  // Use the type-filtered full timeline so it respects flat type selection
  const yoyVolChg = (() => {
    const fullTL = getTrendsNatTL().filter(d => d.vol != null);
    if (!fullTL.length || periodLen < 2) return null;
    const startIdx = fullTL.findIndex(d => d.m === first.m);
    if (startIdx < 12) return null;
    const shiftStart = Math.max(0, startIdx - 12);
    const shiftEnd   = shiftStart + periodLen;
    if (shiftEnd > fullTL.length) return null;
    const prevVolSlice = fullTL.slice(shiftStart, shiftEnd);
    const prevTotal = prevVolSlice.reduce((s, d) => s + (d.vol || 0), 0);
    return prevTotal > 0 ? (totalVol - prevTotal) / prevTotal * 100 : null;
  })();

  // --- KPI 4: Median $/sqm — computed from national_type_timelines + standard floor areas ---
  // This is period-aware (uses the sliced window months) and flat-type-aware
  const periodMonthSet = new Set(validNat.map(d => d.m));
  const computePpsqm = (monthSet) => {
    const ntt = DB.national_type_timelines || {};
    const typesToUse = ft === "ALL" ? Object.keys(HDB_FLOOR_AREA) : [ft];
    let totalW = 0, weightedSum = 0;
    for (const type of typesToUse) {
      const area = HDB_FLOOR_AREA[type];
      if (!area) continue;
      const entries = (ntt[type] || []).filter(d => monthSet.has(d.m) && d.med != null && d.vol > 0);
      for (const d of entries) {
        const ppsqm = d.med * 1000 / area;
        weightedSum += ppsqm * d.vol;
        totalW += d.vol;
      }
    }
    return totalW > 0 ? Math.round(weightedSum / totalW) : null;
  };
  const natPpsqm = computePpsqm(periodMonthSet);
  // Prior period ppsqm: same calculation on the prior equivalent window
  const prevPpsqm = (() => {
    if (!prevPeriodData) return null;
    const fullTL = getTrendsNatTL().filter(d => d.med != null);
    const startIdx = fullTL.findIndex(d => d.m === first.m);
    if (startIdx < periodLen) return null;
    const prevSlice = fullTL.slice(startIdx - periodLen, startIdx);
    const prevMonthSet = new Set(prevSlice.map(d => d.m));
    return computePpsqm(prevMonthSet);
  })();
  const ppsqmChg = (natPpsqm != null && prevPpsqm != null)
    ? (natPpsqm - prevPpsqm) / prevPpsqm * 100
    : null;

  const movers = buildTownMovers();
  const topUp      = [...movers].sort((a,b) => b.dpct - a.dpct).slice(0, 5);
  const topDown    = [...movers].sort((a,b) => a.dpct - b.dpct).slice(0, 5);
  const topActive  = [...movers].sort((a,b) => b.vol - a.vol).slice(0, 5);
  const topValue   = [...movers].filter(t => t.ppsqm > 0).sort((a,b) => a.ppsqm - b.ppsqm).slice(0, 5);

  const flatTypeOptions = ["ALL", ...DB.flat_types];

  // Town sort for bottom grid
  const sortMap = { median: (a,b) => b.median-a.median, cheap: (a,b) => a.median-b.median,
                    yoy: (a,b) => b.dpct-a.dpct, vol: (a,b) => b.vol-a.vol,
                    price: (a,b) => b.median-a.median, value: (a,b) => a.ppsqm-b.ppsqm };
  const gridSorted = [...movers].sort(sortMap[trendsState.sortBy] || sortMap.median);

  // Update head
  const trendsView = document.querySelector('[data-view="trends"]');
  let headEl = trendsView?.querySelector(".trends-head");
  if (headEl) {
    headEl.innerHTML = `<div style="display:flex;align-items:baseline;gap:14px">
      <h2 class="compare-head-title">Trends</h2>
      <span class="compare-head-sub">National market, ${fmtMonth(first.m)} — ${fmtMonth(latest.m)}</span>
    </div>`;
  }

  container.innerHTML = `<div class="trends-grid">

    <!-- KPI strip -->
    <div class="trends-kpis">

      <!-- KPI 1: Median resale price -->
      <div class="td-card">
        <div class="kpi">
          <div class="kpi-label">Median resale price</div>
          <div class="kpi-value" style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap">
            ${fmtKs(periodMedianNat)}
            ${vsEqPeriodChg != null ? `<span class="kpi-delta-badge${vsEqPeriodChg >= 0 ? " up" : " down"}"
              title="${prevPeriodTooltip}"
              style="cursor:help">
              ${vsEqPeriodChg >= 0 ? "▲" : "▼"} ${Math.abs(vsEqPeriodChg).toFixed(1)}% vs prior ${periodLabel === "All-time" ? "period" : periodLabel}
            </span>` : ""}
          </div>
          <div class="kpi-sub">Period median · ${fmtMonth(first.m)}–${fmtMonth(latest.m)}</div>
        </div>
      </div>

      <!-- KPI 2: Price momentum -->
      <div class="td-card">
        <div class="kpi">
          <div class="kpi-label">Price momentum</div>
          <div class="kpi-value" style="display:flex;align-items:baseline;gap:8px">
            <span style="color:${periodChg >= 0 ? "var(--green)" : "var(--red)"}">${momentumArrow} ${Math.abs(periodChg).toFixed(1)}%</span>
            <span class="kpi-momentum-tag" style="color:${momentumTag.color};border-color:${momentumTag.color}">${momentumTag.label}</span>
          </div>
          <div class="kpi-sub">Prices ${momentumDir} ${Math.abs(periodChg).toFixed(1)}% · ${fmtMonth(first.m)} → ${fmtMonth(latest.m)}</div>
        </div>
      </div>

      <!-- KPI 3: Transactions -->
      <div class="td-card">
        <div class="kpi">
          <div class="kpi-label">Transactions</div>
          <div class="kpi-value">${totalVol.toLocaleString()}</div>
          <div class="kpi-sub">
            ${yoyVolChg != null
              ? `<span class="${yoyVolChg >= 0 ? "kpi-delta-badge up" : "kpi-delta-badge down"}" style="font-size:10px">${yoyVolChg >= 0 ? "▲" : "▼"} ${Math.abs(yoyVolChg).toFixed(1)}%</span> vs same period last year`
              : `${periodLabel} total`}
          </div>
        </div>
      </div>

      <!-- KPI 4: Median $/sqm -->
      <div class="td-card">
        <div class="kpi">
          <div class="kpi-label">Median $/sqm</div>
          <div class="kpi-value" style="display:flex;align-items:baseline;gap:8px">
            ${natPpsqm != null ? `$${natPpsqm.toLocaleString()}` : "—"}
            ${ppsqmChg != null ? `<span class="kpi-delta-badge${ppsqmChg >= 0 ? " up" : " down"}">${ppsqmChg >= 0 ? "▲" : "▼"} ${Math.abs(ppsqmChg).toFixed(1)}%</span>` : ""}
          </div>
          <div class="kpi-sub">Volume-weighted · vs prior ${periodLabel === "All-time" ? "period" : periodLabel}</div>
        </div>
      </div>

    </div>

    <!-- Combo chart (7 cols) + Where prices moved most (5 cols) side by side -->
    <div class="trends-chart-card span-9">
      <div class="trends-chart-header">
        <div>
          <div class="trends-chart-title">National Median Price &amp; Transaction Volume</div>
          <div class="trends-chart-sub">Line = price (left axis) · bars = volume (right axis) · hover to inspect</div>
        </div>
        <div class="trends-controls">
          <div class="trends-period-btns">
            ${["1Y","3Y","5Y","All"].map(p =>
              `<button class="trends-period-btn${trendsState.period===p.toLowerCase()||trendsState.period===p?' active':''}" onclick="setTrendsPeriod('${p}')">${p}</button>`
            ).join("")}
          </div>
          <div class="trends-type-btns" id="trendsTypeBtns">
            ${(() => {
              const RARE = new Set(["1 ROOM", "MULTI-GENERATION"]);
              const common = flatTypeOptions.filter(ft => !RARE.has(ft));
              const rare   = flatTypeOptions.filter(ft => RARE.has(ft));
              const rareActive = rare.some(ft => trendsState.flatType === ft);
              const expanded = rareActive || trendsState._typeExpanded;
              const label = ft => ft === "ALL" ? "All types" : ft.replace(" ROOM","Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen");
              return common.map(ft =>
                `<button class="trends-type-btn${trendsState.flatType===ft?' active':''}" onclick="setTrendsType('${ft}')">${label(ft)}</button>`
              ).join("") + (expanded
                ? rare.map(ft =>
                    `<button class="trends-type-btn${trendsState.flatType===ft?' active':''}" onclick="setTrendsType('${ft}')">${label(ft)}</button>`
                  ).join("") + `<button class="trends-type-btn trends-type-more" onclick="trendsState._typeExpanded=false;renderTrends()">− Less</button>`
                : `<button class="trends-type-btn trends-type-more" onclick="trendsState._typeExpanded=true;renderTrends()">+ More</button>`
              );
            })()}
          </div>
        </div>
      </div>
      <div class="trends-chart-wrap" id="trendsChartWrap">${buildComboChart(800, periodMedianNat)}</div>
      <div class="trends-overlay-section">
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:7px">
          <div class="trends-overlay-label" style="margin:0">Overlay towns</div>
          ${trendsState.overlayTowns.size > 0 ? `<div class="trends-overlay-legend">
            <div class="trends-overlay-legend-item"><div class="trends-overlay-swatch" style="background:var(--accent)"></div><span style="color:var(--ink-3)">National</span></div>
            ${[...trendsState.overlayTowns].map((id,i) => `
            <div class="trends-overlay-legend-item" style="color:${OVERLAY_COLORS[i%OVERLAY_COLORS.length]}">
              <div class="trends-overlay-swatch" style="background:${OVERLAY_COLORS[i%OVERLAY_COLORS.length]}"></div>
              ${DB.town_summaries[id]?.name}
            </div>`).join("")}
          </div>` : ""}
        </div>
        <div class="trends-overlay-chips">
          ${DB.towns.map(id => {
            const s = DB.town_summaries[id];
            const active = trendsState.overlayTowns.has(id);
            const c = active ? overlayColor(id) : "";
            return `<button class="trends-overlay-chip${active?' active':''}" onclick="toggleTrendOverlay('${id}')" style="${active?`--chip-color:${c}`:''}">
              ${s.name}
            </button>`;
          }).join("")}
        </div>
      </div>
    </div>

    <!-- Section 01: Where prices moved most (4 cols, alongside chart) -->
    <div class="trends-side-col" id="trendsSideCol">
      <div class="trends-section-header">
        <div class="trends-section-header-inner">
          <span class="trends-section-num">01</span>
          <span class="trends-section-title-txt">Where prices moved most</span>
        </div>
      </div>
      <div class="td-card">
        <div class="td-card-title">Biggest gains <span class="td-card-note">${periodLabel} price change</span></div>
        ${topUp.map((t,i) => `
          <div class="pulse-row" onclick="openTownDashboard('${t.id}')" style="cursor:pointer">
            <span class="pulse-row-rank">${i+1}</span>
            <span class="pulse-row-name">${t.name}</span>
            <span style="flex:1"></span>
            <span style="font-size:12px;color:var(--ink-3)">${fmtKs(t.median)}</span>
            <span class="pulse-row-pill up">${t.dpct >= 0 ? "+" : ""}${t.dpct.toFixed(1)}%</span>
          </div>`).join("")}
      </div>
      <div class="td-card">
        <div class="td-card-title">Biggest declines <span class="td-card-note">${periodLabel} price change</span></div>
        ${topDown.map((t,i) => `
          <div class="pulse-row" onclick="openTownDashboard('${t.id}')" style="cursor:pointer">
            <span class="pulse-row-rank">${i+1}</span>
            <span class="pulse-row-name">${t.name}</span>
            <span style="flex:1"></span>
            <span style="font-size:12px;color:var(--ink-3)">${fmtKs(t.median)}</span>
            <span class="pulse-row-pill ${t.dpct < 0 ? "down" : "up"}">${t.dpct >= 0 ? "+" : ""}${t.dpct.toFixed(1)}%</span>
          </div>`).join("")}
      </div>
      <div class="td-card">
        <div class="td-card-title">Most transactions <span class="td-card-note">${periodLabel} total</span></div>
        ${topActive.map((t,i) => `
          <div class="pulse-row" onclick="openTownDashboard('${t.id}')" style="cursor:pointer">
            <span class="pulse-row-rank">${i+1}</span>
            <span class="pulse-row-name">${t.name}</span>
            <span style="flex:1"></span>
            <span style="font-size:12px;font-weight:700;color:var(--ink)">${t.vol.toLocaleString()}</span>
          </div>`).join("")}
      </div>
      <div class="td-card">
        <div class="td-card-title">Best value <span class="td-card-note">Lowest $/sqm</span></div>
        ${topValue.map((t,i) => `
          <div class="pulse-row" onclick="openTownDashboard('${t.id}')" style="cursor:pointer">
            <span class="pulse-row-rank">${i+1}</span>
            <span class="pulse-row-name">${t.name}</span>
            <span style="flex:1"></span>
            <span style="font-size:12px;font-weight:700;color:var(--ink)">$${t.ppsqm.toLocaleString()}</span>
            <span style="font-size:10px;color:var(--ink-3)">/sqm</span>
          </div>`).join("")}
      </div>
    </div>

    <!-- Section 2: All towns -->
    <div class="trends-section-header">
      <div class="trends-section-header-inner">
        <span class="trends-section-num">02</span>
        <span class="trends-section-title-txt">All towns</span>
      </div>
      <div style="display:flex;gap:4px;flex-wrap:wrap">
        ${[["median","Most expensive"],["cheap","Cheapest"],["yoy","Biggest movers"],["vol","Most active"],["value","Best value $/sqm"]].map(([k,lbl]) =>
          `<button class="chip${trendsState.sortBy===k?" active":""}" onclick="setTownGridSort('${k}')">${lbl}</button>`
        ).join("")}
      </div>
    </div>

    <!-- Town grid -->
    <div class="span-12">
      <div class="trends-town-grid" id="trendsTownGrid">
        ${buildTownGrid(gridSorted)}
      </div>
    </div>

  </div>`;

  // Re-render chart at actual size then attach observer
  requestAnimationFrame(() => {
    syncChartHeight();
    attachChartListeners();
    attachChartResizeObserver();
  });
}

function buildTownGrid(sorted) {
  return sorted.map(t => {
    const tl = getFilteredTownTL(t.id);
    const sp = sparklineSVG(tl, { w: 140, h: 38, color: t.dpct >= 0 ? "var(--accent)" : "var(--red)", fill: true });
    return `<div class="trends-town-card" onclick="openTownDashboard('${t.id}')">
      <div class="trends-town-card-header">
        <span class="trends-town-card-name">${t.name}</span>
        ${deltaPill(t.dpct)}
      </div>
      ${sp}
      <div class="trends-town-card-meta">
        <span class="trends-town-card-price">${fmtKs(t.median)}</span>
        <span class="trends-town-card-ppsqm">$${t.ppsqm?.toLocaleString()}/m²</span>
      </div>
      <div class="trends-town-card-region">${t.region}</div>
    </div>`;
  }).join("");
}

function getFilteredNatTL() {
  const tl = getTrendsNatTL();
  const p  = trendsState.period;
  if (p === "1y") return tl.slice(-12);
  if (p === "3y") return tl.slice(-36);
  if (p === "5y") return tl.slice(-60);
  return tl;
}

function buildComboChart(W = 800, refMedian = null, H = null) {
  const tl    = getFilteredNatTL();
  const valid = tl.filter(d => d.med != null || d.vol != null);
  if (valid.length < 2) return "";

  if (H == null) H = Math.round(W * (280 / 800));
  // right pad scales: vol-axis ticks (30px) + gap + town label — shrinks on narrow screens
  const pad = { t: 14, b: 30, l: 56, r: Math.min(100, Math.round(W * 0.13)) };

  // ── Collect overlay town data (for Y-range expansion) ──
  const overlayTownArr = [...trendsState.overlayTowns];
  const overlayData = overlayTownArr.map(id => {
    const full   = getTrendsTownTL(id);
    const offset = getTrendsNatTL().length - tl.length;
    return full.slice(offset).filter(d => d.med != null);
  });

  // ── Price scale (left axis) ──
  const pricePoints = valid.filter(d => d.med != null);
  const overlayVals = overlayData.flatMap(v2 => v2.map(d => d.med));
  const allPriceVals = [...pricePoints.map(d => d.med), ...overlayVals];
  const minP = Math.min(...allPriceVals) * 0.97;
  const maxP = Math.max(...allPriceVals) * 1.02;

  // ── Volume scale (right axis) ──
  const volPoints = valid.filter(d => d.vol != null);
  const maxVol = Math.max(...volPoints.map(d => d.vol));

  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;

  const px = i  => pad.l + (i / (valid.length - 1)) * chartW;
  const py = v  => pad.t + (1 - (v - minP) / (maxP - minP)) * chartH;
  const barW = Math.max(1, chartW / valid.length - 1);

  // ── Volume bars (background layer) ──
  const bars = valid.map((d, i) => {
    if (d.vol == null) return "";
    const bh = (d.vol / maxVol) * chartH;
    const bx = pad.l + i * (chartW / valid.length);
    const by = pad.t + chartH - bh;
    return `<rect class="combo-bar" x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="var(--accent)" opacity="0.18" rx="1" data-idx="${i}"/>`;
  }).join("");

  // ── Price line ──
  const pts = pricePoints.map((d) => {
    const i = valid.indexOf(d);
    return [px(i), py(d.med)];
  });

  let path = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i-1][0] + pts[i][0]) / 2;
    path += ` C${cp1x.toFixed(1)},${pts[i-1][1].toFixed(1)} ${cp1x.toFixed(1)},${pts[i][1].toFixed(1)} ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
  }
  const area = `${path} L${pts[pts.length-1][0]},${H-pad.b} L${pts[0][0]},${H-pad.b} Z`;

  // ── Left Y-axis (price) ──
  const yTicksHTML = Array.from({length: 5}, (_, i) => {
    const v = minP + (maxP - minP) * (i / 4);
    const y = py(v);
    return `<line x1="${pad.l-4}" y1="${y.toFixed(1)}" x2="${W-pad.r}" y2="${y.toFixed(1)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
            <text x="${pad.l-8}" y="${(y+4).toFixed(1)}" font-size="10" fill="var(--ink-3)" text-anchor="end" font-family="Inter,sans-serif">$${Math.round(v)}k</text>`;
  }).join("");

  // ── Right Y-axis (volume) — 3 ticks, placed just right of chart area ──
  const chartRight = W - pad.r; // right edge of the plot area
  const volTicksHTML = Array.from({length: 3}, (_, i) => {
    const v = maxVol * (i + 1) / 3;
    const y = pad.t + chartH - (v / maxVol) * chartH;
    return `<text x="${chartRight + 6}" y="${(y+4).toFixed(1)}" font-size="9" fill="var(--ink-3)" text-anchor="start" font-family="Inter,sans-serif">${(v/1000).toFixed(1)}k</text>`;
  }).join("");

  // ── X-axis labels ──
  const seenYears = new Set();
  const xLabels = valid.map((d, i) => {
    if (i % 12 !== 0 && i !== valid.length - 1) return "";
    const yr = d.m.slice(0, 4);
    if (seenYears.has(yr)) return "";
    seenYears.add(yr);
    return `<text x="${px(i).toFixed(1)}" y="${H}" font-size="10" fill="var(--ink-3)" text-anchor="middle" font-family="Inter,sans-serif">${yr}</text>`;
  }).join("");

  // ── Right-axis label ──
  const volAxisLbl = `<text x="${chartRight+6}" y="${pad.t-4}" font-size="9" fill="var(--ink-3)" font-family="Inter,sans-serif">vol</text>`;

  // ── Town overlay lines ──
  // First pass: collect paths + endpoint positions
  const LINE_H = 12; // min vertical gap between labels (px in viewBox units)
  const overlayEntries = overlayTownArr.map((id, oi) => {
    const v2 = overlayData[oi];
    if (v2.length < 2) return null;
    const c = OVERLAY_COLORS[oi % OVERLAY_COLORS.length];
    const idxMap = v2.map(d => {
      const nat = valid.find(n => n.m === d.m);
      return nat ? valid.indexOf(nat) : -1;
    }).filter(idx => idx >= 0);
    if (idxMap.length < 2) return null;
    const filtV2 = v2.filter((_, j) => idxMap[j] >= 0);
    let lp = `M${px(idxMap[0]).toFixed(1)},${py(filtV2[0].med).toFixed(1)}`;
    for (let i = 1; i < idxMap.length; i++) {
      const cp1x = (px(idxMap[i-1]) + px(idxMap[i])) / 2;
      lp += ` C${cp1x.toFixed(1)},${py(filtV2[i-1].med).toFixed(1)} ${cp1x.toFixed(1)},${py(filtV2[i].med).toFixed(1)} ${px(idxMap[i]).toFixed(1)},${py(filtV2[i].med).toFixed(1)}`;
    }
    const lastX = px(idxMap[idxMap.length-1]);
    const dotY  = py(filtV2[filtV2.length-1].med);
    const lbl   = DB.town_summaries[id]?.name || id;
    return { lp, c, lastX, dotY, lblY: dotY, lbl };
  }).filter(Boolean);

  // Second pass: spread labels so none are closer than LINE_H px
  // Sort by dotY, nudge upward/downward to resolve collisions
  overlayEntries.sort((a, b) => a.dotY - b.dotY);
  for (let i = 1; i < overlayEntries.length; i++) {
    const prev = overlayEntries[i - 1];
    const cur  = overlayEntries[i];
    if (cur.lblY - prev.lblY < LINE_H) cur.lblY = prev.lblY + LINE_H;
  }
  // Clamp so labels don't go below chart bottom
  for (let i = overlayEntries.length - 1; i >= 0; i--) {
    if (overlayEntries[i].lblY > H - pad.b - 2) overlayEntries[i].lblY = H - pad.b - 2;
  }
  // Second sweep upward in case bottom clamping caused new collisions
  for (let i = overlayEntries.length - 2; i >= 0; i--) {
    const next = overlayEntries[i + 1];
    const cur  = overlayEntries[i];
    if (next.lblY - cur.lblY < LINE_H) cur.lblY = next.lblY - LINE_H;
  }

  // Third pass: render
  const overlayLines = overlayEntries.map(({ lp, c, lastX, dotY, lblY, lbl }) => {
    const labelX = chartRight + 8;
    // Leader line from dot to label when they're offset
    const leaderY1 = dotY, leaderY2 = lblY + 1; // +1 to align with text baseline offset
    const leader = Math.abs(leaderY2 - leaderY1) > 3
      ? `<line x1="${lastX.toFixed(1)}" y1="${leaderY1.toFixed(1)}" x2="${labelX.toFixed(1)}" y2="${leaderY2.toFixed(1)}" stroke="${c}" stroke-width="1" opacity="0.4" stroke-dasharray="2 2"/>`
      : "";
    return `<path d="${lp}" fill="none" stroke="${c}" stroke-width="2" opacity="0.85"/>
            <circle cx="${lastX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="3.5" fill="${c}" stroke="var(--bg)" stroke-width="1.5"/>
            ${leader}
            <text x="${labelX.toFixed(1)}" y="${(lblY + 4).toFixed(1)}" font-size="9" fill="${c}" font-family="Inter,sans-serif" font-weight="700">${lbl}</text>`;
  }).join("");

  // ── Axis labels ──
  const leftAxisLbl = `<text x="10" y="${(H/2).toFixed(1)}" font-size="9" fill="var(--ink-3)" font-family="Inter,sans-serif" text-anchor="middle" transform="rotate(-90,10,${(H/2).toFixed(1)})">Median $k</text>`;

  return `<svg id="trendsChart" width="100%" height="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
      style="display:block;cursor:crosshair;overflow:visible"
      data-min="${minP.toFixed(2)}" data-max="${maxP.toFixed(2)}"
      data-maxvol="${maxVol}"
      data-padl="${pad.l}" data-padr="${pad.r}" data-padt="${pad.t}" data-padb="${pad.b}"
      data-w="${W}" data-h="${H}" data-len="${valid.length}">
    <defs>
      <linearGradient id="natGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${bars}
    ${yTicksHTML}
    ${volTicksHTML}
    ${volAxisLbl}
    ${leftAxisLbl}
    ${xLabels}
    <path d="${area}" fill="url(#natGrad)"/>
    <path id="natLine" d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${overlayLines}
    ${(() => {
      if (refMedian == null || refMedian < minP || refMedian > maxP) return "";
      const ry = py(refMedian).toFixed(1);
      return `<line x1="${pad.l}" y1="${ry}" x2="${W - pad.r}" y2="${ry}"
        stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-dasharray="4 3"/>
        <text x="${pad.l + 4}" y="${(Number(ry) - 3).toFixed(1)}" font-size="9" fill="rgba(255,255,255,0.5)"
          font-family="Inter,sans-serif">Now: ${fmtKs(refMedian)}</text>`;
    })()}
    <!-- Crosshair (hidden by default) -->
    <line id="chartCross" x1="0" y1="${pad.t}" x2="0" y2="${H-pad.b}" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3" visibility="hidden"/>
    <circle id="chartDot" cx="0" cy="0" r="4" fill="var(--accent)" stroke="var(--bg-1)" stroke-width="2" visibility="hidden"/>
    <rect id="chartTipBg" x="0" y="0" width="130" height="46" rx="6" fill="var(--surface)" stroke="var(--line-2)" stroke-width="1" visibility="hidden"/>
    <text id="chartTipVal" x="0" y="0" font-size="12" font-weight="700" fill="var(--ink)" font-family="Inter,sans-serif" visibility="hidden"></text>
    <text id="chartTipVol" x="0" y="0" font-size="10" fill="var(--ink-3)" font-family="Inter,sans-serif" visibility="hidden"></text>
    <text id="chartTipMon" x="0" y="0" font-size="10" fill="var(--ink-3)" font-family="Inter,sans-serif" visibility="hidden"></text>
  </svg>`;
}

let _chartResizeObs = null;

// Set the chart wrap height to match the side column, then render the SVG into it.
// Uses bounding rects to measure precisely how much vertical space in the card is
// consumed by padding + sibling elements (header, overlay section). No estimates.
// No feedback loop: side col height is driven by its 4 stacked cards, not the chart.
function syncChartHeight() {
  const wrap = document.getElementById("trendsChartWrap");
  const side = document.getElementById("trendsSideCol");
  if (!wrap || !side) return;

  const sideH = side.offsetHeight;
  const card  = wrap.closest(".trends-chart-card");

  let nonWrapH = 0;
  if (card) {
    const cs = getComputedStyle(card);
    nonWrapH += parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    // measure each sibling directly — avoids any hardcoded gap values
    for (const child of card.children) {
      if (child === wrap) continue;
      const r = child.getBoundingClientRect();
      const childCs = getComputedStyle(child);
      nonWrapH += r.height
        + parseFloat(childCs.marginTop || 0)
        + parseFloat(childCs.marginBottom || 0);
    }
  }

  const targetH = Math.max(sideH - nonWrapH, 120);
  wrap.style.height = targetH + "px";
  const w = wrap.clientWidth;
  if (w > 10) {
    wrap.innerHTML = buildComboChart(w, trendsState._refMedian, targetH);
    attachChartListeners();
  }
}

function attachChartResizeObserver() {
  const wrap = document.getElementById("trendsChartWrap");
  if (!wrap) return;
  if (_chartResizeObs) _chartResizeObs.disconnect();
  let lastW = 0;
  // Observe only the wrap, and only react to WIDTH changes.
  // Height is set by JS (syncChartHeight), so a height-only change means we caused it —
  // reacting to it would create a feedback loop. Width changes come from window resize.
  _chartResizeObs = new ResizeObserver(entries => {
    const w = Math.floor(entries[0].contentRect.width);
    if (w < 10 || w === lastW) return;
    lastW = w;
    syncChartHeight();
  });
  _chartResizeObs.observe(wrap);
  // Window resize also changes side column height (font/zoom changes etc.)
  // Handle via window resize event — this fires once per resize, not in a loop.
  if (!wrap._winResizeAttached) {
    wrap._winResizeAttached = true;
    window.addEventListener("resize", () => syncChartHeight());
  }
}

function attachChartListeners() {
  const svg = document.getElementById("trendsChart");
  if (!svg) return;
  const valid = getFilteredNatTL().filter(d => d.med != null || d.vol != null);

  svg.addEventListener("mousemove", e => {
    const rect   = svg.getBoundingClientRect();
    const svgW   = +svg.dataset.w, svgH = +svg.dataset.h;
    const padL   = +svg.dataset.padl, padR = +svg.dataset.padr;
    const padT   = +svg.dataset.padt, padB = +svg.dataset.padb;
    const minV   = +svg.dataset.min,  maxV = +svg.dataset.max;
    const maxVol = +svg.dataset.maxvol;
    const scaleX = svgW / rect.width;
    const mx     = (e.clientX - rect.left) * scaleX;
    const chartW = svgW - padL - padR;
    const chartH = svgH - padT - padB;
    const idx    = Math.max(0, Math.min(valid.length - 1, Math.round((mx - padL) / chartW * (valid.length - 1))));
    const d      = valid[idx];
    if (!d) return;

    const cx = padL + (idx / (valid.length - 1)) * chartW;
    const hasMed = d.med != null;
    const cy = hasMed ? padT + (1 - (d.med - minV) / (maxV - minV)) * chartH : padT + chartH / 2;

    const cross = svg.getElementById("chartCross");
    cross.setAttribute("x1", cx); cross.setAttribute("x2", cx); cross.setAttribute("visibility", "visible");

    const dot = svg.getElementById("chartDot");
    dot.setAttribute("cx", cx); dot.setAttribute("cy", cy);
    dot.setAttribute("visibility", hasMed ? "visible" : "hidden");

    const tipX = Math.min(cx + 8, svgW - 136);
    const tipY = Math.max(padT, cy - 54);

    const bg = svg.getElementById("chartTipBg");
    bg.setAttribute("x", tipX); bg.setAttribute("y", tipY); bg.setAttribute("visibility", "visible");

    const tv = svg.getElementById("chartTipVal");
    tv.setAttribute("x", tipX + 10); tv.setAttribute("y", tipY + 15); tv.setAttribute("visibility", "visible");
    tv.textContent = hasMed ? `$${d.med}k` : "–";

    const tvol = svg.getElementById("chartTipVol");
    tvol.setAttribute("x", tipX + 10); tvol.setAttribute("y", tipY + 29); tvol.setAttribute("visibility", "visible");
    tvol.textContent = d.vol != null ? `${d.vol.toLocaleString()} txns` : "";

    const tm = svg.getElementById("chartTipMon");
    tm.setAttribute("x", tipX + 10); tm.setAttribute("y", tipY + 42); tm.setAttribute("visibility", "visible");
    tm.textContent = fmtMonth(d.m);
  });

  svg.addEventListener("mouseleave", () => {
    ["chartCross","chartDot","chartTipBg","chartTipVal","chartTipVol","chartTipMon"].forEach(id => {
      svg.getElementById(id)?.setAttribute("visibility","hidden");
    });
  });
}

window.setTownPeriod = (p) => {
  townDashState.period = p.toLowerCase();
  if (townDashState.townId) renderTownDashboard(townDashState.townId);
};

window.setTrendsPeriod = (p) => {
  trendsState.period = p.toLowerCase();
  renderTrends();
};

window.setTrendsType = (ft) => {
  trendsState.flatType = ft;
  renderTrends();
};

window.toggleTrendOverlay = (id) => {
  if (trendsState.overlayTowns.has(id)) trendsState.overlayTowns.delete(id);
  else if (trendsState.overlayTowns.size < 5) trendsState.overlayTowns.add(id);
  renderTrends();
};

window.setTownGridSort = (key) => {
  trendsState.sortBy = key;
  const movers = buildTownMovers();
  const sortMap = { median: (a,b) => b.median-a.median, cheap: (a,b) => a.median-b.median,
                    yoy: (a,b) => b.dpct-a.dpct, vol: (a,b) => b.vol-a.vol,
                    price: (a,b) => b.median-a.median, value: (a,b) => a.ppsqm-b.ppsqm };
  const sorted = [...movers].sort(sortMap[key] || sortMap.median);
  const grid = document.getElementById("trendsTownGrid");
  if (grid) grid.innerHTML = buildTownGrid(sorted);
  document.querySelectorAll(".chip").forEach(btn => {
    const onclick = btn.getAttribute("onclick") || "";
    btn.classList.toggle("active", onclick.includes(`'${key}'`));
  });
};

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL EVENT WIRING
   ══════════════════════════════════════════════════════════════════════════ */
window.toggleType             = toggleType;
window.openTownDrawer         = openTownDrawer;
window.closeTownDrawer        = closeTownDrawer;
window.openTownDashboard      = openTownDashboard;
window.openTownPicker         = openTownPicker;
window.closeTownPicker        = closeTownPicker;
window.selectCompareTown      = selectCompareTown;
window.removeCompareSlot      = removeCompareSlot;
window.setCompareMode         = setCompareMode;
window.openComparePicker      = openComparePicker;
window.resetFilters           = window.clearFilters;
window.updateShortlistUI      = updateShortlistUI;
window.renderPulsePanel       = renderPulsePanel;
window._shortlist             = _shortlist;

document.addEventListener("DOMContentLoaded", () => {
  // Nav tabs
  document.querySelectorAll(".topnav-tab").forEach(tab => {
    tab.addEventListener("click", () => showView(tab.dataset.view));
  });

  // On mobile, start with sidebar hidden so map is visible
  if (window.innerWidth <= 768) {
    state.sidebarOpen = false;
    const sidebar = document.getElementById("filterSidebar");
    if (sidebar) sidebar.classList.add("hidden");
    document.getElementById("mapLegend").classList.add("no-rail");
    document.getElementById("sidebarOpenBtn").style.display = "flex";
    // Hide pulse panel on mobile by default
    const pulse = document.getElementById("pulsePanel");
    const pulseBtn = document.getElementById("pulseOpenBtn");
    if (pulse) pulse.classList.add("hidden");
    if (pulseBtn) pulseBtn.style.display = "none"; // hide on mobile entirely
  }

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      state.sidebarOpen = false;
      const sidebar = document.getElementById("filterSidebar");
      if (sidebar) sidebar.classList.add("hidden");
      document.getElementById("mapLegend").classList.add("no-rail");
      document.getElementById("sidebarOpenBtn").style.display = "flex";
    });
  }
  const sidebarOpenBtn = document.getElementById("sidebarOpenBtn");
  if (sidebarOpenBtn) {
    sidebarOpenBtn.addEventListener("click", () => {
      state.sidebarOpen = true;
      const sidebar = document.getElementById("filterSidebar");
      if (sidebar) sidebar.classList.remove("hidden");
      document.getElementById("mapLegend").classList.remove("no-rail");
      sidebarOpenBtn.style.display = "none";
    });
  }

  // Light/dark map style toggle
  document.getElementById("mapStyleBtn")?.addEventListener("click", () => {
    const btn = document.getElementById("mapStyleBtn");
    const isLight = btn.classList.toggle("active");
    const tileUrl = isLight
      ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    btn.childNodes[1].textContent = isLight ? " Dark" : " Light";
    if (state.tileLayer) MAP.removeLayer(state.tileLayer);
    state.tileLayer = L.tileLayer(tileUrl, { maxZoom: 19, subdomains: "abcd" });
    state.tileLayer.addTo(MAP);
    state.tileLayer.bringToBack();
  });

  // Modal search
  document.getElementById("modalSearch").addEventListener("input", e => {
    renderModalList(e.target.value);
  });
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === e.currentTarget) closeTownPicker();
  });

  // Price sliders
  document.getElementById("priceRangeMin").addEventListener("input", e => window.onPriceMinChange(e.target.value));
  document.getElementById("priceRangeMax").addEventListener("input", e => window.onPriceMaxChange(e.target.value));

  // Lease year sliders
  document.getElementById("leaseRangeMin").addEventListener("input", e => window.onLeaseMinChange(e.target.value));
  document.getElementById("leaseRangeMax").addEventListener("input", e => window.onLeaseMaxChange(e.target.value));

  // Back button in town view
  document.getElementById("townBackBtn").addEventListener("click", () => showView("map"));

  boot();
});
