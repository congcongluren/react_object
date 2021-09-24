import React from "react";
import './index.scss';
import avate from "&/img/avatar.png";
import smallImg from "&/img/small9k533x300.webp";
const bizhi = require("&/img/bizhi.jpg");

export const Photo = () => {
  console.log(bizhi);
  return (
    <div className="photo-wrap">
      <img src={avate} alt="" />
      <img src={smallImg} alt="" />
      <img src={bizhi.default} alt="" />
    </div>
  )
}