import s from "./Filters.module.scss";
import Icon from "../Icon/Icon";

export default function Filters({ filters, onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.field}>
        <label htmlFor="title" className={s.label}>
          Title:
        </label>
        <div className={s.inputWrapper}>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter book title"
            value={filters.title}
            onChange={handleInputChange}
            className={s.input}
            autoComplete="off"
          />
          {filters.title && (
            <button
              type="button"
              onClick={() => onChange({ title: "" })}
              className={s.clearBtn}
            >
              <Icon name="close" width={16} height={16} color="#9A9A9A" />
            </button>
          )}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="author" className={s.label}>
          Author:
        </label>
        <div className={s.inputWrapper}>
          <input
            id="author"
            name="author"
            type="text"
            placeholder="Enter author name"
            value={filters.author}
            onChange={handleInputChange}
            className={s.input}
            autoComplete="off"
          />
          {filters.author && (
            <button
              type="button"
              onClick={() => onChange({ author: "" })}
              className={s.clearBtn}
            >
              <Icon name="close" width={16} height={16} color="#9A9A9A" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
