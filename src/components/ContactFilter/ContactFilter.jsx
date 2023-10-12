import css from './ContactFilter.module.css';

export const ContactFilter = ({ filter, handleFilterChange }) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search contacts"
    value={filter}
    onChange={handleFilterChange}
  />
);
