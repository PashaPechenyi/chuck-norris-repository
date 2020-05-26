import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { addFavouriteJoke } from "../../actions/actionCreator";

import Form from "../../components/Form/Form";
import Joke from "../../components/Jokes/Joke";
import FavouriteLink from "../../components/FavouriteLink/FavouriteLink";

class App extends Component {
  state = {
    activeSelectRadio: "random",
    activeCategory: "",
    searchValue: "",
    jokes: [],
  };

  change_activeSelectRadio = ({ target: { value } }) => {
    this.setState({
      activeSelectRadio: value,
    });
  };

  change_activeCategory = (value) => {
    this.setState({
      activeCategory: value,
    });
  };

  change_searchValue = ({ target: { value } }) => {
    this.setState({
      searchValue: value,
    });
  };

  componentDidMount() {
    this.fetchData("https://api.chucknorris.io/jokes/random");
  }

  // make fetch request with url=fetchURL
  fetchData = (fetchURL) => {
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        this.addJoke(data);
      });
  };

  // adding new jokes to the MAIN block of jokes
  addJoke = (data) => {
    const { favouriteJokes } = this.props;

    //Проверяем есть ли добавляемая шутка уже в блоке избранных если есть то отметить как избранную
    const check_isFavourite = (data) => {
      if (favouriteJokes.findIndex(({ id }) => id === data.id) !== -1) {
        data.isFavourite = true;
      } else {
        data.isFavourite = false;
      }
    };

    // если шуток несколько проверяем каждую шутку из массива на избранность и добавляем их
    if (!!data.result) {
      if (data.result.length === 0) {
        alert("Nothing was found!");
      }
      for (let i of data.result) {
        check_isFavourite(i);
      }

      this.setState({
        jokes: [...data.result],
      });
    } else {
      // делаем тоже самое но для 1 шутки
      check_isFavourite(data);

      this.setState({
        jokes: [data],
      });
    }
  };

  // Adding new jokes by click on the button 'Get a joke'
  addJokesByButton = (event) => {
    event.preventDefault();
    const { searchValue, activeCategory, activeSelectRadio } = this.state;

    switch (activeSelectRadio) {
      case "random":
        this.fetchData("https://api.chucknorris.io/jokes/random");
        break;

      case "categories":
        this.fetchData(
          `https://api.chucknorris.io/jokes/random?category=${activeCategory}`
        );
        break;

      case "search":
        if (searchValue.length >= 3 && searchValue.length <= 120) {
          this.fetchData(
            `https://api.chucknorris.io/jokes/search?query=${searchValue}`
          );
        } else {
          alert("The number of characters must be between 3 and 120");
        }
        break;

      default:
        this.fetchData("https://api.chucknorris.io/jokes/random");
    }

    this.setState({
      searchValue: "",
    });
  };

  change_isFavourite = (id) => {
    const { addFavouriteJoke } = this.props;

    this.setState(({ jokes }) => {
      const number = jokes.findIndex((joke) => joke.id === id);
      const activeJoke = jokes[number];

      // add jokes in favouriteJokes block
      addFavouriteJoke(id, activeJoke);

      if (number !== -1) {
        activeJoke.isFavourite = !activeJoke.isFavourite;
      }
      return {
        jokes: jokes,
      };
    });
  };

  render() {
    const {
      activeSelectRadio,
      activeCategory,
      searchValue,
      jokes,
    } = this.state;
    const { favouriteJokes } = this.props;

    return (
      <Fragment>
        <main className="main">
          <div className="main_wrapper">
            <Form
              activeSelectRadio={activeSelectRadio}
              activeCategory={activeCategory}
              searchValue={searchValue}
              change_activeSelectRadio={this.change_activeSelectRadio}
              change_activeCategory={this.change_activeCategory}
              change_searchValue={this.change_searchValue}
              addJoke={this.addJokesByButton}
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
                      change_isFavourite={this.change_isFavourite}
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
                    change_isFavourite={this.change_isFavourite}
                  />
                )
              )}
            </div>
          </div>

          <FavouriteLink />
        </main>
      </Fragment>
    );
  }
}

export default connect(
  (store) => ({
    favouriteJokes: store.favouriteJokes,
  }),
  { addFavouriteJoke }
)(App);
