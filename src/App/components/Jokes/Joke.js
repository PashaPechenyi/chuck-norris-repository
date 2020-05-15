import React from "react";
import PropTypes from "prop-types";

import "./Jokes.scss";

const Joke = ({
  id,
  category = [],
  updated_at,
  value,
  url,
  isFavourite,
  change_isFavourite,
}) => {
  const updateDate = Date.parse(updated_at);
  const dateNow = new Date();
  const date = Math.floor((dateNow - updateDate) / 1000 / 60 / 60);

  return (
    <div className="joke">
      <i
        className={isFavourite ? "fas fa-heart" : "far fa-heart"}
        onClick={() => {
          change_isFavourite(id);
        }}
      />

      <div className="commentIcon">
        <img src={require("../../../images/commentIcon.png")} alt="chat" />
      </div>

      <div className="jokeTextBlock">
        <p className="jokeId">
          ID:
          <a href={url} data-title="sdfdsf">
            {id}
            <i className="fas fa-external-link-alt"></i>
          </a>
        </p>

        <p className="jokeText">{value}</p>

        <span className="jokeDate">
          Last update: <b>{date} hours ago</b>
        </span>
        {category.length !== 0 && (
          <span className="jokeTrueCategory">{category[0]}</span>
        )}
      </div>
    </div>
  );
};

Joke.propTypes = {
  id: PropTypes.string,
  catgory: PropTypes.string,
  updated_at: PropTypes.string,
  value: PropTypes.string,
  url: PropTypes.string,
  isFavourite: PropTypes.bool,
};
Joke.defaultProps = {
  id: "",
  catgory: "",
  updated_at: "",
  value: "",
  url: "",
  isFavourite: false,
};

export default Joke;
