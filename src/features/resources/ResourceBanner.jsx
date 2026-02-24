export default function ResourceBanner({ banner, activeTab }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm dark:border-zinc-800 dark:from-emerald-950/30 dark:to-zinc-950">
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={banner.imageUrl}
            alt=""
            className="h-full w-full object-cover opacity-25"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10 dark:from-zinc-950 dark:via-zinc-950/60 dark:to-zinc-950/10" />
        </div>

        <div className="relative px-6 py-10 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
            Centro de recursos • {activeTab === "informe" ? "Informes" : "Eventos"}
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {banner.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700 dark:text-zinc-200">
            {banner.description}
          </p>

          <div className="mt-6">
            <a
              href={banner.ctaUrl}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md active:translate-y-0"
            >
              Ver destacado
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
