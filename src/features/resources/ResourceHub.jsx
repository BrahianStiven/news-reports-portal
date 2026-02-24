import portalData from "../../data/data.json";
import { useMemo, useState } from "react";
import { applyResourceFilters, buildResourceStats, getAllCategories } from "../../lib/resources";
import TopBar from "./TopBar";
import StatsStrip from "./StatsStrip";
import ResourceTabs from "./ResourceTabs";
import FilterDock from "./FilterDock";

export default function ResourceHub() {
  const { metadata, banner, items } = portalData;

  const categories = useMemo(() => getAllCategories(items), [items]);

  const [activeTab, setActiveTab] = useState("informe"); // "informe" | "evento"
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    return applyResourceFilters(items, {
      activeTab,
      query,
      category,
      fromDate,
      toDate,
    });
  }, [items, activeTab, query, category, fromDate, toDate]);

  const stats = useMemo(() => buildResourceStats(items, metadata), [items, metadata]);

  return (
    <div className="min-h-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      <TopBar siteName={metadata.site_name} lastUpdate={metadata.last_update} />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      >
        <div className="flex items-start gap-6">
          <FilterDock
            query={query}
            onQueryChange={setQuery}
            categories={categories}
            category={category}
            onCategoryChange={setCategory}
            fromDate={fromDate}
            onFromDateChange={setFromDate}
            toDate={toDate}
            onToDateChange={setToDate}
            onClearFilters={() => {
              setQuery("");
              setCategory("all");
              setFromDate("");
              setToDate("");
            }}
            resultsCount={filtered.length}
          />

          <div className="min-w-0 flex-1">
            <StatsStrip stats={stats} />

            <ResourceTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              banner={banner}
              allItems={items}
              items={filtered}
              referenceDate={metadata.last_update}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
