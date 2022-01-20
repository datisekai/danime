import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../global/User";
import { signOut } from "firebase/auth";
import { authentication } from "../login/Firebase";
import swal from 'sweetalert';
import "../grid.css";

import "./header.css";
const Header = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    navigate(`/search/${value}`);
    setValue("");
  };

  const handleSignOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to leave this page?",
      icon: "warning",
      buttons:true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        signOut(authentication).then(() => {
          swal("SignOut successfull", "See you later", "success");
          setUser(undefined)
        }).catch((error) => {
          swal("Oops!", "Something went wrong!", "error");
        });
      }
    });
  }
    

  console.log(user);
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
            {user ? (
              <div className="avatar">
                <img className="avatar-login" src={user.photoURL}></img>
                <ul className="menu-user">
                  <li className="menu-user__item">{user && user.email}</li>
                  <li className="menu-user__item" onClick={() => handleSignOut()}>Sign Out</li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <i className="fas fa-users-cog settings"></i>
              </Link>
            )}
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
