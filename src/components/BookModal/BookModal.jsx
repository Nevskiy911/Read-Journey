import { useEffect } from "react";
import s from "./BookModal.module.scss";
import Icon from "../Icon/Icon";

export default function BookModal({ book, onClose, onAdd }) {
  // Закриття по клавіші Escape
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!book) return null;

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>
          <Icon name="close" width={18} height={18} color="#fff" />
        </button>

        <div className={s.content}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={s.img}
            width="150"
            height="220"
          />
          <div className={s.info}>
            <h2 className={s.title}>{book.title}</h2>
            <p className={s.author}>by {book.author}</p>
            <p className={s.desc}>{book.description || "No description"}</p>

            <button className={s.addBtn} onClick={() => onAdd(book)}>
              Add to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
