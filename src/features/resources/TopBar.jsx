import ThemeToggle from "../../ui/ThemeToggle";

export default function TopBar({
  siteName,
  lastUpdate,
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
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-200">
            {siteName}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Última actualización: {lastUpdate}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="md:col-span-12 lg:col-span-5">
              <label className="sr-only" htmlFor="search">
                Buscar
              </label>
              <input
                id="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Buscar por título, categoría o ubicación…"
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-emerald-400"
              />
            </div>

            <div className="md:col-span-6 lg:col-span-3">
              <label className="sr-only" htmlFor="category">
                Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "all" ? "Todas las categorías" : c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="fromDate">
                Desde
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => onFromDateChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="md:col-span-3 lg:col-span-2">
              <label className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-300" htmlFor="toDate">
                Hasta
              </label>
              <input
                id="toDate"
                type="date"
                value={toDate}
                onChange={(e) => onToDateChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="flex items-center lg:col-span-12">
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md active:translate-y-0 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-950/45"
              >
                <span className="text-sm leading-none">↺</span>
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
