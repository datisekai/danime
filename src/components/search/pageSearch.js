import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../handle/Title";
const PageSearch = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/search/${value}`);
    setValue("");
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search-form">
      <Title Title='Search - Danime'/>
      <div className="search-box">
          <h1>Search Anime</h1>
        <form onSubmit={() => handleSubmit()}>
          <input
            placeholder="Search something..."
            className="header-search"
            value={value}
            onChange={(e) => handleInput(e)}
          />
        </form>
        <Link to='/'><i className="search-close-btn far fa-window-close"></i></Link>
      </div>
    </div>
  );
};

export default PageSearch;
