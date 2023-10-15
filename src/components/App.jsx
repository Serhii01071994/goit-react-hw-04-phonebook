import React, { useState, useEffect } from 'react';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ContactFilter } from './ContactFilter/ContactFilter';
import css from './App.module.css';


export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJson = localStorage.getItem('contacts');
    if (contactsJson) {
      setContacts(JSON.parse(contactsJson));
    }
  }, []);
 
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handlAddContact = contactData => {
    const { name } = contactData;
    if (contacts.some(contact => contact.name === name)) {
      alert(`Contact ${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contactData,
    };
    setContacts(prevContacts => [...prevContacts, newContact],
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase() );
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter(
    contact => typeof contact.name === 'string' &&
      contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <PhoneBook handlAddContact={handlAddContact} />
      <h2 className={css.title}>Contacts</h2>
      <ContactFilter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
