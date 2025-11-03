import { useState, useEffect } from "react";
import s from "./Filters.module.scss";

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    year: "",
  });

  // 🔄 Викликає колбек при зміні будь-якого фільтра
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={s.filters}>
      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">All genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="History">History</option>
        <option value="Romance">Romance</option>
        <option value="Science">Science</option>
      </select>

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={filters.author}
        onChange={handleChange}
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={filters.year}
        onChange={handleChange}
      />
    </div>
  );
}
