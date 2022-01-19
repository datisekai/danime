import React, { useEffect, useState } from "react";
import "./search.css";
import "../grid.css";
import { Link, useParams } from "react-router-dom";
import { SEARCH_TITLE } from "../../api/constant";
import Loading from "../loading/Loading";

const Search = () => {
  const { query } = useParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  const api = `${SEARCH_TITLE}${query}`;

  useEffect(() => {
    getAnime(api);
  }, [query]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setResults(data.data.documents);
        setLoading(false);
      });
  };

  const items =
    results &&
    results.map((item) => ({
      id: item.id,
      img: item.cover_image,
      color: item.cover_color,
      title: item.titles.en,
    }));


  return (
    <div className="grid wide">
      <div className="search">
        <h1 className="search-title">Search Result Of {query} </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="search-list">
            {items &&
              items.map((item) => (
                <Link to={`/anime/${item.id}`} key={item.id}>
                  <div className="search-item">
                    <img src={item.img} className="search-item__img"></img>
                    <h3
                      className="search-item__title"
                      style={{ color: `${item.color}` }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
