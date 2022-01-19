import React, { useEffect, useState } from "react";
import { WATCH_API } from "../../api/constant";
import { scrollTop } from "../../handle/ScrollTop";
import { Link, useParams } from "react-router-dom";
import "./infodetail.css";

const Infodetail = ({ anime }) => {
  const [items, setItems] = useState([]);

  const { id, episode } = useParams();

  const api = anime && `${WATCH_API}${id}`;

  useEffect(() => {
    getAnime(api);
    scrollTop();
  }, [episode]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => setItems(data));
  };

  return (
    <div className="info-detail">
      <h1
        className="info-detail__title"
        style={{ color: `${anime.cover_color || "white"}` }}
      >
        {(anime.titles &&
          (anime.titles.en || anime.titles.it || anime.titles.jp)) ||
          "Anime"}
      </h1>
      <p className="info-detail__date">{anime.end_date}</p>
      <ul className="info-detail__genres">
        {anime.genres &&
          anime.genres.map((item, index) => (
            <li className="genres-item" key={index}>
              {item}
            </li>
          ))}
      </ul>
      <p className="info-detail__desc"></p>
      {items.status_code === 200 && items.data.documents && (
        <div className="episodes">
          <h2 className="episodes-title">Episodes</h2>
          <div className="episodes-list">
            {items.data.documents &&
              items.data.documents.map((item, index) => (
                <Link to={`/anime/${anime.id}/${item.number}`} key={index}>
                  <button className="episodes-btn">{item.number}</button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Infodetail;
