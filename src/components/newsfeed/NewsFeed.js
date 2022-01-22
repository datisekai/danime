import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { scrollTop } from "../../handle/ScrollTop";
import Title from "../../handle/Title";

import "./newsfeed.css";

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const api = `https://api.aniapi.com/v1/random/anime/2/true`;
  const [count, setCount] = useState(0);

  useEffect(() => {
    scrollTop()
  },[])

  useEffect(() => {
    getAnime(api);
  }, [count]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setNews([...news, ...data.data]);
      });
  };

  return (
    <div className="news">
        <InfiniteScroll
          dataLength={news.length}
          next={() => setCount(count + 1)}
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
      <div className="news-list">
        <Title Title="News Feed - Danime" />
        {news &&
          news.map((item) => (
            <div className="news-item" key={item.id}>
              <div className="news-item__info">
                <img src={item.cover_image}></img>
                <div className="news-item__info-author">
                  <h2 style={{color:`${item.cover_color || 'white'}`}}>
                    {(item.titles &&
                      (item.titles.en || item.titles.it || item.titles.jp)) ||
                      "Anime"}
                  </h2>
                  <p>
                    {(item.descriptions &&
                      (item.descriptions.en ||
                        item.descriptions.it ||
                        item.descriptions.jp)) ||
                      "No description"}
                  </p>
                </div>
              </div>
              <div className="news-item__video">
                {item.trailer_url ? (
                  <iframe
                    width="100%"
                    height="350"
                    src={
                      item.trailer_url ||
                      "https://www.youtube.com/embed/_uTvqumZBqY"
                    }
                    title={
                      item.titles &&
                      (item.titles.en ||
                        item.titles.it ||
                        item.titles.jp ||
                        "Anime")
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ) : (
                  <img
                    className="news-traller"
                    src={item.banner_image || item.cover_image}
                  ></img>
                )}
                <div className="news-item__tool">
                  <div className="news-item__tool-heart">
                    <i className="fas fa-heart"></i>
                    <p>{item.score | item.id}</p>
                  </div>

                  <Link to={`/anime/${item.id}`}>
                  <div className="news-item__tool-open">
                  <i className="fas fa-film"></i>
                    <p>Watch</p>
                  </div></Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
