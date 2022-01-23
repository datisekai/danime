import React, { useEffect, useState } from "react";
import { MAIN_API } from "./api/constant";
import Header from "./components/header/Header";
import Slider from "./components/slide/slide";
import Animes from "./components/animes/Animes";
import AOS from 'aos'
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Search from "./components/search/Search";
import Detail from "./components/detail/Detail";
import Recently from "./components/recently/Recently";
import Login from "./components/login/Login";
import { authentication } from "./components/login/Firebase";
import { useLoginStore } from "./components/global/User";
import { onAuthStateChanged } from "firebase/auth";
import NewsFeed from "./components/newsfeed/NewsFeed";
import PageSearch from "./components/search/pageSearch";
import { scrollTop } from "./handle/ScrollTop";
import Error from "./components/error/Error";
import Sidebar from "./components/sidebars/Sidebar";
import Top from "./components/onTop/Top";

const App = () => {
  const [anime, setAnime] = useState([]);
  const [page, setPage] = useState(1);
  const user = useLoginStore(state => state.user)
  const setUser = useLoginStore(state => state.setUser)
  const api = `${MAIN_API}${page}`;
  const [scrollY, setScrollY] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init();
  })

 useEffect(() => {
   scrollTop()
 },[])


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
      <Sidebar/>
      
      <div className="container">
        <Routes>
          <Route exact path="/" element={<><Slider anime={anime}/><Recently/> <Top/><Animes anime={anime} upPage={upPage}/></>}></Route>
          <Route path="/search/:query" element={<Search/>}></Route>
          <Route path="/search/" element={<PageSearch/>}></Route>
          <Route path="/anime/:id/" element={<Detail/>}></Route>
          <Route path="/anime/:id/:episode" element={<Detail/>}></Route>
          <Route path="/login/:id" element={!user ? <Login/> : <Error/>}></Route>
          <Route path="/login/" element={!user ? <Login/> : <Error/>}></Route>
          <Route path="/newsfeed" element={<><NewsFeed/> <Top/></>}></Route>
          <Route path="*" element={<Error/>}></Route>
        </Routes>
    
      </div>
    </div>
  );
};

export default App;