import { useEffect, useState } from "react";
import { api } from "../../api/axiosConfig";
import s from "./Recommended.module.scss";

export default function Recommended() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🧠 Визначаємо ліміт залежно від ширини екрана
  const getLimitByScreen = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 10; // desktop (2 рядки по 5)
    if (width >= 1024) return 8; // tablet (2 рядки по 4)
    if (width >= 768) return 6; // small tablet (2 рядки по 3)
    return 2; // mobile (1 рядок по 2)
  };

  useEffect(() => {
    const handleResize = () => {
      const newLimit = getLimitByScreen();
      setLimit(newLimit);
      setPage(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🧠 Завантаження даних
  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const res = await api.get("/books/recommend", {
          params: { page, limit },
        });
        const booksData = Array.isArray(res.data.results)
          ? res.data.results
          : [];
        setBooks(booksData);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching recommended books:", err);
        setBooks([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [page, limit]);

  return (
    <section className={s.wrapper}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className={s.list}>
            {books.length > 0 ? (
              books.map((b) => (
                <li key={b._id} className={s.book}>
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    width="120"
                    height="180"
                    loading="lazy"
                  />
                  <h3>{b.title}</h3>
                  <p>{b.author}</p>
                </li>
              ))
            ) : (
              <p>No books available</p>
            )}
          </ul>

          <div className={s.pagination}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
