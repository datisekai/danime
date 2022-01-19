import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import "./recomment.css";

const Recomment = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const api = `https://api.aniapi.com/v1/random/anime/20/true`;

  useEffect(() => {
    getAnime(api);
  }, [id]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setItems(data.data);
        setLoading(false);
      });
  };

  return (
    <div className="recommend">
      <h1 className="recommend-title">Recommend</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="recommend-list" id="scroll-recommend">
          {items &&
            items.map((item, index) => (
              <Link to={`/anime/${item.id}`} key={index}>
                <div className="recommend-item">
                  <img src={item.cover_image || ""}></img>
                  <h3 style={{ color: `${item.cover_color || "white"}` }}>
                    {item.titles &&
                      (item.titles.en || item.titles.it || items.titles.jp)}
                  </h3>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Recomment;
