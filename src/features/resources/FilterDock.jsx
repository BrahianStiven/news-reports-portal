import { useMemo } from "react";

function hasActiveFilters({ query, category, fromDate, toDate }) {
  return Boolean(query || (category && category !== "all") || fromDate || toDate);
}

export default function FilterDock({
  query,
  onQueryChange,
  categories,
  category,
  onCategoryChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onClearFilters,
  resultsCount,
}) {
  const active = useMemo(
    () => hasActiveFilters({ query, category, fromDate, toDate }),
    [query, category, fromDate, toDate]
  );

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-full max-w-[320px] shrink-0 lg:block">
      <div className="h-full overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
        <div className="flex items-center justify-between border-b border-zinc-200/70 px-5 py-4 dark:border-zinc-800/70">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Filtros</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{resultsCount} resultados</p>
          </div>

          <button
            type="button"
            onClick={onClearFilters}
            disabled={!active}
            className={[
              "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition",
              active
                ? "bg-emerald-600 text-white shadow-sm hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md active:translate-y-0"
                : "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600",
            ].join(" ")}
          >
            <span className="text-sm leading-none">↺</span>
            Limpiar
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="search">
              Buscar
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Título, categoría o ubicación…"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="category">
              Categoría
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Todas" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="fromDate">
                Desde
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="toDate">
                Hasta
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/25 dark:text-emerald-100">
            Tip: Usa la búsqueda para filtrar rápido por tema y la fecha para ver “lo último”.
          </div>
        </div>
      </div>
    </aside>
  );
}
