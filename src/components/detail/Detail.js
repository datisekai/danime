import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SEARCH_ID } from "../../api/constant";
import { setLocal } from "../../handle/Local";
import { scrollTop } from "../../handle/ScrollTop";
import "./detail.css";
import "../grid.css";
import Traller from "./Traller";
import Recomment from "./Recomment";
import Infodetail from "./Infodetail";
import Episode from "./Episode";
import Title from "../../handle/Title";
import Comments from "./Comments";
import { useLoginStore } from "../global/User";

const Detail = () => {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = useLoginStore((state) => state.user);
  const { episode } = useParams();

  const api = `${SEARCH_ID}${id}`;

  useEffect(() => {
    getAnime(api);
    scrollTop();
  }, [id]);

  useEffect(() => {
    detail.id &&
      setLocal({
        id: detail.id,
        img: detail.cover_image,
        color: detail.cover_color,
        title: detail.titles.en,
      });
  }, [detail]);

  const getAnime = (api) => {
    fetch(api)
      .then((respon) => respon.json())
      .then((data) => {
        setDetail(data.data);
        setLoading(false);
      });
  };

  return (
    <div className="grid wide">
      <Title
        Title={
          (detail.titles &&
            (detail.titles.en || detail.titles.it || detail.titles.jp)) ||
          "Detail Anime"
        }
      />
      <div className="view">
        <div className="detail">
          {episode ? <Episode /> : <Traller anime={detail} load={loading} />}
          <Recomment />
        </div>

        <Infodetail anime={detail} />
        <Comments />
      </div>
    </div>
  );
};

export default Detail;
