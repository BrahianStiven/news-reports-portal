import ThemeToggle from "../../ui/ThemeToggle";

export default function TopBar({ siteName, lastUpdate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/65 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/55">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-400 text-white shadow-sm">
            EM
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {siteName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Última actualización: {lastUpdate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
