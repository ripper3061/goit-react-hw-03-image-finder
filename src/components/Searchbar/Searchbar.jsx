// import PropTypes from 'prop-types';
import {
  SearchbarLayout,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearch } from 'react-icons/bi';

export const Searchbar = () => {
  return (
    <SearchbarLayout>
      <SearchForm>
        <SearchFormBtn type="submit">
          <BiSearch size="24" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarLayout>
  );
};
