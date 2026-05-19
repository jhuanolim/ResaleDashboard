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
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;overflow:visible">
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
    minTxnYear: 2017,
    maxTxnYear: 2026,
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
  initMap();
  renderDataBadge();

  bar.style.width = "100%";
  setTimeout(() => { loading.classList.add("hidden"); }, 400);
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

  // Flat types — all selected by default (empty = all, so just mark chips active visually)
  const typeContainer = document.getElementById("filterTypes");
  typeContainer.innerHTML = DB.flat_types.map(ft =>
    `<button class="filter-chip active" data-type="${ft}" onclick="toggleType('${ft}')">${ft.replace(" ROOM","R").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</button>`
  ).join("");

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
  // Update chip visuals
  document.querySelectorAll("[data-type]").forEach(el => {
    el.classList.toggle("active", state.filters.types.length === 0 || state.filters.types.includes(el.dataset.type));
  });
  updateMapMarkers();
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
  document.querySelectorAll(".filter-chip").forEach(el => el.classList.add("active"));
  const leaseYears = DB.lease_years || [];
  if (leaseYears.length) {
    state.filters.minLease = leaseYears[0];
    state.filters.maxLease = leaseYears[leaseYears.length - 1];
    document.getElementById("leaseRangeMin").value = state.filters.minLease;
    document.getElementById("leaseRangeMax").value = state.filters.maxLease;
    updateLeaseRangeUI();
  }
  state.filters.minPrice = Math.round(DB.price_stats.p5 / 1000);
  state.filters.maxPrice = Math.round(DB.price_stats.p95 / 1000);
  document.getElementById("priceRangeMin").value = state.filters.minPrice;
  document.getElementById("priceRangeMax").value = state.filters.maxPrice;
  updatePriceRangeUI();
  const txnYears = DB.date_range ? [+DB.date_range[0].slice(0,4), +DB.date_range[1].slice(0,4)] : [2017, 2026];
  state.filters.minTxnYear = txnYears[0];
  state.filters.maxTxnYear = txnYears[1];
  document.getElementById("txnRangeMin").value = txnYears[0];
  document.getElementById("txnRangeMax").value = txnYears[1];
  updateTxnRangeUI();
  updateMapMarkers();
};

