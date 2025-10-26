import { useEffect, useState } from "react";
import { api } from "../../api/axiosConfig";

export default function RecommendedPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {books.length > 0 ? (
              books.map((b) => (
                <li key={b._id}>
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

          <div>
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
