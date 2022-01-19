import React from "react";
import Loading from "../loading/Loading";
import "./traller.css";

const Traller = ({ anime,load }) => {
  
  return (
    <div className="traller">
      {load ? <Loading/> : (anime.trailer_url ? (
        <iframe
          width="100%"
          height="400"
          src={anime.trailer_url || "https://www.youtube.com/embed/_uTvqumZBqY"}
          title={
            anime.titles &&
            (anime.titles.en || anime.titles.it || anime.titles.jp || "Anime")
          }
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         
        ></iframe>
      ) : (<img className="banner-traller" src={anime.banner_image || anime.cover_image}></img>))}
    </div>
  );
};

export default Traller;
