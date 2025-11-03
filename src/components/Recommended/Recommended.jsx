import { useEffect, useState } from "react";
import { api } from "../../api/axiosConfig";
import s from "./Recommended.module.scss";
import Icon from "../Icon/Icon";

export default function Recommended() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getLimitByScreen = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 10;
    if (width >= 768) return 8;
    return 2;
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
          <div className={s.top}>
            <h2 className={s.title}>Recommended</h2>
            <div className={s.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={s.pageBtn}
              >
                <Icon
                  name="left"
                  width={20}
                  height={20}
                  color={page <= 1 ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"}
                />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className={s.pageBtn}
              >
                <Icon
                  name="right"
                  width={20}
                  height={20}
                  color={
                    page >= totalPages ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"
                  }
                />
              </button>
            </div>
          </div>

          <ul className={s.list}>
            {books.length > 0 ? (
              books.map((b) => (
                <li key={b._id} className={s.book}>
                  <img
                    className={s.img}
                    src={b.imageUrl}
                    alt={b.title}
                    width="120"
                    height="180"
                    loading="lazy"
                  />
                  <h3 className={s.bookTitle}>{b.title}</h3>
                  <p className={s.bookAuthor}>{b.author}</p>
                </li>
              ))
            ) : (
              <p>No books available</p>
            )}
          </ul>
        </>
      )}
    </section>
  );
}
