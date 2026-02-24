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

export function categoryTone(category) {
  const key = String(category ?? "").toLowerCase();

  if (key.includes("climat")) {
    return {
      chip: "bg-sky-600 text-white",
      chipSoft: "bg-sky-600/10 text-sky-800 dark:text-sky-200 dark:bg-sky-500/10",
      accent: "from-emerald-500/70 via-cyan-400/60 to-sky-400/60",
    };
  }

  if (key.includes("glacio")) {
    return {
      chip: "bg-indigo-600 text-white",
      chipSoft: "bg-indigo-600/10 text-indigo-800 dark:text-indigo-200 dark:bg-indigo-500/10",
      accent: "from-sky-500/65 via-indigo-400/55 to-cyan-300/55",
    };
  }

  if (key.includes("biod")) {
    return {
      chip: "bg-emerald-600 text-white",
      chipSoft: "bg-emerald-600/10 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-500/10",
      accent: "from-emerald-500/70 via-lime-400/55 to-amber-300/45",
    };
  }

  if (key.includes("meteor")) {
    return {
      chip: "bg-violet-600 text-white",
      chipSoft: "bg-violet-600/10 text-violet-800 dark:text-violet-200 dark:bg-violet-500/10",
      accent: "from-cyan-500/65 via-emerald-400/55 to-sky-400/55",
    };
  }

  if (key.includes("concient")) {
    return {
      chip: "bg-amber-600 text-white",
      chipSoft: "bg-amber-600/10 text-amber-900 dark:text-amber-200 dark:bg-amber-500/10",
      accent: "from-amber-500/60 via-emerald-400/45 to-cyan-300/45",
    };
  }

  return {
    chip: "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900",
    chipSoft: "bg-zinc-900/10 text-zinc-800 dark:text-zinc-200 dark:bg-white/10",
    accent: "from-emerald-500/65 via-cyan-400/55 to-sky-400/55",
  };
}
