export default function ResourceList({ activeTab, items }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x) => (
        <article
          key={x.id}
          className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{x.date}</p>
          <h3 className="mt-1 text-sm font-semibold">{x.title}</h3>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">{x.category}</p>

          {activeTab === "evento" && x.location ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{x.location}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
