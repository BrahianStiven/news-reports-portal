function normalize(text) {
  return String(text ?? "")
    .trim()
    .toLowerCase();
}

function includesQuery(haystack, query) {
  if (!query) return true;
  return normalize(haystack).includes(normalize(query));
}

function inRange(dateStr, fromDate, toDate) {
  if (!fromDate && !toDate) return true;
  const value = new Date(dateStr).getTime();
  if (Number.isNaN(value)) return true;

  if (fromDate) {
    const from = new Date(fromDate).getTime();
    if (!Number.isNaN(from) && value < from) return false;
  }

  if (toDate) {
    const to = new Date(toDate).getTime();
    if (!Number.isNaN(to) && value > to) return false;
  }

  return true;
}

export function getAllCategories(items) {
  const set = new Set(items.map((x) => x.category).filter(Boolean));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

export function applyResourceFilters(items, { activeTab, query, category, fromDate, toDate }) {
  return items
    .filter((x) => x.type === activeTab)
    .filter((x) => (category === "all" ? true : x.category === category))
    .filter((x) => inRange(x.date, fromDate, toDate))
    .filter((x) => includesQuery(`${x.title} ${x.category} ${x.location ?? ""}`, query))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function buildResourceStats(items, metadata) {
  const reports = items.filter((x) => x.type === "informe").length;
  const events = items.filter((x) => x.type === "evento").length;

  const newest = items
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return {
    reports,
    events,
    lastUpdate: metadata?.last_update ?? "",
    newestTitle: newest?.title ?? "",
    newestDate: newest?.date ?? "",
  };
}
