import { Dialog } from "@headlessui/react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

export default function ResourceDetailsDialog({ open, onClose, resource, fallbackImage }) {
  if (!resource) return null;

  const isReport = resource.type === "informe";
  const image = resource.thumbnail || fallbackImage || "";

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
          <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-56 w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="h-56 w-full bg-gradient-to-br from-emerald-200 via-cyan-100 to-white dark:from-emerald-950/40 dark:via-cyan-950/20 dark:to-zinc-950" />
              )}

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex items-center justify-center rounded-2xl bg-white/85 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:bg-zinc-950/70 dark:text-zinc-50"
              >
                Cerrar
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                  {isReport ? "Informe" : "Evento"}
                </span>
                {resource.category ? (
                  <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
                    {resource.category}
                  </span>
                ) : null}
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(resource.date)}</span>
              </div>

              <Dialog.Title className="mt-3 text-xl font-semibold tracking-tight">
                {resource.title}
              </Dialog.Title>

              {resource.location ? (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  Ubicación: <span className="font-medium">{resource.location}</span>
                </p>
              ) : null}

              {resource.description ? (
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                  {resource.description}
                </p>
              ) : null}

              {isReport ? (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{resource.fileSize ?? ""}</p>

                  {resource.fileUrl ? (
                    <a
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
                    >
                      Ver PDF
                    </a>
                  ) : (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">PDF no disponible</span>
                  )}
                </div>
              ) : null}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
