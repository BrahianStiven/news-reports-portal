export default function StatsStrip({ stats }) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Informes</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{stats.reports}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Eventos</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{stats.events}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Último añadido</p>
        <p className="mt-1 truncate text-sm font-medium">{stats.newestTitle || "—"}</p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{stats.newestDate || ""}</p>
      </div>
    </section>
  );
}
