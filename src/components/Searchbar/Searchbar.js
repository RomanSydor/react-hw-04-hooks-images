import React, { useState } from "react";
import s from "./Searchbar.module.css";

const Saerchbar = ({ search }) => {
  const [keyword, setKeyword] = useState("");

  const onKeywordChange = (e) => {
    setKeyword(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(keyword);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="keyword"
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onKeywordChange}
        />
      </form>
    </header>
  );
};

export default Saerchbar;
