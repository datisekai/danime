import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../grid.css";

import "./header.css";
const Header = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    navigate(`/search/${value}`);
    setValue("");
  };
  return (
    <header>
      <div className="grid wide">
        <div className="header">
          <Link to="/">
            <img
              src="https://i.imgur.com/ENGTaK0.png"
              className="header-img"
            ></img>
          </Link>

          <form onSubmit={() => handleSubmit()}>
            <input
              placeholder="Search something..."
              className="header-search"
              value={value}
              onChange={(e) => handleInput(e)}
            />
            <i className="fas fa-users-cog settings"></i>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
