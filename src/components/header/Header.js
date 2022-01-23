import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginStore } from "../global/User";
import { signOut } from "firebase/auth";
import { authentication } from "../login/Firebase";
import swal from "sweetalert";
import "../grid.css";

import "./header.css";
import { useSideBar } from "../global/Bar";
const Header = () => {
  const user = useLoginStore((state) => state.user);
  const setUser = useLoginStore((state) => state.setUser);
  const navigate = useNavigate();
  const sidebar = useSideBar(state => state.sidebar)
  const setSideBar = useSideBar(state => state.setSidebar)
console.log(user);
  const menuFeed = useRef();
  const handleSignOut = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to leave this page?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        signOut(authentication)
          .then(() => {
            swal("SignOut successfull", "See you later", "success");
            setUser(undefined);
          })
          .catch((error) => {
            swal("Oops!", "Something went wrong!", "error");
          });
      }
    });
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

          <div className="tool-header">
            <i className={`search-icon ${sidebar ? 'fas fa-times' : 'fas fa-chevron-down'}`} onClick={() => setSideBar(sidebar)}></i>

            {user ? (
              <div className="avatar">
                <img className="avatar-login" src={user.photoURL}></img>
                <ul className="menu-user" ref={menuFeed}>
                  <li className="menu-user__item first-list">
                    {user && (user.email || user.uid || 'Invalid Email')}
                  </li>

                  <Link to="/newsfeed">
                    <li className="menu-user__item">News Feed</li>
                  </Link>

                  <li
                    className="menu-user__item"
                    onClick={() => handleSignOut()}
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <i className="setting-icon fas fa-users-cog settings"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
