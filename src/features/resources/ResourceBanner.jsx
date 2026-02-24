import { useEffect, useMemo, useRef, useState } from "react";

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

function buildSlides(banner, allItems) {
  const itemSlides = (allItems ?? [])
    .filter((x) => x?.thumbnail)
    .slice(0, 4)
    .map((x) => ({
      imageUrl: x.thumbnail,
      title: x.title,
      subtitle: `${x.category} • ${x.date}`,
      ctaLabel: x.type === "informe" ? "Ver PDF" : "Ver detalles",
      ctaUrl: x.type === "informe" ? x.fileUrl : "",
    }));

  return [
    {
      imageUrl: banner.imageUrl,
      title: banner.title,
      subtitle: banner.description,
      ctaLabel: "Ver destacado",
      ctaUrl: banner.ctaUrl,
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
      className="group overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-emerald-50 to-white shadow-sm dark:border-zinc-800 dark:from-emerald-950/30 dark:to-zinc-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
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

        <div className="relative px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
                Centro de recursos • {activeTab === "informe" ? "Informes" : "Eventos"}
              </p>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {current?.title ?? ""}
              </h1>

              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
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
