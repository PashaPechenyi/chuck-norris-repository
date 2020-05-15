import React, { Fragment, useState } from "react";
import "./FavouriteLink.scss";

const FavouriteLink = () => {
  const [isOpenFavourite, setIsOpenFavourite] = useState(false);

  // Show || hide favouriteJokes block and change an icon
  const showFavouriteJokes = () => {
    document.body.querySelector(".favouriteJokes").classList.toggle("displayB");

    document.body.classList.toggle("overflowH");

    setIsOpenFavourite(!isOpenFavourite);
  };

  return (
    <Fragment>
      <div className="favourite">
        <div className="mobileSpan">
          <img
            src={
              isOpenFavourite
                ? require("../../../images/closeIcon.png")
                : require("../../../images/menuIcon.png")
            }
            onClick={showFavouriteJokes}
            alt="icon"
          />

          <span onClick={showFavouriteJokes}>Favourite</span>
        </div>

        <span className="desktopSpan">Favourite</span>
      </div>

      <div className="favourite_backgroundBlock"></div>

      {isOpenFavourite && (
        <div className="opacityBlock" onClick={showFavouriteJokes}></div>
      )}
    </Fragment>
  );
};

export default FavouriteLink;
