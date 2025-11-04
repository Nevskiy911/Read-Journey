// import { useEffect, useState } from "react";
// import { api } from "../../api/axiosConfig";
// import s from "./Recommended.module.scss";
// import Icon from "../Icon/Icon";

// export default function Recommended({ filters }) {
//   const [books, setBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(getLimitByScreen);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const getLimitByScreen = () => {
//     const width = window.innerWidth;
//     if (width >= 1440) return 10;
//     if (width >= 768) return 8;
//     return 2;
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const newLimit = getLimitByScreen();
//       setLimit(newLimit);
//       setPage(1);
//     };

//     // handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!limit) return; // чекаємо поки limit буде визначений

//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/books/recommend", {
//           params: {
//             page,
//             limit,
//             title: filters.title || undefined,
//             author: filters.author || undefined,
//           },
//         });

//         const booksData = Array.isArray(res.data.results)
//           ? res.data.results
//           : [];

//         setBooks(booksData);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching recommended books:", err);
//         setBooks([]);
//         setTotalPages(1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [page, limit, filters]);

//   return (
//     <section className={s.wrapper}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className={s.top}>
//             <h2 className={s.title}>Recommended</h2>
//             <div className={s.pagination}>
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page <= 1}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="left"
//                   width={20}
//                   height={20}
//                   color={page <= 1 ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"}
//                 />
//               </button>

//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page >= totalPages}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="right"
//                   width={20}
//                   height={20}
//                   color={
//                     page >= totalPages ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <ul className={s.list}>
//             {books.length > 0 ? (
//               books.map((b) => (
//                 <li key={b._id} className={s.book}>
//                   <img
//                     className={s.img}
//                     src={b.imageUrl}
//                     alt={b.title}
//                     width="120"
//                     height="180"
//                     loading="lazy"
//                   />
//                   <h3 className={s.bookTitle}>{b.title}</h3>
//                   <p className={s.bookAuthor}>{b.author}</p>
//                 </li>
//               ))
//             ) : (
//               <p>No books available</p>
//             )}
//           </ul>
//         </>
//       )}
//     </section>
//   );
// }
// import { useEffect, useState } from "react";
// import { api } from "../../api/axiosConfig";
// import s from "./Recommended.module.scss";
// import Icon from "../Icon/Icon";

// export default function Recommended({ filters }) {
//   const [books, setBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(getLimitByScreen()); // ✅ одразу визначаємо при першому рендері
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // ✅ Функція визначення ліміту винесена вище, щоб не створювалась при кожному рендері
//   function getLimitByScreen() {
//     const width = window.innerWidth;
//     if (width >= 1440) return 10;
//     if (width >= 768) return 8;
//     return 2;
//   }

//   // ✅ При зміні розміру екрана — оновлюємо ліміт і скидаємо сторінку
//   useEffect(() => {
//     const handleResize = () => {
//       const newLimit = getLimitByScreen();
//       setLimit((prev) => {
//         if (prev !== newLimit) {
//           setPage(1); // reset only if changed
//         }
//         return newLimit;
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // ✅ Фетч книжок (враховує фільтри, пагінацію, ліміт)
//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const params = {
//           page,
//           limit,
//         };

//         // передаємо фільтри лише якщо вони непорожні
//         if (filters?.title) params.title = filters.title;
//         if (filters?.author) params.author = filters.author;

//         const res = await api.get("/books/recommend", { params });

//         const booksData = Array.isArray(res.data.results)
//           ? res.data.results
//           : [];

//         setBooks(booksData);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching recommended books:", err);
//         setBooks([]);
//         setTotalPages(1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // фетчимо лише коли limit визначений
//     if (limit) fetchBooks();
//   }, [page, limit, filters]);

//   // ✅ якщо змінюється фільтр — повертаємось на першу сторінку
//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   return (
//     <section className={s.wrapper}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className={s.top}>
//             <h2 className={s.title}>Recommended</h2>
//             <div className={s.pagination}>
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page <= 1}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="left"
//                   width={20}
//                   height={20}
//                   color={page <= 1 ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"}
//                 />
//               </button>

