import React from "react";
import './index.scss';
import avate from "&/avatar.png";
import smallImg from "&/small9k533x300.webp";
const bizhi = require("&/bizhi.jpg");

export const Photo = () => {
  console.log(avate);
  console.log(smallImg);
  return (
    <div className="photo-wrap">
      <img url="avate2" src="avate" alt="" />
    </div>
  )
}