import { useMemo, useState } from "react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

function isFresh(dateStr, referenceDate, days = 14) {
  if (!referenceDate) return false;
  const a = new Date(referenceDate).getTime();
  const b = new Date(dateStr).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  const diffDays = Math.abs(a - b) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

export default function ReportCard({ report, referenceDate }) {
  const [imgOk, setImgOk] = useState(true);

  const fresh = useMemo(
    () => isFresh(report.date, referenceDate, 14),
    [report.date, referenceDate]
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative">
        {report.thumbnail && imgOk ? (
          <img
            src={report.thumbnail}
            alt=""
            className="h-40 w-full object-cover"
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-zinc-100 dark:from-emerald-950/40 dark:to-zinc-950">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">Sin imagen</span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded-full bg-zinc-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur dark:bg-white/10">
            {report.category}
          </span>
          {fresh ? (
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              Nuevo
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(report.date)}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight">{report.title}</h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{report.fileSize ?? ""}</p>

          {report.fileUrl ? (
            <a
              href={report.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800 active:translate-y-[1px] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Ver PDF
            </a>
          ) : (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">PDF no disponible</span>
          )}
        </div>
      </div>
    </article>
  );
}
