import { categoryTone } from "../../lib/resources";

function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

export default function EventCard({ event }) {
    const tone = categoryTone(event.category);

    return (
        <article className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className={["mb-3 h-1 w-full rounded-full bg-gradient-to-r opacity-85", tone.accent].join(" ")} />

            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(event.date)}</p>
                    <h3
                        className="mt-1 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 whitespace-normal break-words"
                        title={event.title}
                    >
                        {event.title}
                    </h3>
                </div>

                <span className={["shrink-0 rounded-full px-3 py-1 text-xs font-semibold shadow-sm", tone.chip].join(" ")}>
                    {event.category}
                </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {event.location ? (
                    <span className={["rounded-full px-3 py-1 text-xs font-medium", tone.chipSoft].join(" ")}>
                        {event.location}
                    </span>
                ) : null}
                <span className="rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                    Evento
                </span>
            </div>

            {event.description ? (
                <p className="mt-3 line-clamp-3 text-sm text-zinc-700 dark:text-zinc-200">
                    {event.description}
                </p>
            ) : null}
        </article>
    );
}
