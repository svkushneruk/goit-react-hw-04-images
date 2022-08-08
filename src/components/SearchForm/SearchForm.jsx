import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import css from 'components/SearchForm/SearchForm.module.css';

export function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    onSubmit(searchQuery);

    setSearchQuery('');
  };

  return (
    <form className={css.SearchForm} onSubmit={handleFormSubmit}>
      <button type="submit" className={css.SearchFormButton}>
        <span className={css.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={css.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={handleFormChange}
        value={searchQuery}
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
