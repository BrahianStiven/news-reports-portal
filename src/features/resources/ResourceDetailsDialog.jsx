import { Dialog } from "@headlessui/react";
import { useEffect, useMemo, useState } from "react";

function formatDate(dateStr) {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat("es-CO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
}

async function copyText(text) {
    const value = String(text ?? "");
    if (!value) return false;

    try {
        if (window.isSecureContext && navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(value);
            return true;
        }
    } catch {
        // fallback below
    }

    try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}

export default function ResourceDetailsDialog({
    open,
    onClose,
    collection,
    index,
    onNavigate,
    fallbackImage,
}) {
    const safeCollection = collection ?? [];
    const current = safeCollection[index] ?? null;

    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState(false);


    const nav = useMemo(() => {
        const hasPrev = index > 0;
        const hasNext = index < safeCollection.length - 1;
        return { hasPrev, hasNext };
    }, [index, safeCollection.length]);

    useEffect(() => {
        if (!open) return;
        setCopied(false);
        setCopyError(false);
    }, [open, index]);

    const image = current?.thumbnail || fallbackImage || "";

    const [imageOk, setImageOk] = useState(true);

    useEffect(() => {
        setImageOk(true);
    }, [image]);

    if (!open || !current) return null;

    const isReport = current.type === "informe";

    async function onCopyLink() {
        setCopyError(false);
        const ok = await copyText(current.fileUrl);
        setCopied(ok);
        setCopyError(!ok);
        window.setTimeout(() => setCopied(false), 1600);
    }

    function prev() {
        if (!nav.hasPrev) return;
        onNavigate?.(index - 1);
    }

    function next() {
        if (!nav.hasNext) return;
        onNavigate?.(index + 1);
    }

    function onPanelKeyDown(e) {
        const tag = e.target?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;

        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
                    <Dialog.Panel
                        onKeyDown={onPanelKeyDown}
                        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
                    >
                        <div className="relative">
                            {image && imageOk ? (
                                <img
                                    key={image}
                                    src={image}
                                    alt=""
                                    className="h-56 w-full object-cover"
                                    loading="lazy"
                                    onError={() => setImageOk(false)}
                                />
                            ) : (
                                <div className="h-56 w-full bg-gradient-to-br from-emerald-200 via-cyan-100 to-white dark:from-emerald-950/40 dark:via-cyan-950/20 dark:to-zinc-950" />
                            )}

                            <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                                <div className="inline-flex items-center gap-2 rounded-2xl bg-white/85 px-3 py-2 text-xs font-semibold text-zinc-900 shadow-sm dark:bg-zinc-950/70 dark:text-zinc-50">
                                    <span>{index + 1}</span>
                                    <span className="text-zinc-500 dark:text-zinc-300">/</span>
                                    <span>{safeCollection.length}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={prev}
                                        disabled={!nav.hasPrev}
                                        className={[
                                            "rounded-2xl px-3 py-2 text-sm font-semibold shadow-sm transition",
                                            nav.hasPrev
                                                ? "bg-white/85 text-zinc-900 hover:bg-white dark:bg-zinc-950/70 dark:text-zinc-50"
                                                : "cursor-not-allowed bg-white/50 text-zinc-400 dark:bg-zinc-950/40 dark:text-zinc-600",
                                        ].join(" ")}
                                        aria-label="Anterior"
                                        title="Anterior (←)"
                                    >
                                        ←
                                    </button>

                                    <button
                                        type="button"
                                        onClick={next}
                                        disabled={!nav.hasNext}
                                        className={[
                                            "rounded-2xl px-3 py-2 text-sm font-semibold shadow-sm transition",
                                            nav.hasNext
                                                ? "bg-white/85 text-zinc-900 hover:bg-white dark:bg-zinc-950/70 dark:text-zinc-50"
                                                : "cursor-not-allowed bg-white/50 text-zinc-400 dark:bg-zinc-950/40 dark:text-zinc-600",
                                        ].join(" ")}
                                        aria-label="Siguiente"
                                        title="Siguiente (→)"
                                    >
                                        →
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-2xl bg-white/85 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-white dark:bg-zinc-950/70 dark:text-zinc-50"
                                        aria-label="Cerrar"
                                        title="Cerrar (Esc)"
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
                                    {isReport ? "Informe" : "Evento"}
                                </span>

                                {current.category ? (
                                    <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
                                        {current.category}
                                    </span>
                                ) : null}

                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{formatDate(current.date)}</span>
                            </div>

                            <Dialog.Title className="mt-3 text-xl font-semibold tracking-tight">
                                {current.title}
                            </Dialog.Title>

                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                Tip: usa <span className="rounded-md bg-zinc-900/5 px-2 py-0.5 font-semibold dark:bg-white/10">←</span>{" "}
                                <span className="rounded-md bg-zinc-900/5 px-2 py-0.5 font-semibold dark:bg-white/10">→</span>{" "}
                                para navegar y <span className="rounded-md bg-zinc-900/5 px-2 py-0.5 font-semibold dark:bg-white/10">Esc</span>{" "}
                                para cerrar.
                            </p>

                            {current.location ? (
                                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                                    Ubicación: <span className="font-medium">{current.location}</span>
                                </p>
                            ) : null}

                            {current.description ? (
                                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                                    {current.description}
                                </p>
                            ) : null}

                            {isReport ? (
                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{current.fileSize ?? ""}</p>

                                        {current.fileUrl ? (
                                            <button
                                                type="button"
                                                onClick={onCopyLink}
                                                className="rounded-xl bg-zinc-900/5 px-3 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-900/10 dark:bg-white/10 dark:text-zinc-100 dark:hover:bg-white/15"
                                            >
                                                {copied ? "Copiado" : "Copiar enlace"}
                                            </button>
                                        ) : null}

                                        {copyError ? (
                                            <span className="text-xs font-medium text-rose-600 dark:text-rose-300">
                                                No se pudo copiar
                                            </span>
                                        ) : null}
                                    </div>

                                    {current.fileUrl ? (
                                        <a
                                            href={current.fileUrl}
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
