import portalData from "../../data/data.json";
import { useMemo, useState } from "react";
import { applyResourceFilters, buildResourceStats, getAllCategories } from "../../lib/resources";
import TopBar from "./TopBar";
import StatsStrip from "./StatsStrip";
import ResourceTabs from "./ResourceTabs";

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
      <TopBar
        siteName={metadata.site_name}
        lastUpdate={metadata.last_update}
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
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <StatsStrip stats={stats} />

        <ResourceTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          banner={banner}
          items={filtered}
        />
      </main>
    </div>
  );
}
