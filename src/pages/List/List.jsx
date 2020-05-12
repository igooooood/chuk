import React from "react";

import Button from "../../components/Button/Button";

import "./styles.scss";

const List = ({ list, removeJoke, clearAllJokes }) => {
  const handleRemoveJoke = event => {
    const jokeId = event.target.getAttribute("data-id");
    removeJoke(jokeId, list);
  };

  return (
    <div className="wrapper">
      {list.length > 0 ? (
        <>
          <ul className="list">
            {list.map(item => {
              return (
                <li className="list__item" key={item.id}>
                  <span className="list__item-text">{item.value}</span>
                  <button
                    data-id={item.id}
                    onClick={handleRemoveJoke}
                    className="list__item-btn"
                  >
                    del
                  </button>
                </li>
              );
            })}
          </ul>
          <Button onClick={clearAllJokes}>clear all</Button>
        </>
      ) : (
        <p className="placeholder-text">
          You don’t have any favorite jokes yet, but you can add them
        </p>
      )}
    </div>
  );
};

export default List;
