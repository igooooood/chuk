import React from "react";

import JokeBlock from "../../components/JokeBlock/JokeBlock";
import Button from "../../components/Button/Button";

import "./styles.scss";

const Main = ({
  joke,
  list,
  isSending,
  generationTimerId,
  getJoke,
  addJoke,
  removeJoke,
  isFavoritJoke,
  continuousGenerationJokes,
  stopGenerationJokes
}) => {
  const handleDeleteOrAdd = () => {
    isFavoritJoke(joke, list) ? removeJoke(joke.id, list) : addJoke(joke, list);
  };

  const handleContinuousGeneration = () => {
    generationTimerId ? stopGenerationJokes() : continuousGenerationJokes();
  };

  return (
    <div className="main">
      <JokeBlock joke={joke} isSending={isSending} />
      <Button className="main__button" onClick={getJoke}>
        get joke
      </Button>
      <Button className="main__button" onClick={handleContinuousGeneration}>
        {generationTimerId ? "stop" : "jokes without stopping"}
      </Button>
      <Button
        className="main__button"
        disabled={!joke}
        onClick={handleDeleteOrAdd}
      >
        {isFavoritJoke(joke, list) ? "delete from Favorite" : "add to Favorite"}
      </Button>
    </div>
  );
};

export default Main;
