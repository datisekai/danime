import React, { useEffect, useState } from "react";

import "./anime.css";
import "../grid.css";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Title from "../../handle/Title";


const Animes = ({ anime, upPage}) => {
  const items = anime.map((item) => ({
    id: item.id,
    img: item.cover_image,
    color: item.cover_color,
    title: item.titles.en,
  }));

  return (
    <div className="grid wide">
      <Title title='Anime'/>
      <div className="anime">
        <h1 className="anime-title">Anime</h1>
        
        <InfiniteScroll
          dataLength={items.length}
          next={() => upPage()}
          hasMore={true}
          loader={<div className="dots-loading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          
        >
          <div className="anime-list">
            {items.map((item) => (
              <Link to={`/anime/${item.id}`} key={item.id}>
                <div className="anime-item">
                  <img src={item.img} className="anime-item__img"></img>
                  <h3
                    className="anime-item__title"
                    style={{ color: `${item.color}` }}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Animes;
