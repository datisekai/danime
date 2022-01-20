import React, { useEffect, useState } from "react";
import { MAIN_API } from "./api/constant";
import Header from "./components/header/Header";
import Slider from "./components/slide/slide";
import Animes from "./components/animes/Animes";
import AOS from 'aos'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Search from "./components/search/Search";
import Detail from "./components/detail/Detail";
import Recently from "./components/recently/Recently";
import Login from "./components/login/Login";
import { authentication } from "./components/login/Firebase";
import { useLoginStore } from "./components/global/User";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const user = useLoginStore(state => state.user)
  const setUser = useLoginStore(state => state.setUser)
  const api = `${MAIN_API}${page}`;
  useEffect(() => {
    AOS.init();
  })

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser(user)
      } else {
       setUser(undefined)
      }
    });
  },[])

  useEffect(() => {
    getAnime(api);
  }, [page]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => setAnime([...anime,...data.data.documents]));
  };

  const upPage = () => {
    setPage(page + 1)
  }

  return (
    <div className="App" id="scroll-main">
      <Header />
      <div className="container">
        <Routes>
          <Route exact path="/" element={<><Slider anime={anime}/><Recently/><Animes anime={anime} upPage={upPage}/></>}></Route>
          <Route path="/search/:query" element={<Search/>}></Route>
          <Route path="/anime/:id/" element={<Detail/>}></Route>
          <Route path="/anime/:id/:episode" element={<Detail/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
    
      </div>
    </div>
  );
};

export default App;