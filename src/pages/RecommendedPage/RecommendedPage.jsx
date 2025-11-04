import { useState } from "react";
import Filters from "../../components/Filters/Filters";
import Recommended from "../../components/Recommended/Recommended";
import s from "./RecommendedPage.module.scss";

export default function RecommendedPage() {
  const [filters, setFilters] = useState({ title: "", author: "" });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className={s.container}>
      <Filters filters={filters} onChange={handleFilterChange} />
      <Recommended filters={filters} />
    </div>
  );
}
