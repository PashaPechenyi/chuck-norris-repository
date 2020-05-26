import React, { Fragment, useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { addFavouriteJoke } from "./actions/actionCreator";

import Form from "./components/Form/Form";
import Joke from "./components/Jokes/Joke";
import FavouriteLink from "./components/FavouriteLink/FavouriteLink";

const App = ({ addFavouriteJoke, favouriteJokes }) => {
  const [activeSelectRadio, setActiveSelectRadio] = useState("random");
  const change_activeSelectRadio = ({ target: { value } }) => {
    setActiveSelectRadio(value);
  };

  const [activeCategory, setActiveCategory] = useState("");
  const change_activeCategory = (value) => {
    setActiveCategory(value);
  };

  const [searchValue, setSearchValue] = useState("");
  const change_searchValue = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchData("https://api.chucknorris.io/jokes/random");
  }, []);

  // make fetch request with url=fetchURL
  function fetchData(fetchURL) {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        addJoke(data);
      });
  }

  // adding new jokes to the MAIN block of jokes
  function addJoke(data) {
    // если шуток несколько проверяем каждую шутку из массива на избранность и добавляем их
    if (!!data.result) {
      if (data.result.length === 0) {
        alert("Nothing was found!");
      } else {
        for (let i of data.result) {
          check_isFavourite(i);
        }
      }

      setJokes([...data.result]);
    } else {
      // делаем тоже самое но для 1 шутки
      check_isFavourite(data);

      setJokes([data]);
    }
  }

  //Проверяем есть ли добавляемая шутка уже в блоке избранных если есть то отметить как избранную
  function check_isFavourite(data) {
    if (favouriteJokes.findIndex(({ id }) => id === data.id) !== -1) {
      data.isFavourite = true;
    } else {
      data.isFavourite = false;
    }
  }

  // Adding new jokes by click on the button 'Get a joke'
  const addJokesByButton = (event) => {
    event.preventDefault();

    switch (activeSelectRadio) {
      case "random":
        fetchData("https://api.chucknorris.io/jokes/random");
        break;

      case "categories":
        fetchData(
          `https://api.chucknorris.io/jokes/random?category=${activeCategory}`
        );
        break;

      case "search":
        if (searchValue.length >= 3 && searchValue.length <= 120) {
          fetchData(
            `https://api.chucknorris.io/jokes/search?query=${searchValue}`
          );
        } else {
          alert("The number of characters must be between 3 and 120");
        }
        break;

      default:
        fetchData("https://api.chucknorris.io/jokes/random");
    }

    setSearchValue("");
  };

  const change_isFavouriteCallback = useCallback(
    async function change_isFavourite(id) {
      await setJokes((jokes) => {
        let number = jokes.findIndex((joke) => joke.id === id);
        const activeFavouriteJoke = jokes[number];

        // add jokes in favouriteJokes block
        addFavouriteJoke(id, activeFavouriteJoke);

        if (number !== -1) {
          activeFavouriteJoke.isFavourite = !activeFavouriteJoke.isFavourite;
        }

        return jokes;
      });
    },
    [setJokes, addFavouriteJoke]
  );

  return (
    <Fragment>
      <main className="main">
        <div className="main_wrapper">
          <Form
            activeSelectRadio={activeSelectRadio}
            activeCategory={activeCategory}
            searchValue={searchValue}
            change_activeSelectRadio={change_activeSelectRadio}
            change_activeCategory={change_activeCategory}
            change_searchValue={change_searchValue}
            addJoke={addJokesByButton}
          />

          <div className="jokes">
            {jokes.map(
              ({ categories, id, updated_at, url, value, isFavourite }) => {
                return (
                  <Joke
                    key={id}
                    id={id}
                    category={categories}
                    updated_at={updated_at}
                    value={value}
                    url={url}
                    isFavourite={isFavourite}
                    change_isFavourite={change_isFavouriteCallback}
                  />
                );
              }
            )}
          </div>
        </div>

        <div className="favouriteJokes">
          <div className="jokes">
            {favouriteJokes.map(
              ({ categories, id, updated_at, url, value, isFavourite }) => (
                <Joke
                  key={id}
                  id={id}
                  category={categories}
                  updated_at={updated_at}
                  value={value}
                  url={url}
                  isFavourite={isFavourite}
                  change_isFavourite={change_isFavouriteCallback}
                />
              )
            )}
          </div>
        </div>

        <FavouriteLink />
      </main>
    </Fragment>
  );
};

export default connect(
  (store) => ({
    favouriteJokes: store.favouriteJokes,
  }),
  { addFavouriteJoke }
)(App);
