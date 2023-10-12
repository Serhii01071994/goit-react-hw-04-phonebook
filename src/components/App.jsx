import React, { Component } from 'react';
import { PhoneBook } from './PhoneBook/PhoneBook';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { ContactFilter } from './ContactFilter/ContactFilter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };
  componentDidMount() {
    const contactsJson = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contactsJson) ?? [];
    this.setState({ contacts: contactsParse });
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      const contactsJson = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', contactsJson);
    }
  }

  handlAddContact = contactData => {
    const { contacts } = this.state;
    const { name } = contactData;

    if (contacts.some(contact => contact.name === name)) {
      alert(`Contact ${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      ...contactData,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <PhoneBook handlAddContact={this.handlAddContact} />
        <h2 className={css.title}>Contacts</h2>
        <ContactFilter
          filter={filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
