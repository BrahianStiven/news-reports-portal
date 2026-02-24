import ResourceBanner from "./ResourceBanner";
import ResourceList from "./ResourceList";
import ResourceDetailsDialog from "./ResourceDetailsDialog";
import { useEffect, useMemo, useState } from "react";

const tabs = [
  { key: "informe", label: "Informes" },
  { key: "evento", label: "Eventos" },
];

export default function ResourceTabs({ activeTab, onTabChange, banner, allItems, items, referenceDate }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const collection = useMemo(() => items, [items]);

  function openDetails(resource) {
    const idx = collection.findIndex((x) => x.id === resource.id);
    setSelectedIndex(idx >= 0 ? idx : 0);
    setOpen(true);
  }

  function closeDetails() {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    if (collection.length === 0) {
      setOpen(false);
      return;
    }
    if (selectedIndex < 0) setSelectedIndex(0);
    if (selectedIndex >= collection.length) setSelectedIndex(collection.length - 1);
  }, [open, collection.length, selectedIndex]);


  return (
    <section className="space-y-6">
      <ResourceBanner banner={banner} activeTab={activeTab} allItems={allItems} />

      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {tabs.map((t) => {
            const active = t.key === activeTab;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onTabChange(t.key)}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                ].join(" ")}
                aria-pressed={active}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">{items.length} resultados</p>
      </div>

      <ResourceList
        activeTab={activeTab}
        items={items}
        referenceDate={referenceDate}
        onSelect={openDetails}
      />

      <ResourceDetailsDialog
        open={open}
        onClose={closeDetails}
        collection={collection}
        index={selectedIndex}
        onNavigate={(nextIndex) => setSelectedIndex(nextIndex)}
        fallbackImage={banner.imageUrl}
      />
    </section>
  );
}
