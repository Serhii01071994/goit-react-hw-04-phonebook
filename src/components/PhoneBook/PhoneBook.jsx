import { Component } from 'react';
import css from './PhoneBook.module.css';

export class PhoneBook extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handlAddContact(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div className={css.container}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label className={css.label}>
            Name
            <input
              className={css.input}
              onChange={this.handleInputChange}
              value={this.state.name}
              type="text"
              name="name"
              required
            />
          </label>
          <label className={css.label}>
            Number
            <input
              className={css.input}
              onChange={this.handleInputChange}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="[\+]?[\d\s\(\)-]+"
              required
            />
          </label>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
