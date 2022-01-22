import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css'
const Sidebar = () => {
    const navigate = useNavigate()
    const sidebar = useRef()

    const home = useRef()
    const search = useRef()
    const login = useRef()
    const newsfeed = useRef()
    useEffect(() => {
        switch(window.location.pathname)
        {
            case '/':
                home.current.style.color = '#007BFF'
                search.current.style.color = 'black'
                login.current.style.color = 'black'
                newsfeed.current.style.color = 'black'
                break
            case '/search':
                home.current.style.color = 'black'
                search.current.style.color = '#007BFF'
                login.current.style.color = 'black'
                newsfeed.current.style.color = 'black'
                break
            case '/login':
                home.current.style.color = 'black'
                search.current.style.color = 'black'
                login.current.style.color = '#007BFF'
                newsfeed.current.style.color = 'black'
                break
            case '/newsfeed':
                home.current.style.color = 'black'
                search.current.style.color = 'black'
                login.current.style.color = 'black'
                newsfeed.current.style.color = '#007BFF'
                break
            default:
                home.current.style.color = 'black'
                search.current.style.color = 'black'
                login.current.style.color = 'black'
                newsfeed.current.style.color = 'black'
                break
        }
    },[window.location.pathname])


  return <div className='sidebars' ref={sidebar}>
      <i class="fas fa-home" title='home' ref={home} onClick={() => navigate('/')}></i>
     <i className="fas fa-newspaper" title='News feed' ref={newsfeed} onClick={() => navigate('/newsfeed')}></i>
     <i className="fas fa-search" title='Searchs' ref={search} onClick={() => navigate('/search')}></i>
     <i className="fas fa-sign-in-alt" title='Login' ref={login} onClick={() => navigate('/login')}></i>
     <a href='https://www.facebook.com/datisekai/'><i className="fab fa-facebook-square"></i></a>
     <a  href='github.com/datisekai'><i className="fab fa-github-square"></i></a>
     <i className="fas fa-window-close" onClick={() => {
         sidebar.current.style.display = 'none'
     }}></i>
  </div>;
};

export default Sidebar;
