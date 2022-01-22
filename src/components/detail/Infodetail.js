import React, { useEffect, useState } from "react";
import { WATCH_API } from "../../api/constant";
import { scrollTop } from "../../handle/ScrollTop";
import { Link, useParams } from "react-router-dom";
import "./infodetail.css";

const Infodetail = ({ anime }) => {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  const [page, setPage] = useState(1);

  const [documents, setDocuments] = useState([]);

  const [load, setLoad] = useState(true);

  const { episode } = useParams();

  let api = anime && `${WATCH_API}${id}&page=${page}`;

  useEffect(() => {
    scrollTop();
  }, []);

  useEffect(() => {
    getAnime(api);
  }, [page]);

  useEffect(() => {
    if (items.data && items.data.current_page < items.data.last_page) {
      setPage(items.data.current_page + 1);
    }
  });

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setItems(data);
        data.status_code === 200 && setDocuments([...documents, ...data.data.documents]);
        setLoad(false);
      });
  };

  const setBg = (item) => (item == episode ? "active-blue" : "");

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
            {documents &&
              documents.map((item, index) => (
                <Link to={`/anime/${anime.id}/${item.number}`} key={index}>
                  <button
                    className={`${setBg(item.number)} episodes-btn`}
                  >
                    {item.number}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Infodetail;