function townPassesFilter(summary) {
  if (state.filters.types.length > 0) {
    const hasType = state.filters.types.some(ft => summary.type_medians && summary.type_medians[ft]);
    if (!hasType) return false;
  }
  const med = summary.median;
  if (med < state.filters.minPrice || med > state.filters.maxPrice) return false;
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
function renderTownMarkers() {
  if (!DB || !MAP) return;
  Object.values(state.townMarkers).forEach(m => m.remove());
  state.townMarkers = {};

  DB.towns.forEach(townId => {
    const s = DB.town_summaries[townId];
    if (!s) return;

    const passes = townPassesFilter(s);
    const color  = tierColor(s.median);
    const icon   = L.divIcon({
      className: "town-marker",
      html: `<div class="town-marker-inner" style="padding:6px 10px;gap:6px;display:flex;align-items:center;${passes ? "" : "opacity:0.35"}">
        <span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0;"></span>
        <span class="town-marker-name">${s.name}</span>
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
    const inner  = m.getElement()?.querySelector(".town-marker-inner");
    if (inner) {
      inner.style.opacity = passes ? "1" : "0.3";
      const dot = inner.querySelector("span");
      if (dot) dot.style.background = color;
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
      const color = tierColor(b.med);
      const icon = L.divIcon({
        className: "",
        html: `<div class="block-marker-pin" style="width:32px;height:22px;background:${color};">
          <span class="block-marker-blk" style="font-size:9px">${b.block}</span>
          <span class="block-marker-med" style="font-size:8px">${fmtKs(b.med)}</span>
        </div>`,
        iconSize: [32, 22], iconAnchor: [16, 11],
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
      const color = tierColor(b.med);
      const icon = L.divIcon({
        className: "",
        html: `<div class="block-marker-pin" style="width:38px;height:28px;background:${color};">
          <span class="block-marker-blk">${b.block}</span>
          <span class="block-marker-med">${fmtKs(b.med)}</span>
        </div>`,
        iconSize: [38, 28], iconAnchor: [19, 14],
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
  const rows = Object.entries(block.types || {})
    .map(([ft, med]) => `<div class="bp-row"><span class="bp-type">${ft}</span><span class="bp-price">${fmtKs(med)}</span></div>`)
    .join("");
  const html = `<div>
    <div class="bp-header">
      <div class="bp-blk">Blk ${block.block}</div>
      <div class="bp-street">${block.street}</div>
    </div>
    <div class="bp-rows">
      <div class="bp-row"><span class="bp-type" style="color:var(--ink-3)">Flat type</span><span class="bp-price" style="color:var(--ink-3)">Median</span></div>
      ${rows || `<div class="bp-row"><span class="bp-type">All types</span><span class="bp-price">${fmtKs(block.med)}</span></div>`}
    </div>
  </div>`;
  L.popup({ className: "block-popup", closeButton: true, maxWidth: 260 })
    .setLatLng(latlng).setContent(html).openOn(MAP);
}

/* ── Town drawer ─────────────────────────────────────────────────────────── */
function openTownDrawer(townId) {
  state.activeTown = townId;
  state.drawerOpen = true;
  const s = DB.town_summaries[townId];
  if (!s) return;

  const drawer = document.getElementById("townDrawer");
  drawer.classList.add("open");

  // Zoom map to town
  MAP.flyTo(s.coords, 17, { duration: 1.2 });

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
  const tl = DB.town_timelines[townId] || [];
  const spark = sparklineSVG(tl.slice(-24), { w: 370, h: 60, color: "var(--accent)" });

  const typeBars = Object.entries(s.type_mix || {}).map(([ft, pct]) => {
    const med = s.type_medians?.[ft];
    return `<div class="type-bar-row">
      <span class="type-bar-label">${ft.replace(" ROOM","R").replace("EXECUTIVE","Exec")}</span>
      <div class="type-bar-track"><div class="type-bar-fill" style="width:${pct}%"></div></div>
      <span class="type-bar-pct">${pct}%</span>
      <span class="type-bar-med">${med ? fmtKs(med) : "—"}</span>
    </div>`;
  }).join("");

  document.getElementById("townDrawer").innerHTML = `
    <div class="town-drawer-hero">
      <div style="width:100%;height:100%;background:linear-gradient(135deg,var(--bg-2) 0%,var(--bg-3) 100%);">
        <div style="padding:20px 20px 0;display:flex;align-items:center;gap:10px;">
          <span class="tag region">${s.region}</span>
          ${deltaPill(s.dpct)}
        </div>
      </div>
      <div class="town-drawer-hero-overlay"></div>
      <div class="town-drawer-hero-content">
        <div>
          <div class="eyebrow" style="color:rgba(255,255,255,0.5);margin-bottom:4px">${s.region}</div>
          <div class="display sm" style="color:white">${s.name}</div>
        </div>
      </div>
      <button class="town-drawer-close" onclick="closeTownDrawer()">${Icons.close}</button>
    </div>
    <div class="town-drawer-body">
      <div class="drawer-stat-grid">
        <div class="drawer-stat">
          <div class="drawer-stat-label">Median</div>
          <div class="drawer-stat-value">${fmtKs(s.median)}</div>
          <div class="drawer-stat-sub">${deltaPill(s.dpct)}</div>
        </div>
        <div class="drawer-stat">
          <div class="drawer-stat-label">$/sqm</div>
          <div class="drawer-stat-value">$${s.ppsqm.toLocaleString()}</div>
          <div class="drawer-stat-sub" style="color:var(--ink-3);font-size:10px">per sqm</div>
        </div>
        <div class="drawer-stat">
          <div class="drawer-stat-label">Sales</div>
          <div class="drawer-stat-value">${s.vol}</div>
          <div class="drawer-stat-sub" style="color:var(--ink-3);font-size:10px">last 3 months</div>
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
    <button class="drawer-open-btn" onclick="openTownDashboard('${townId}')">
      Open full dashboard ${Icons.back.replace('stroke-linecap="round" stroke-linejoin="round">', 'stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(180deg)">')}
    </button>
  `;
}

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

function buildTypeTrendChart(townId) {
  const ttl = DB.town_type_timelines?.[townId] || {};
  const types = Object.keys(ttl).filter(ft => ttl[ft]?.length >= 2);
  if (!types.length) return "<div class='td-insuf'>No flat-type timeline data</div>";

  const W = 620, H = 220;
  const pad = { t: 16, b: 28, l: 48, r: 110 };
  const chartW = W - pad.l - pad.r;
  const chartH = H - pad.t - pad.b;

  // Unified month axis from town main timeline
  const allMonths = (DB.town_timelines[townId] || []).map(d => d.m);
  if (!allMonths.length) return "";

  // Y range across all types
  const allVals = types.flatMap(ft => ttl[ft].map(d => d.med).filter(Boolean));
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

  return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="display:block;overflow:visible">
    ${yTicks}${xLabels}${lines}
  </svg>`;
}


function renderTownDashboard(townId) {
  const s  = DB.town_summaries[townId];
  const tl = DB.town_timelines[townId] || [];
  const am = AMENITIES[townId] || { mrt: [], hawker: [], parks: [], schools: [] };
  if (!s) return;

  // Header title with region badge
  document.getElementById("townViewTitle").innerHTML =
    `${s.name} <span style="font-size:12px;font-weight:500;color:var(--ink-3);background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-pill);padding:3px 10px;vertical-align:middle;margin-left:8px">${s.region}</span>`;

  // Build spark SVG for trend card (uses full timeline)
  const sparkFull = sparklineSVG(tl, { w: 600, h: 160, color: "var(--accent)", fill: true, axis: true });

  // Flat type rows
  const maxTypeMed = Math.max(...Object.values(s.type_medians || {}), 1);
  const typeRows = Object.entries(s.type_medians || {}).map(([ft, med]) => {
    const pct = s.type_mix?.[ft] || 0;
    return `<div class="td-type-row">
      <span class="td-type-label">${ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</span>
      <div class="td-type-bar-wrap"><div class="td-type-bar" style="width:${(med/maxTypeMed*100).toFixed(1)}%"></div></div>
      <span class="td-type-pct">${pct}%</span>
      <span class="td-type-price">${fmtKs(med)}</span>
    </div>`;
  }).join("") || '<div style="font-size:12px;color:var(--ink-3)">No data</div>';

  // Price distribution SVG bar chart
  const dist   = s.price_dist || [];
  const dlbls  = s.dist_labels || [];
  const maxDist = Math.max(...dist, 1);
  const distBars = dist.map((v, i) => {
    const bh = Math.max(3, (v / maxDist) * 80);
    const hi = v === Math.max(...dist);
    return `<div class="td-dist-bar-col">
      <div class="td-dist-bar" style="height:${bh}px;background:${hi ? "var(--accent)" : "var(--surface-3)"}" title="${dlbls[i]}: ${v} txns"></div>
      <div class="td-dist-lbl">${(dlbls[i] || "").replace("$","").replace("k","")}</div>
    </div>`;
  }).join("");

  // Storey premium
  const storeyBands = [["low","Low\n01–06"],["mid","Mid\n07–12"],["high","High\n13+"]];
  const storeyMax   = Math.max(...storeyBands.map(([k]) => s.storey_meds?.[k] || 0), 1);
  const storeyBars  = storeyBands.map(([k, lbl]) => {
    const v = s.storey_meds?.[k];
    if (!v) return "";
    const premium = storeyBands.find(([kb]) => kb === "low") && s.storey_meds?.low
      ? ((v - s.storey_meds.low) / s.storey_meds.low * 100) : 0;
    return `<div class="td-storey-row">
      <span class="td-storey-lbl">${lbl.replace("\n"," ")}</span>
      <div class="td-type-bar-wrap"><div class="td-type-bar" style="width:${(v/storeyMax*100).toFixed(1)}%;background:var(--accent)"></div></div>
      <span class="td-type-price">${fmtKs(v)}</span>
      ${k !== "low" && premium ? `<span class="td-storey-prem">+${premium.toFixed(1)}%</span>` : '<span></span>'}
    </div>`;
  }).join("");

  // ── Amenity lists: split primary schools ──
  const primarySchools = (am.schools || []).filter(sch => /primary/i.test(sch));
  const otherSchools   = (am.schools || []).filter(sch => !/primary/i.test(sch));

  const amenityGroups = [
    { icon: Icons.mrt,    label: "MRT Stations",   color: "var(--accent)", items: am.mrt },
    { icon: Icons.hawker, label: "Hawker Centres", color: "#fb923c",       items: am.hawker },
    { icon: Icons.park,   label: "Parks & Nature", color: "var(--green)",  items: am.parks },
  ].map(({ icon, label, color, items }) => `
    <div class="td-amenity-group">
      <div class="td-amenity-head" style="color:${color}">${icon} <span>${label}</span> <span class="td-amenity-count">${items.length}</span></div>
      <div class="td-amenity-list">
        ${items.map(it => `<div class="td-amenity-item">› ${it}</div>`).join("") || '<div class="td-amenity-item" style="color:var(--ink-3)">No data</div>'}
      </div>
    </div>`).join("");

  const primarySchoolHtml = primarySchools.length ? `
    <div class="td-amenity-group">
      <div class="td-amenity-head" style="color:#a78bfa">${Icons.school} <span>Primary Schools</span> <span class="td-amenity-count">${primarySchools.length}</span></div>
      <div class="td-amenity-badge-note">Within 1km priority zone (P1 ballot)</div>
      <div class="td-amenity-list">
        ${primarySchools.map(it => `<div class="td-amenity-item">› ${it}</div>`).join("")}
      </div>
    </div>` : "";

  const otherSchoolHtml = otherSchools.length ? `
    <div class="td-amenity-group">
      <div class="td-amenity-head" style="color:#a78bfa">${Icons.school} <span>Secondary &amp; Tertiary</span> <span class="td-amenity-count">${otherSchools.length}</span></div>
      <div class="td-amenity-list">
        ${otherSchools.map(it => `<div class="td-amenity-item">› ${it}</div>`).join("") || '<div class="td-amenity-item" style="color:var(--ink-3)">No data</div>'}
      </div>
    </div>` : "";

  // ── Transaction velocity ──
  const vol3m = s.vol || 0;
  const avg12m = s.avg_monthly_12m || 0;
  const velocity = s.velocity || "below";
  const velPct = avg12m > 0 ? Math.round((vol3m / 3 - avg12m) / avg12m * 100) : 0;
  const velColor = velocity === "above" ? "var(--green)" : "var(--ink-3)";
  const velLabel = velocity === "above"
    ? `Above avg ${velPct > 0 ? `+${velPct}%` : ""}`
    : `Below avg ${velPct < 0 ? `${velPct}%` : ""}`;

  // ── Market Snapshot auto-summary ──
  const natTLLast = (DB.national_timeline || []).filter(d => d.med != null).at(-1);
  const natMed  = natTLLast?.med || 0;
  const yoyDir  = s.dpct >= 0 ? "up" : "down";
  const yoyAbs  = Math.abs(s.dpct || 0).toFixed(1);
  const vol12m  = s.vol_12m || (vol3m * 4);
  const medLease = s.med_lease || 0;
  const lowLeasePctTown = s.low_lease_pct || 0;
  const snapshotSentences = [
    `${s.name} median resale price is ${fmtKs(s.median)}, ${yoyDir} ${yoyAbs}% year-on-year${natMed ? ` (national median: ${fmtKs(natMed)})` : ""}.`,
    vol12m > 0
      ? `Over the last 12 months, ${vol12m.toLocaleString()} transactions were recorded — activity is ${velocity} the long-term monthly average.`
      : "",
    medLease > 0
      ? `Median remaining lease is ${medLease} years${lowLeasePctTown > 15 ? `; ${lowLeasePctTown}% of recent units had below 60 years remaining` : ""}.`
      : "",
  ].filter(Boolean).join(" ");

  // ── Lease profile histogram ──
  const leaseHist     = s.lease_hist     || [];
  const leaseHistLbls = s.lease_hist_lbls || [];
  const leaseInsuf    = leaseHist.reduce((a,b) => a+b, 0) < 30;
  const leaseMaxBar   = Math.max(...leaseHist, 1);
  const leaseBarHtml  = leaseHist.map((v, i) => {
    const bh = Math.max(3, (v / leaseMaxBar) * 72);
    const lbl = leaseHistLbls[i] || "";
    const isWarning = parseInt(lbl) < 60;
    return `<div class="td-dist-bar-col">
      <div class="td-dist-bar" style="height:${bh}px;background:${isWarning ? "var(--amber)" : "var(--accent)"}" title="${lbl}yr: ${v} txns"></div>
      <div class="td-dist-lbl" style="${isWarning?"color:var(--amber)":""}">${lbl}</div>
    </div>`;
  }).join("");

  // 60yr reference line position (bucket 6 = 60–64 boundary)
  const refBucketIdx = leaseHistLbls.findIndex(l => parseInt(l) >= 60);
  const refPct = leaseHist.length > 0 ? (refBucketIdx / leaseHist.length * 100) : 50;

  // ── Flat type breakdown ──
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
      const ppsqm = medPpsqm(ft);
      const c    = TYPE_LINE_COLORS[ft] || "var(--accent)";
      const barW = (med2 / maxFtMed * 100).toFixed(1);
      const shortFt = ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen");
      return `<div class="td-ftb-row">
        <span class="td-ftb-dot" style="background:${c}"></span>
        <span class="td-ftb-label">${shortFt}</span>
        <div class="td-ftb-bar-wrap"><div class="td-ftb-bar" style="width:${barW}%;background:${c}"></div></div>
        <span class="td-ftb-med">${fmtKs(med2)}</span>
        <span class="td-ftb-ppsqm">${ppsqm ? `$${ppsqm.toLocaleString()}/m²` : "—"}</span>
        <span class="td-ftb-pct">${pct}%</span>
      </div>`;
    }).join("") || `<div class="td-insuf">No flat type data</div>`;

  // ── Comparable towns ──
  const med = s.median;
  const comparable = DB.towns
    .filter(id => id !== townId)
    .map(id => ({ id, s: DB.town_summaries[id] }))
    .filter(({ s: cs }) => cs && cs.median && Math.abs(cs.median - med) / med <= 0.15)
    .sort((a, b) => Math.abs(a.s.median - med) - Math.abs(b.s.median - med))
    .slice(0, 3);

  const comparableHtml = comparable.length ? comparable.map(({ id, s: cs }) => {
    const diff = ((cs.median - med) / med * 100);
    return `<div class="td-comparable-row" onclick="openTownDashboard('${id}')">
      <span class="td-comparable-name">${cs.name}</span>
      <span class="td-comparable-med">${fmtKs(cs.median)}</span>
      <span class="td-comparable-diff" style="color:${diff >= 0 ? "var(--ink-3)" : "var(--green)"}">${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%</span>
    </div>`;
  }).join("") : `<div style="font-size:12px;color:var(--ink-3)">No comparable towns within ±15% median.</div>`;

  // ── Recent transactions ──
  const txnRows = (s.recent_txns || []).map(t => {
    const lease = t.lease_yrs || 0;
    const lowLease = lease > 0 && lease < 65;
    const leaseBadge = lowLease
      ? `<span class="td-low-lease-badge" title="Low remaining lease (${lease} years) — may affect CPF usage and bank loans">⚠ ${lease}yr</span>`
      : "";
    return `<tr${lowLease ? ' class="td-low-lease-row"' : ""}>
      <td>${fmtMonth(t.month)}</td>
      <td>Blk ${t.block} ${t.street}</td>
      <td><span class="txn-badge">${t.type.replace(" ROOM","R").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MG")}</span></td>
      <td>${t.sqm}m²</td>
      <td>${t.storey}</td>
      <td class="txn-price">${fmtKs(Math.round(t.price / 1000))}</td>
      <td style="color:var(--ink-3);font-size:11px">$${t.ppsqm?.toLocaleString()}/m²</td>
      <td>${leaseBadge}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="8" class="empty-state">No recent transactions</td></tr>`;

  // ── Budget pills per flat type ──
  const budgetPills = Object.entries(s.type_medians || {}).map(([ft, med]) => {
    const c = TYPE_LINE_COLORS[ft] || "var(--accent)";
    const shortFt = ft.replace(" ROOM","R").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MG");
    return `<span class="td-budget-pill" style="border-color:${c};color:${c}">${shortFt} <strong>${fmtKs(med)}</strong></span>`;
  }).join("");

  // ── "Is this right for me?" snapshot ──
  const aboveNat = natMed && s.median > natMed;
  const fitSummary = [
    `Median price is ${fmtKs(s.median)}${natMed ? ` — ${aboveNat ? "above" : "below"} the national median of ${fmtKs(natMed)}` : ""}.`,
    medLease > 0 ? `Median remaining lease ${medLease} yrs${lowLeasePctTown > 15 ? `; ${lowLeasePctTown}% of units under 60 yrs` : ""}.` : "",
  ].filter(Boolean).join(" ");

  document.getElementById("townViewBody").innerHTML = `<div class="td-page">

    <!-- ══ Row 1: Is this town right for me? (12col, Tier 1 hero) ══ -->
    <div class="td-card-hero td-col-12 td-fit-hero">
      <div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap">
        <span class="td-fit-eyebrow">Is this town right for me?</span>
        <span style="font-size:11px;color:var(--ink-3)">Data summary only — not financial advice</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:4px 0">
        <span style="font-size:28px;font-weight:700;letter-spacing:-.02em">${fmtKs(s.median)}</span>
        <span>${deltaPill(s.dpct)}</span>
        <span class="td-fit-vel" style="color:${velColor}">${velLabel}</span>
        <span style="font-size:11px;color:var(--ink-3);margin-left:auto">${s.p25 ? `25th–75th: ${fmtKs(s.p25)} – ${fmtKs(s.p75)}` : ""}</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${budgetPills}</div>
      <div class="td-fit-summary">${fitSummary}</div>
    </div>

    <!-- ══ Divider: Price Trends ══ -->
    <div class="td-section-divider">
      <div class="td-section-divider-line"></div>
      <div class="td-section-divider-label">Price Trends by Flat Type</div>
      <div class="td-section-divider-line"></div>
    </div>

    <!-- ══ Row 2: Price trend by type (8col) | What's Nearby (4col) ══ -->
    <div class="td-card-hero td-col-8">
      <div class="td-card-title">Median resale price <span class="td-card-note">by flat type · all-time</span></div>
      <div class="td-spark-wrap">${buildTypeTrendChart(townId)}</div>
    </div>

    <div class="td-card td-col-4">
      <div class="td-card-title">What's nearby</div>
      <div class="td-amenities">${amenityGroups}${primarySchoolHtml}${otherSchoolHtml}</div>
    </div>

    <!-- ══ Divider: Market Details ══ -->
    <div class="td-section-divider">
      <div class="td-section-divider-line"></div>
      <div class="td-section-divider-label">Market Details</div>
      <div class="td-section-divider-line"></div>
    </div>

    <!-- ══ Row 3: Storey premium (4) | Lease profile (4) | Comparable towns (4) ══ -->
    <div class="td-card td-col-4">
      <div class="td-card-title">Storey premium</div>
      <div class="td-card-desc" style="margin-bottom:8px">Higher floors typically command more.</div>
      ${storeyBars || '<div class="td-insuf">No storey data available</div>'}
    </div>

    <div class="td-card td-col-4">
      <div class="td-card-title">Lease profile <span class="td-card-note">last 12 months</span></div>
      ${leaseInsuf
        ? `<div class="td-insuf">Insufficient data (&lt;30 transactions)</div>`
        : `<div style="position:relative">
            <div class="td-dist-chart" style="padding-bottom:18px">${leaseBarHtml}</div>
            <div class="td-lease-ref" style="left:${refPct.toFixed(1)}%"></div>
          </div>
          <div class="td-lease-ref-label">▲ 60 yr — CPF/bank financing threshold</div>
          ${lowLeasePctTown > 0 ? `<div class="td-lease-warn${lowLeasePctTown > 20 ? " alert" : ""}">${lowLeasePctTown}% of transactions &lt; 60yr remaining lease</div>` : ""}`
      }
    </div>

    <div class="td-card td-col-4">
      <div class="td-card-title">Comparable towns <span class="td-card-note">within ±15% median</span></div>
      <div class="td-comparable-self">
        <span style="font-size:11px;color:var(--ink-3)">This town</span>
        <span style="font-weight:700;font-size:13px">${s.name}</span>
        <span style="font-weight:700;color:var(--accent)">${fmtKs(s.median)}</span>
      </div>
      ${comparableHtml}
      <div id="tdMiniMapWrap" style="margin-top:12px;border-radius:var(--r-sm);overflow:hidden;height:140px"></div>
    </div>

    <!-- ══ Divider: Transaction Data ══ -->
    <div class="td-section-divider">
      <div class="td-section-divider-line"></div>
      <div class="td-section-divider-label">Transaction Data</div>
      <div class="td-section-divider-line"></div>
    </div>

    <!-- ══ Row 4: Flat type breakdown (6) | Recent transactions (6) ══ -->
    <div class="td-card td-col-6">
      <div class="td-card-title">Flat type breakdown <span class="td-card-note">last 12 months</span></div>
      ${typeBreakdownHtml}
    </div>

    <div class="td-card td-col-6">
      <div class="td-card-title">Recent transactions <span class="td-card-note">latest 20 sales</span></div>
      <div class="txn-table-wrap">
        <table class="txn-table">
          <thead><tr><th>Month</th><th>Address</th><th>Type</th><th>Size</th><th>Floor</th><th>Price</th><th>$/m²</th><th>Lease</th></tr></thead>
          <tbody>${txnRows}</tbody>
        </table>
      </div>
    </div>

  </div>`;

  // Mini-map: whole Singapore view with town dot
  const miniMapEl = document.getElementById("tdMiniMapWrap");
  if (miniMapEl && s.coords) {
    const miniMap = L.map(miniMapEl, {
      center: [1.352, 103.82],
      zoom: 9.5,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
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
}

/* ══════════════════════════════════════════════════════════════════════════
   COMPARE VIEW
   ══════════════════════════════════════════════════════════════════════════ */
const COMPARE_COLORS = ["#6c8cff", "#34d399", "#fb923c"];

function renderCompare() {
  renderCompareSlots();
  renderCompareColumns();
}

function renderCompareSlots() {
  const container = document.getElementById("compareSlots");
  const slots = [];
  // Filled slots
  state.compareSlots.forEach((id, i) => {
    const s = DB.town_summaries[id];
    slots.push(`<div class="compare-slot filled">
      <span class="compare-slot-color" style="background:${COMPARE_COLORS[i]}"></span>
      <span style="font-size:13px;font-weight:600">${s.name}</span>
      <button class="compare-slot-remove" onclick="removeCompareSlot(${i})">${Icons.close}</button>
    </div>`);
  });
  // Single add button if under the limit
  if (state.compareSlots.length < 3) {
    slots.push(`<div class="compare-slot" onclick="openTownPicker(${state.compareSlots.length})">
      ${Icons.plus} <span>Add town</span>
    </div>`);
  }
  container.innerHTML = slots.join("");
}

function removeCompareSlot(i) {
  state.compareSlots.splice(i, 1);
  renderCompare();
}

function buildCompareTrendChart() {
  const slots = state.compareSlots;
  const W = 900, H = 200;
  const pad = { t: 14, b: 28, l: 52, r: 120 };
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

  return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="display:block;overflow:visible">
    ${yTicks}${xLabels}${lines}
  </svg>`;
}

function renderCompareColumns() {
  const body = document.getElementById("compareBody");
  if (state.compareSlots.length === 0) {
    body.innerHTML = `<div class="empty-state" style="grid-column:1/-1">Add towns above to compare them side by side.</div>`;
    return;
  }

  const slots = state.compareSlots;
  const n = slots.length;
  const colSpan = n === 1 ? 12 : n === 2 ? 6 : 4;

  // Pre-compute all town data
  const towns = slots.map((id, ci) => {
    const s  = DB.town_summaries[id];
    const am = AMENITIES[id] || { mrt: [], hawker: [], parks: [], schools: [] };
    const c  = COMPARE_COLORS[ci];
    return { id, s, am, c, ci };
  });

  // Winner detection helpers
  const best = (fn, dir = "min") => {
    const vals = towns.map(t => fn(t));
    const val  = dir === "min" ? Math.min(...vals) : Math.max(...vals);
    return towns.filter(t => fn(t) === val).map(t => t.id);
  };
  const cheapestIds  = best(t => t.s.median);
  const bestValueIds = best(t => t.s.ppsqm);
  const growthIds    = best(t => t.s.dpct, "max");
  const activeIds    = best(t => t.s.vol_12m || t.s.vol, "max");
  const leaseIds     = best(t => t.s.med_lease || 99, "max");
  const mrtIds       = best(t => t.am.mrt.length, "max");

  // ── Hero KPI cards (one per town) ──
  const heroCards = towns.map(({ id, s, c, ci }) => {
    const winBadges = [
      cheapestIds.includes(id)  && n > 1 ? `<span class="cmp-badge green">Cheapest</span>` : "",
      bestValueIds.includes(id) && n > 1 ? `<span class="cmp-badge teal">Best $/m²</span>` : "",
      growthIds.includes(id)    && n > 1 ? `<span class="cmp-badge amber">Top growth</span>` : "",
      activeIds.includes(id)    && n > 1 ? `<span class="cmp-badge blue">Most active</span>` : "",
    ].filter(Boolean).join("");

    return `<div class="td-card-hero trends-col-${colSpan}" style="border-left-color:${c}">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <span style="width:10px;height:10px;border-radius:50%;background:${c};flex-shrink:0"></span>
        <span style="font-size:16px;font-weight:700;color:var(--ink)">${s.name}</span>
        <span style="font-size:11px;color:var(--ink-3);background:var(--surface-2);padding:2px 8px;border-radius:var(--r-pill);border:1px solid var(--line)">${s.region}</span>
        <button style="margin-left:auto;font-size:11px;font-weight:600;color:${c};background:none;border:none;cursor:pointer;padding:0" onclick="openTownDashboard('${id}')">Full profile →</button>
      </div>
      <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px">
        <span style="font-size:26px;font-weight:800;letter-spacing:-.02em;color:var(--ink)">${fmtKs(s.median)}</span>
        <span>${deltaPill(s.dpct)}</span>
        <span style="font-size:12px;color:var(--ink-3)">$${s.ppsqm?.toLocaleString()}/m²</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:2px">
        <span class="cmp-stat"><span style="color:var(--ink-3)">Range</span> ${fmtKs(s.p25)}–${fmtKs(s.p75)}</span>
        <span class="cmp-stat"><span style="color:var(--ink-3)">Sales/mo</span> ${s.avg_monthly_12m ? s.avg_monthly_12m.toFixed(1) : s.vol}</span>
        <span class="cmp-stat" style="${(s.med_lease||99) < 70 ? "color:var(--amber)" : ""}"><span style="color:var(--ink-3)">Lease</span> ${s.med_lease ? s.med_lease+"yr" : "—"}</span>
      </div>
      ${winBadges ? `<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:4px">${winBadges}</div>` : ""}
    </div>`;
  }).join("");

  // ── Flat type price cards (one per town) ──
  const ftOrder = ["2 ROOM","3 ROOM","4 ROOM","5 ROOM","EXECUTIVE","MULTI-GENERATION"];
  const allFtMeds = towns.flatMap(({ s }) => Object.values(s.type_medians || {}));
  const globalMaxFt = Math.max(...allFtMeds, 1);

  const ftCards = towns.map(({ id, s, c, ci }) => {
    const rows = ftOrder.filter(ft => s.type_medians?.[ft]).map(ft => {
      const med = s.type_medians[ft];
      const pct = s.type_mix?.[ft] || 0;
      const barW = (med / globalMaxFt * 100).toFixed(1);
      const fc = TYPE_LINE_COLORS[ft] || c;
      return `<div class="td-ftb-row">
        <span class="td-ftb-dot" style="background:${fc}"></span>
        <span class="td-ftb-label">${ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MG")}</span>
        <div class="td-ftb-bar-wrap"><div class="td-ftb-bar" style="width:${barW}%;background:${fc}"></div></div>
        <span class="td-ftb-med">${fmtKs(med)}</span>
        <span class="td-ftb-pct">${pct}%</span>
      </div>`;
    }).join("");
    return `<div class="td-card trends-col-${colSpan}">
      <div class="td-card-title" style="margin-bottom:10px">
        <span style="color:${c}">${s.name}</span> · flat type prices
      </div>
      ${rows || '<div class="td-insuf">No data</div>'}
    </div>`;
  }).join("");

  // ── Lease health cards ──
  const leaseCards = towns.map(({ id, s, c, ci }) => {
    const lowPct = s.low_lease_pct || 0;
    const med    = s.med_lease || 0;
    const leaseHist = s.lease_hist || [];
    const leaseHistLbls = s.lease_hist_lbls || [];
    const leaseInsuf = leaseHist.reduce((a,b)=>a+b,0) < 30;
    const leaseMaxBar = Math.max(...leaseHist, 1);
    const refBucketIdx = leaseHistLbls.findIndex(l => parseInt(l) >= 60);
    const refPct = leaseHist.length > 0 ? (refBucketIdx / leaseHist.length * 100) : 50;
    const barsHtml = leaseHist.map((v, i) => {
      const bh = Math.max(3, (v / leaseMaxBar) * 56);
      const lbl = leaseHistLbls[i] || "";
      const warn = parseInt(lbl) < 60;
      return `<div class="td-dist-bar-col">
        <div class="td-dist-bar" style="height:${bh}px;background:${warn ? "var(--amber)" : c}" title="${lbl}yr: ${v}"></div>
        <div class="td-dist-lbl" style="${warn?"color:var(--amber)":""}">${lbl}</div>
      </div>`;
    }).join("");
    return `<div class="td-card trends-col-${colSpan}">
      <div class="td-card-title" style="margin-bottom:8px"><span style="color:${c}">${s.name}</span> · lease profile</div>
      <div style="display:flex;gap:16px;margin-bottom:10px">
        <div><div style="font-size:10px;color:var(--ink-3)">Median lease</div><div style="font-size:18px;font-weight:700;color:${med < 70 ? "var(--amber)" : "var(--ink)"}">${med ? med+"yr" : "—"}</div></div>
        <div><div style="font-size:10px;color:var(--ink-3)">Under 60yr</div><div style="font-size:18px;font-weight:700;color:${lowPct > 15 ? "var(--amber)" : "var(--ink)"}">${lowPct}%</div></div>
        ${leaseIds.includes(id) && n > 1 ? '<span class="cmp-badge teal" style="align-self:center">Best lease</span>' : ""}
      </div>
      ${leaseInsuf ? '<div class="td-insuf">Insufficient data</div>' :
        `<div style="position:relative">
          <div class="td-dist-chart" style="padding-bottom:18px">${barsHtml}</div>
          <div class="td-lease-ref" style="left:${refPct.toFixed(1)}%"></div>
        </div>
        <div class="td-lease-ref-label">▲ 60 yr threshold</div>`
      }
    </div>`;
  }).join("");

  // ── Amenity comparison ──
  const amenityTable = `<div class="td-card trends-col-12">
    <div class="td-card-title" style="margin-bottom:12px">Nearby amenities</div>
    <div class="cmp-amenity-grid" style="grid-template-columns:140px repeat(${n},1fr)">
      <div class="cmp-amenity-hdr"></div>
      ${towns.map(({ s, c }) => `<div class="cmp-amenity-hdr" style="color:${c}">${s.name}</div>`).join("")}
      ${[
        { icon: Icons.mrt,    label: "MRT stations",    key: "mrt",    winIds: mrtIds },
        { icon: Icons.hawker, label: "Hawker centres",  key: "hawker"  },
        { icon: Icons.park,   label: "Parks & nature",  key: "parks"   },
        { icon: Icons.school, label: "Primary schools", key: "schools", filter: s => s.filter(x => /primary/i.test(x)) },
      ].map(({ icon, label, key, winIds, filter }) => `
        <div class="cmp-amenity-row-label">${icon} ${label}</div>
        ${towns.map(({ id, am, c }) => {
          const items = filter ? filter(am[key] || []) : (am[key] || []);
          const isWin = winIds?.includes(id) && n > 1;
          return `<div class="cmp-amenity-cell ${isWin ? "cmp-amenity-win" : ""}" style="${isWin ? `color:${c}` : ""}">
            <span style="font-size:17px;font-weight:700">${items.length}</span>
          </div>`;
        }).join("")}
      `).join("")}
    </div>
  </div>`;

  // ── Full metric table ──
  const metricRows = [
    { label: "Median price",    fn: t => fmtKs(t.s.median),                    winIds: cheapestIds,  winDir: "low" },
    { label: "YoY change",      fn: t => deltaPill(t.s.dpct || 0),              winIds: growthIds,    winDir: "high" },
    { label: "Price / m²",      fn: t => `$${t.s.ppsqm?.toLocaleString()}`,     winIds: bestValueIds, winDir: "low" },
    { label: "P25–P75 range",   fn: t => `${fmtKs(t.s.p25)} – ${fmtKs(t.s.p75)}` },
    { label: "Sales/mo (12m)",  fn: t => t.s.avg_monthly_12m ? t.s.avg_monthly_12m.toFixed(1) : (t.s.vol||"—"), winIds: activeIds, winDir: "high" },
    { label: "Median lease",    fn: t => t.s.med_lease ? t.s.med_lease+"yr" : "—", winIds: leaseIds, winDir: "high" },
    { label: "% under 60yr lease", fn: t => `${t.s.low_lease_pct||0}%` },
    { label: "MRT stations",    fn: t => t.am.mrt.length,   winIds: mrtIds,    winDir: "high" },
    { label: "Hawker centres",  fn: t => t.am.hawker.length },
    { label: "Parks",           fn: t => t.am.parks.length },
    { label: "Schools",         fn: t => t.am.schools.length },
    { label: "Region",          fn: t => t.s.region },
  ].map(({ label, fn, winIds }) => `<tr>
    <td class="cmp-tbl-label">${label}</td>
    ${towns.map(({ id, c }) => {
      const isWin = winIds?.includes(id) && n > 1;
      return `<td class="cmp-tbl-val${isWin ? " cmp-tbl-win" : ""}" style="${isWin ? `color:${c}` : ""}">${fn(towns.find(t => t.id === id))}</td>`;
    }).join("")}
  </tr>`).join("");

  body.innerHTML = `<div class="trends-page">

    <!-- ══ Hero KPI cards ══ -->
    ${heroCards}

    <!-- ══ Divider: Price History ══ -->
    <div class="trends-section-div trends-col-12">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Price History</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Overlaid price trend chart ══ -->
    <div class="td-card-hero trends-col-12">
      <div class="td-card-title">Median resale price · all-time</div>
      <div class="td-spark-wrap">${buildCompareTrendChart()}</div>
    </div>

    <!-- ══ Divider: Affordability ══ -->
    <div class="trends-section-div trends-col-12">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Affordability by Flat Type</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Flat type price cards ══ -->
    ${ftCards}

    <!-- ══ Divider: Lease & Liveability ══ -->
    <div class="trends-section-div trends-col-12">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Lease Health</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Lease profile cards ══ -->
    ${leaseCards}

    <!-- ══ Divider: Amenities ══ -->
    <div class="trends-section-div trends-col-12">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Liveability</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Amenity comparison ══ -->
    ${amenityTable}

    <!-- ══ Divider: Full Breakdown ══ -->
    <div class="trends-section-div trends-col-12">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Full Breakdown</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Metric table ══ -->
    <div class="td-card trends-col-12">
      <div style="overflow-x:auto">
        <table class="cmp-table">
          <thead><tr>
            <th class="cmp-tbl-label" style="color:var(--ink-3)">Metric</th>
            ${towns.map(({ s, c }) => `<th class="cmp-tbl-val" style="color:${c}">${s.name}</th>`).join("")}
          </tr></thead>
          <tbody>${metricRows}</tbody>
        </table>
      </div>
    </div>

  </div>`;

}

/* ── Town picker modal ───────────────────────────────────────────────────── */
function openTownPicker(slotIdx) {
  state.modalSlotIdx = slotIdx;
  state.modalOpen    = true;
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
const trendsState = { period: "all", overlayTowns: new Set(), sortBy: "price", sortDir: 1, flatType: "ALL" };

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

function buildTownMovers() {
  return DB.towns.map(id => {
    const s  = DB.town_summaries[id];
    const tl = getTrendsTownTL(id).filter(t => t.med != null);
    if (!s || tl.length < 2) return null;
    const now  = tl[tl.length-1].med;
    const yr   = tl.length >= 13 ? tl[tl.length-13].med : tl[0].med;
    const all_ = tl[0].med;
    const medianVal = trendsState.flatType === "ALL" ? s.median : (now || s.median);
    return { id, name: s.name, region: s.region, median: medianVal, ppsqm: s.ppsqm,
             dpct: (now - yr) / yr * 100, allPct: (now - all_) / all_ * 100, vol: s.vol };
  }).filter(Boolean);
}

function renderTrends() {
  const container = document.getElementById("trendsBody");
  if (!DB) return;

  const natTL    = getTrendsNatTL();
  const validNat = natTL.filter(d => d.med != null);
  if (!validNat.length) return;
  const latest  = validNat[validNat.length - 1];
  const yearAgo = validNat.length >= 13 ? validNat[validNat.length - 13] : validNat[0];
  const first   = validNat[0];
  const yoyChg  = (latest.med - yearAgo.med) / yearAgo.med * 100;
  const allChg  = (latest.med - first.med) / first.med * 100;

  const movers = buildTownMovers();

  // Best value = lowest ppsqm (price/sqm)
  const byValue  = [...movers].sort((a,b) => a.ppsqm - b.ppsqm).slice(0,5);
  // Heating up = biggest YoY gain
  const hotTowns = [...movers].sort((a,b) => b.dpct - a.dpct).slice(0,5);
  // Stable/cooling = lowest YoY (opportunities or safe buys)
  const coolTowns = [...movers].sort((a,b) => a.dpct - b.dpct).slice(0,5);

  // National type price breakdown (latest medians from type_medians in summaries)
  const typeMedians = {};
  DB.flat_types.forEach(ft => {
    let vals = DB.towns.map(id => DB.town_summaries[id]?.type_medians?.[ft]).filter(Boolean);
    if (vals.length) typeMedians[ft] = vals.reduce((a,b)=>a+b,0)/vals.length;
  });
  const maxTypeMed = Math.max(...Object.values(typeMedians));

  // Most active (highest vol)
  const mostActive  = [...movers].sort((a,b) => b.vol - a.vol)[0];
  // Affordability: national median price / SGD $8,000/month
  const affordMonths = Math.round((latest.med * 1000) / 8000);
  // Lease decay
  const lowLeasePct = DB.nat_low_lease_pct || 0;

  const flatTypeOptions = ["ALL", ...DB.flat_types];

  // Town sort for bottom grid
  const gridSorted = [...movers].sort((a,b) => {
    if (trendsState.sortBy === "price") return b.median - a.median;
    if (trendsState.sortBy === "yoy")   return b.dpct - a.dpct;
    if (trendsState.sortBy === "value") return a.ppsqm - b.ppsqm;
    return 0;
  });

  container.innerHTML = `<div class="trends-page">

    <!-- ══ Row 1: KPI bar (4 cards × full width) ══ -->
    <div class="trends-kpi-bar">
      <div class="trends-kpi-card accent-border">
        <div class="trends-kpi-label">National Median · ${trendsState.flatType === "ALL" ? "All Types" : trendsState.flatType}</div>
        <div class="trends-kpi-value">${fmtKs(latest.med)}</div>
        <div class="trends-kpi-sub">${fmtMonth(latest.m)} &nbsp;·&nbsp; ${deltaPill(yoyChg)} YoY</div>
      </div>
      <div class="trends-kpi-card">
        <div class="trends-kpi-label">Since ${fmtMonth(first.m)}</div>
        <div class="trends-kpi-value">${allChg >= 0 ? "+" : ""}${allChg.toFixed(1)}%</div>
        <div class="trends-kpi-sub">${fmtKs(first.med)} → ${fmtKs(latest.med)}</div>
      </div>
      <div class="trends-kpi-card">
        <div class="trends-kpi-label">Affordability index</div>
        <div class="trends-kpi-value">${affordMonths}<span style="font-size:14px;font-weight:500;color:var(--ink-3)"> mo</span></div>
        <div class="trends-kpi-sub">of $8k/mo income to buy</div>
      </div>
      <div class="trends-kpi-card green-border">
        <div class="trends-kpi-label">Best value town</div>
        <div class="trends-kpi-value" style="font-size:20px;color:var(--green)">${byValue[0]?.name || "—"}</div>
        <div class="trends-kpi-sub">$${byValue[0]?.ppsqm?.toLocaleString() || "—"}/m² &nbsp;·&nbsp; ${fmtKs(byValue[0]?.median)}</div>
      </div>
    </div>

    <!-- ══ Lease decay banner (full width) ══ -->
    <div class="trends-lease-banner trends-col-12${lowLeasePct > 20 ? " warn" : ""}">
      <span class="trends-lease-banner-icon">${lowLeasePct > 20 ? "⚠" : "ℹ"}</span>
      <span><strong>${lowLeasePct}%</strong> of transactions in the last 12 months had <strong>fewer than 60 years</strong> remaining lease${lowLeasePct > 20 ? " — above the 20% caution threshold." : "."}</span>
      <span class="trends-lease-banner-note">Units below 60 years may face CPF usage and bank loan restrictions.</span>
    </div>

    <!-- ══ Divider: National Price Trend ══ -->
    <div class="trends-section-div">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">National Price &amp; Volume</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Row 2: Combo chart (full width, Tier 1 hero) ══ -->
    <div class="trends-chart-card trends-col-12">
      <div class="trends-chart-header">
        <div>
          <div class="trends-chart-title">Median Resale Price &amp; Transaction Volume</div>
          <div class="trends-chart-sub">National median · line = price (left axis) · bars = volume (right axis) · hover to inspect</div>
        </div>
        <div class="trends-controls">
          <div class="trends-period-btns">
            ${["1Y","3Y","5Y","All"].map(p =>
              `<button class="trends-period-btn${trendsState.period===p.toLowerCase()||trendsState.period===p?' active':''}" onclick="setTrendsPeriod('${p}')">${p}</button>`
            ).join("")}
          </div>
          <div class="trends-type-btns">
            ${flatTypeOptions.map(ft =>
              `<button class="trends-type-btn${trendsState.flatType===ft?' active':''}" onclick="setTrendsType('${ft}')">${ft==="ALL"?"All types":ft.replace(" ROOM","Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</button>`
            ).join("")}
          </div>
        </div>
      </div>

      <div class="trends-chart-wrap" id="trendsChartWrap">${buildComboChart()}</div>

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

    <!-- ══ Divider: Market Insights ══ -->
    <div class="trends-section-div">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">Market Insights</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Row 3: Budget guide (6) | Best value (3) | Heating up (3) ══ -->
    <div class="trends-insight-card trends-col-6 trends-insight-stretch">
      <div class="trends-insight-title">Budget guide — price by flat type</div>
      <div class="trends-insight-desc">National median by flat type. Know your range before you search.</div>
      ${Object.entries(typeMedians).filter(([,v])=>v).map(([ft, med]) => `
        <div style="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid var(--line)">
          <span style="font-size:11px;font-weight:600;color:var(--ink-3);width:52px;flex-shrink:0">${ft.replace(" ROOM","‑Rm").replace("EXECUTIVE","Exec").replace("MULTI-GENERATION","MultiGen")}</span>
          <div style="flex:1;height:5px;border-radius:3px;background:var(--surface-3)">
            <div style="height:100%;width:${(med/maxTypeMed*100).toFixed(1)}%;border-radius:3px;background:var(--accent)"></div>
          </div>
          <span style="font-size:12px;font-weight:700;color:var(--ink);width:68px;text-align:right;font-variant-numeric:tabular-nums">${fmtKs(med)}</span>
        </div>`).join("")}
    </div>

    <div class="trends-insight-card trends-col-3 trends-insight-stretch">
      <div class="trends-insight-title">Heating up</div>
      <div class="trends-insight-desc">Fastest YoY growth — prices may keep climbing.</div>
      ${hotTowns.map((t,i) => `
        <div class="trends-insight-row" onclick="openTownDashboard('${t.id}')">
          <span class="trends-insight-rank">${i+1}</span>
          <span class="trends-insight-name">${t.name}</span>
          <span class="trends-insight-val">${fmtKs(t.median)}</span>
          <span class="trends-insight-badge badge-red">+${t.dpct.toFixed(1)}%</span>
        </div>`).join("")}
    </div>

    <div class="trends-insight-card trends-col-3 trends-insight-stretch">
      <div class="trends-insight-title">Stable or cooling</div>
      <div class="trends-insight-desc">Lowest growth — potential opportunity.</div>
      ${coolTowns.map((t,i) => `
        <div class="trends-insight-row" onclick="openTownDashboard('${t.id}')">
          <span class="trends-insight-rank">${i+1}</span>
          <span class="trends-insight-name">${t.name}</span>
          <span class="trends-insight-val">${fmtKs(t.median)}</span>
          <span class="trends-insight-badge ${t.dpct < 0 ? 'badge-green' : 'badge-amber'}">${t.dpct >= 0 ? "+" : ""}${t.dpct.toFixed(1)}%</span>
        </div>`).join("")}
    </div>

    <!-- ══ Divider: All Towns ══ -->
    <div class="trends-section-div">
      <div class="trends-section-div-line"></div>
      <div class="trends-section-div-label">All Towns</div>
      <div class="trends-section-div-line"></div>
    </div>

    <!-- ══ Row 4: Town grid (full width) ══ -->
    <div class="trends-town-section trends-col-12">
      <div class="trends-town-section-title">
        <span style="color:var(--ink-3)">click any card to explore in detail</span>
        <div class="trends-town-sort">
          ${[["price","By price"],["yoy","By YoY %"],["value","By value"]].map(([k,l]) =>
            `<button class="trends-town-sort-btn${trendsState.sortBy===k?' active':''}" onclick="setTownGridSort('${k}')">${l}</button>`
          ).join("")}
        </div>
      </div>
      <div class="trends-town-grid" id="trendsTownGrid">
        ${buildTownGrid(gridSorted)}
      </div>
    </div>

  </div>`;

  attachChartListeners();
}

function buildTownGrid(sorted) {
  return sorted.map(t => {
    const tl = getTrendsTownTL(t.id);
    const sp = sparklineSVG(tl.slice(-24), { w: 140, h: 38, color: t.dpct >= 0 ? "var(--accent)" : "var(--red)", fill: true });
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

function buildComboChart() {
  const tl    = getFilteredNatTL();
  const valid = tl.filter(d => d.med != null || d.vol != null);
  if (valid.length < 2) return "";

  const W = 800, H = 280;
  // right pad must fit: vol-axis ticks (30px) + gap (8px) + longest town label (~110px at font-size 9)
  const pad = { t: 14, b: 30, l: 56, r: 100 };

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

  return `<svg id="trendsChart" width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
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
    <!-- Crosshair (hidden by default) -->
    <line id="chartCross" x1="0" y1="${pad.t}" x2="0" y2="${H-pad.b}" stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="3 3" visibility="hidden"/>
    <circle id="chartDot" cx="0" cy="0" r="4" fill="var(--accent)" stroke="var(--bg-1)" stroke-width="2" visibility="hidden"/>
    <rect id="chartTipBg" x="0" y="0" width="130" height="46" rx="6" fill="var(--surface)" stroke="var(--line-2)" stroke-width="1" visibility="hidden"/>
    <text id="chartTipVal" x="0" y="0" font-size="12" font-weight="700" fill="var(--ink)" font-family="Inter,sans-serif" visibility="hidden"></text>
    <text id="chartTipVol" x="0" y="0" font-size="10" fill="var(--ink-3)" font-family="Inter,sans-serif" visibility="hidden"></text>
    <text id="chartTipMon" x="0" y="0" font-size="10" fill="var(--ink-3)" font-family="Inter,sans-serif" visibility="hidden"></text>
  </svg>`;
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
  const sorted = [...movers].sort((a,b) => {
    if (key === "price") return b.median - a.median;
    if (key === "yoy")   return b.dpct - a.dpct;
    if (key === "value") return a.ppsqm - b.ppsqm;
    return 0;
  });
  const grid = document.getElementById("trendsTownGrid");
  if (grid) grid.innerHTML = buildTownGrid(sorted);
  document.querySelectorAll(".trends-town-sort-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset?.sort === key || btn.getAttribute("onclick")?.includes(`'${key}'`));
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
window.resetFilters           = window.clearFilters;

document.addEventListener("DOMContentLoaded", () => {
  // Nav tabs
  document.querySelectorAll(".topnav-tab").forEach(tab => {
    tab.addEventListener("click", () => showView(tab.dataset.view));
  });

  // On mobile, start with sidebar hidden so map is visible
  if (window.innerWidth <= 768) {
    state.sidebarOpen = false;
    document.getElementById("filterSidebar").classList.add("hidden");
    document.getElementById("mapLegend").classList.add("sidebar-hidden");
    document.getElementById("sidebarOpenBtn").style.display = "flex";
  }

  // Sidebar toggle
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    state.sidebarOpen = false;
    document.getElementById("filterSidebar").classList.add("hidden");
    document.getElementById("mapLegend").classList.add("sidebar-hidden");
    document.getElementById("sidebarOpenBtn").style.display = "flex";
  });
  document.getElementById("sidebarOpenBtn").addEventListener("click", () => {
    state.sidebarOpen = true;
    document.getElementById("filterSidebar").classList.remove("hidden");
    document.getElementById("mapLegend").classList.remove("sidebar-hidden");
    document.getElementById("sidebarOpenBtn").style.display = "none";
  });

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
