import React from "react";

import chuck from "../../images/chuck.gif";

import "./style.scss";

const JokeBlock = ({ joke, isSending }) => {
  const renderJoke = () => {
    return joke ? (
      <p className="joke-block__text">{joke.value}</p>
    ) : (
      <p className="joke-block__pre-text">Сlick on one of the buttons</p>
    );
  };

  const renderLoader = () => (
    <img className="joke-block__loader" src={chuck} alt="loader" />
  );

  return (
    <div className="joke-block">
      {isSending ? renderLoader() : renderJoke()}
    </div>
  );
};

export default JokeBlock;
