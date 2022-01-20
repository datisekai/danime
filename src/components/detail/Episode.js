import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { scrollTop } from "../../handle/ScrollTop";
import "./episode.css";

const Episode = () => {
  const [items, setItems] = useState({});
  const { id, episode } = useParams();
  const api = `https://api.aniapi.com/v1/episode?anime_id=${id}&number=${episode}&source=dreamsub&locale=it`;

  useEffect(() => {
    getAnime(api);
    scrollTop();
  }, [episode]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setItems(data.data.documents[0]);
      });
  };

  console.log(items);

  return (
    <div className="episode">
      <video src={items.video} controls title={items.title || 'Anime'}></video>
    </div>
  );
};

export default Episode;
