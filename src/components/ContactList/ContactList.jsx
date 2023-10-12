import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
      <li className={css.item} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.button}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);
