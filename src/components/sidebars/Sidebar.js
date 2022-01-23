import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSideBar } from "../global/Bar";
import { useLoginStore } from "../global/User";
import swal from "sweetalert";
import "./sidebar.css";
import { authentication } from "../login/Firebase";
import { signOut } from "firebase/auth";
const Sidebar = () => {
  const navigate = useNavigate();
  const statusSideBar = useSideBar(state => state.sidebar)
  const setSideBar = useSideBar(state => state.setSidebar)
  const user = useLoginStore(state => state.user)
  const setUser = useLoginStore(state => state.setUser)
  const sidebar = useRef();
  const home = useRef();
  const search = useRef();
  const newsfeed = useRef();
  const login = useRef();
  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        if (home && search && sidebar && newsfeed) {
          home.current.style.color = "#007BFF";
          search.current.style.color = "black";
          login.current.style.color = "black";
          newsfeed.current.style.color = "black";
        }
        break;
      case "/search":
        if (home && search && sidebar && newsfeed) {
          home.current.style.color = "black";
          search.current.style.color = "#007BFF";
          login.current.style.color = "black";
          newsfeed.current.style.color = "black";
        }
        break;
      case "/login":
        if (home && search && sidebar && newsfeed) {
          home.current.style.color = "black";
          search.current.style.color = "black";
          login.current.style.color = "#007BFF";
          newsfeed.current.style.color = "black";
        }
        break;
      case "/newsfeed":
        if (home && search && sidebar && newsfeed) {
          home.current.style.color = "black";
          search.current.style.color = "black";
          login.current.style.color = "black";
          newsfeed.current.style.color = "#007BFF";
        }
        break;
      default:
        if (home && search && sidebar && newsfeed) {
          home.current.style.color = "black";
          search.current.style.color = "black";
          login.current.style.color = "black";
          newsfeed.current.style.color = "black";
        }
        break;
    }
  }, [window.location.pathname]);

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
    <div className="sidebars" ref={sidebar} style={{visibility:`${statusSideBar ? 'visible' : 'hidden'}`}}>
      <i
        className="fas fa-home"
        title="home"
        ref={home}
        onClick={() => navigate("/")}
      ></i>
      <i
        className="fas fa-newspaper"
        title="News feed"
        ref={newsfeed}
        onClick={() => navigate("/newsfeed")}
      ></i>
      <i
        className="fas fa-search"
        title="Searchs"
        ref={search}
        onClick={() => navigate("/search")}
      ></i>
      <i
        className="fas fa-sign-in-alt"
        title="Login"
        ref={login}
        onClick={() => user ? handleSignOut() : navigate("/login")}
      ></i>
      <a href="https://www.facebook.com/datisekai/">
        <i className="fab fa-facebook-square"></i>
      </a>
      <a href="github.com/datisekai">
        <i className="fab fa-github-square"></i>
      </a>
      <i
        className="fas fa-window-close"
        onClick={() => {
          setSideBar(true)
        }}
      ></i>
    </div>
  );
};

export default Sidebar;
