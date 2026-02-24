import { useEffect, useMemo, useRef, useState } from "react";

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

function buildSlides(banner, allItems) {
  const reports = (allItems ?? []).filter((x) => x?.type === "informe" && x?.fileUrl);
  const latestReport = reports
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const bannerCta =
    banner?.ctaUrl?.startsWith("http")
      ? { label: "Ver destacado", url: banner.ctaUrl }
      : latestReport
        ? { label: "Ver último informe", url: latestReport.fileUrl }
        : { label: "Ver destacado", url: "" };

  const itemSlides = (allItems ?? [])
    .filter((x) => x?.thumbnail)
    .slice(0, 4)
    .map((x) => ({
      imageUrl: x.thumbnail,
      title: x.title,
      subtitle: `${x.category} • ${x.date}`,
      ctaLabel: x.type === "informe" ? "Ver PDF" : "",
      ctaUrl: x.type === "informe" ? x.fileUrl : "",
    }));

  return [
    {
      imageUrl: banner.imageUrl,
      title: banner.title,
      subtitle: banner.description,
      ctaLabel: bannerCta.label,
      ctaUrl: bannerCta.url,
    },
    ...itemSlides,
  ];
}

export default function ResourceBanner({ banner, activeTab, allItems }) {
  const slides = useMemo(() => buildSlides(banner, allItems), [banner, allItems]);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const restartTimerRef = useRef(null);

  const current = slides[clampIndex(active, slides.length)];

  function go(nextIndex) {
    setActive(clampIndex(nextIndex, slides.length));

    window.clearTimeout(restartTimerRef.current);
    setIsPaused(true);
    restartTimerRef.current = window.setTimeout(() => setIsPaused(false), 9000);
  }

  function next() {
    go(active + 1);
  }

  function prev() {
    go(active - 1);
  }

  useEffect(() => {
    if (slides.length <= 1) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setActive((i) => clampIndex(i + 1, slides.length));
    }, 5000);

    return () => window.clearInterval(id);
  }, [slides.length, isPaused]);

  useEffect(() => {
    return () => window.clearTimeout(restartTimerRef.current);
  }, []);

  return (
    <section
      className="group relative overflow-hidden rounded-[28px] border border-zinc-200 bg-gradient-to-br from-emerald-50 via-white to-white shadow-[0_12px_50px_-30px_rgba(0,0,0,0.45)] dark:border-zinc-800 dark:from-emerald-950/35 dark:via-zinc-950 dark:to-zinc-950"

      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.30),transparent_55%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent dark:via-white/10 animate-[shine_1.2s_ease-out]" />
      </div>
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10 dark:from-zinc-950 dark:via-zinc-950/60 dark:to-zinc-950/10" />

          {slides.map((s, idx) => {
            const isActive = idx === clampIndex(active, slides.length);

            return (
              <img
                key={`${s.imageUrl}-${idx}`}
                src={s.imageUrl}
                alt=""
                className={[
                  "absolute inset-0 h-full w-full object-cover",
                  "transition-opacity duration-700 ease-out will-change-[opacity]",
                  isActive ? "opacity-30" : "opacity-0",
                ].join(" ")}
                loading={idx === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            );
          })}
        </div>

        <div className="relative min-h-[320px] px-6 py-14 sm:min-h-[360px] sm:px-10 sm:py-16 lg:min-h-[420px] lg:px-14 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                Centro de recursos • {activeTab === "informe" ? "Informes" : "Eventos"}
              </p>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {current?.title ?? ""}
              </h1>

              <p className="mt-3 max-w-2xl text-base text-zinc-700 dark:text-zinc-200 sm:text-[15px]">
                {current?.subtitle ?? ""}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {current?.ctaUrl ? (
                  <a
                    href={current.ctaUrl}
                    target={current.ctaUrl.startsWith("http") ? "_blank" : undefined}
                    rel={current.ctaUrl.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-md active:translate-y-0"
                  >
                    {current.ctaLabel}
                  </a>
                ) : (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Sin enlace para este recurso
                  </span>
                )}

                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {slides.length > 1 ? `${clampIndex(active, slides.length) + 1} / ${slides.length}` : ""}
                </span>
              </div>
            </div>

            {slides.length > 1 ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-2xl border border-zinc-200 bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100"
                    aria-label="Anterior"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="rounded-2xl border border-zinc-200 bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-100"
                    aria-label="Siguiente"
                  >
                    →
                  </button>
                </div>

                <div className="hidden items-center gap-2 sm:flex" aria-label="Indicadores">
                  {slides.map((_, idx) => {
                    const on = idx === clampIndex(active, slides.length);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => go(idx)}
                        className={[
                          "h-2 rounded-full transition-all",
                          on ? "w-8 bg-emerald-600" : "w-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600",
                        ].join(" ")}
                        aria-label={`Ir al slide ${idx + 1}`}
                        aria-current={on ? "true" : "false"}
                      />
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
