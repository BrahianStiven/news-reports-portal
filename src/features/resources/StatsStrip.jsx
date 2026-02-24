function StatCard({ label, value, hint, accent, labelTint }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="pointer-events-none absolute right-4 top-4 opacity-[0.12] dark:opacity-[0.10]">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-zinc-900 dark:text-white">
          <path
            d="M4 14c2.5-2.5 4.5-2.5 7 0s4.5 2.5 9-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 19h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M6 9c1.5-2 3.2-3 6-3 3.2 0 5.3 1.4 6 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>
      <div className={["absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl opacity-60", accent].join(" ")} />
      <div className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", labelTint].join(" ")}>
        {label}
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {hint ? (
        <p className="mt-2 text-sm leading-snug text-zinc-600 dark:text-zinc-300">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default function StatsStrip({ stats }) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard
        label="Informes"
        value={stats.reports}
        hint="PDFs y reportes descargables"
        accent="bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.35),transparent_60%)]"
        labelTint="bg-emerald-600/10 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200"
      />

      <StatCard
        label="Eventos"
        value={stats.events}
        hint="Activaciones y jornadas"
        accent="bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.30),transparent_60%)]"
        labelTint="bg-cyan-600/10 text-cyan-900 dark:bg-cyan-500/10 dark:text-cyan-200"
      />

      <StatCard
        label="Último añadido"
        value={stats.newestTitle || "—"}
        hint={stats.newestDate || ""}
        accent="bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.22),transparent_60%)]"
        labelTint="bg-violet-600/10 text-violet-900 dark:bg-violet-500/10 dark:text-violet-200"
      />
    </section>
  );
}
