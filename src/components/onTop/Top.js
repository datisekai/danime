import React from "react";
import { scrollTop } from "../../handle/ScrollTop";
import "./top.css";
const Top = () => {
  return <i className="on-top fas fa-arrow-circle-up" onClick={() => scrollTop()}></i>;
};

export default Top;
