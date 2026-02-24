import EventCard from "./EventCard";
import ReportCard from "./ReportCard";

export default function ResourceList({ activeTab, items, referenceDate }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        No hay resultados con los filtros actuales.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((x) =>
        activeTab === "informe" ? (
          <ReportCard key={x.id} report={x} referenceDate={referenceDate} />
        ) : (
          <EventCard key={x.id} event={x} />
        )
      )}
    </div>
  );
}