//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page >= totalPages}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="right"
//                   width={20}
//                   height={20}
//                   color={
//                     page >= totalPages ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <ul className={s.list}>
//             {books.length > 0 ? (
//               books.map((b) => (
//                 <li key={b._id} className={s.book}>
//                   <img
//                     className={s.img}
//                     src={b.imageUrl}
//                     alt={b.title}
//                     width="120"
//                     height="180"
//                     loading="lazy"
//                   />
//                   <h3 className={s.bookTitle}>{b.title}</h3>
//                   <p className={s.bookAuthor}>{b.author}</p>
//                 </li>
//               ))
//             ) : (
//               <p>No books available</p>
//             )}
//           </ul>
//         </>
//       )}
//     </section>
//   );
// }
// import { useEffect, useState } from "react";
// import { api } from "../../api/axiosConfig";
// import s from "./Recommended.module.scss";
// import Icon from "../Icon/Icon";

// export default function Recommended({ filters }) {
//   const [books, setBooks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(null);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Функція визначає кількість елементів на сторінці
//   const getLimitByScreen = () => {
//     const width = window.innerWidth;
//     if (width >= 1440) return 10; // Desktop → 2 рядки по 5
//     if (width >= 768) return 8; // Tablet → 2 рядки по 4
//     return 2; // Mobile → 1 рядок по 2
//   };

//   // 🔹 Визначаємо limit при монтуванні
//   useEffect(() => {
//     const initialLimit = getLimitByScreen();
//     setLimit(initialLimit);
//   }, []);

//   // 🔹 Обробка зміни розміру вікна
//   useEffect(() => {
//     const handleResize = () => {
//       const newLimit = getLimitByScreen();
//       setLimit((prev) => {
//         if (prev !== newLimit) {
//           setPage(1);
//           return newLimit;
//         }
//         return prev;
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // 🔹 Отримання даних
//   useEffect(() => {
//     if (!limit) return; // чекаємо, поки limit буде визначено

//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get("/books/recommend", {
//           params: {
//             page,
//             limit,
//             title: filters.title || undefined,
//             author: filters.author || undefined,
//           },
//         });

//         const booksData = Array.isArray(res.data.results)
//           ? res.data.results
//           : [];

//         setBooks(booksData);
//         setTotalPages(res.data.totalPages || 1);
//       } catch (err) {
//         console.error("Error fetching recommended books:", err);
//         setBooks([]);
//         setTotalPages(1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [page, limit, filters]);

//   // 🔹 Кнопки пагінації
//   const handlePrev = () => setPage((p) => Math.max(1, p - 1));
//   const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

//   return (
//     <section className={s.wrapper}>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className={s.top}>
//             <h2 className={s.title}>Recommended</h2>
//             <div className={s.pagination}>
//               <button
//                 onClick={handlePrev}
//                 disabled={page <= 1}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="left"
//                   width={20}
//                   height={20}
//                   color={page <= 1 ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"}
//                 />
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={page >= totalPages}
//                 className={s.pageBtn}
//               >
//                 <Icon
//                   name="right"
//                   width={20}
//                   height={20}
//                   color={
//                     page >= totalPages ? "rgba(249, 249, 249, 0.2)" : "#f9f9f9"
//                   }
//                 />
//               </button>
//             </div>
//           </div>

//           <ul className={s.list}>
//             {books.length > 0 ? (
//               books.map((b) => (
//                 <li key={b._id} className={s.book}>
//                   <img
//                     className={s.img}
//                     src={b.imageUrl}
//                     alt={b.title}
//                     width="120"
//                     height="180"
//                     loading="lazy"
//                   />
//                   <h3 className={s.bookTitle}>{b.title}</h3>
//                   <p className={s.bookAuthor}>{b.author}</p>
//                 </li>
//               ))
//             ) : (
//               <p>No books available</p>
//             )}
//           </ul>
//         </>
//       )}
//     </section>
//   );
// }
import { useEffect, useState } from "react";
import { api } from "../../api/axiosConfig";
import s from "./Recommended.module.scss";
import Icon from "../Icon/Icon";
import BookModal from "../BookModal/BookModal";

export default function Recommended({ filters }) {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
    if (!limit) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await api.get("/books/recommend", {
          params: {
            page,
            limit,
            title: filters.title || undefined,
            author: filters.author || undefined,
          },
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

    fetchBooks();
  }, [page, limit, filters]);

  const handleAddToLibrary = (book) => {
    console.log("Added to library:", book);
    // TODO: dispatch(addBookToLibrary(book)) або API-запит
    setSelectedBook(null);
  };

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
                <li
                  key={b._id}
                  className={s.book}
                  onClick={() => setSelectedBook(b)}
                >
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

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAdd={handleAddToLibrary}
        />
      )}
    </section>
  );
}
