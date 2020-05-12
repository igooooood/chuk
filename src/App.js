import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import Main from "./pages/Main/Main";
import List from "./pages/List/List";

import Navigation from "./components/Navigation/Navigation";

import "./styles.scss";

export default function App() {
  const [list, setList] = useState([]);
  const [joke, setJoke] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [generationTimerId, setGenerationTimerId] = useState(null);

  useEffect(() => {
    let listJokes = JSON.parse(localStorage.getItem("listJokes"));
    listJokes = Array.isArray(listJokes) ? listJokes : [];
    setList(listJokes);
  }, []);

  const getJoke = () => {
    setIsSending(true);
    fetch("https://api.chucknorris.io/jokes/random")
      .then(response => response.json())
      .then(addPropertyIsFavorite)
      .then(setJoke)
      .then(() => setIsSending(false))
      .catch(console.log);
  };

  const addPropertyIsFavorite = joke => {
    joke.isFavorite = isFavoritJoke(joke, list);
    return joke;
  };

  const continuousGenerationJokes = () => {
    getJoke();
    setGenerationTimerId(setInterval(getJoke, 3000));
  };

  const stopGenerationJokes = () => {
    clearInterval(generationTimerId);
    setGenerationTimerId(null);
  };

  const isFavoritJoke = (joke, list) => {
    if (joke) {
      const currentJoke = list.find(item => item.id === joke.id);
      return !!currentJoke;
    }

    return false;
  };

  const addJoke = (joke, list) => {
    if (joke && !joke.isFavorite) {
      joke.isFavorite = true;
      if (list.length >= 10) {
        list.splice(0, 1);
      }
      list.push(joke);
      setJoke({ ...joke });
      setList([...list]);
      saveListInLS(list);
    }
  };

  const removeJoke = (id, list) => {
    if (joke && joke.id === id) {
      joke.isFavorite = false;
      setJoke({ ...joke });
    }
    const updatedList = list.filter(item => item.id !== id);
    setList(updatedList);
    saveListInLS(updatedList);
  };

  const clearAllJokes = () => {
    if (joke && joke.isFavorite) {
      joke.isFavorite = false;
      setJoke({ ...joke });
    }
    setList([]);
    saveListInLS([]);
  };

  const saveListInLS = list => {
    localStorage.setItem("listJokes", JSON.stringify(list));
  };

  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Chuck's jokes</h1>
          <Navigation location={useLocation} />
        </header>
        <Switch>
          <Route path="/list">
            <List
              removeJoke={removeJoke}
              list={list}
              clearAllJokes={clearAllJokes}
            />
          </Route>
          <Route path="/">
            <Main
              joke={joke}
              list={list}
              isSending={isSending}
              generationTimerId={generationTimerId}
              getJoke={getJoke}
              addJoke={addJoke}
              removeJoke={removeJoke}
              isFavoritJoke={isFavoritJoke}
              continuousGenerationJokes={continuousGenerationJokes}
              stopGenerationJokes={stopGenerationJokes}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
