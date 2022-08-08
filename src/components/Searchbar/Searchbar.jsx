import React from 'react';
import PropTypes from 'prop-types';

import { SearchForm } from 'components/SearchForm/SearchForm';
import css from 'components/Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <SearchForm onSubmit={onSubmit} />
    </header>
  );
};

Searchbar.propTypes = {
  onsubmit: PropTypes.func,
};
