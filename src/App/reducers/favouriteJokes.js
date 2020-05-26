import { ADD_FAVOURITE_JOKE } from "../../constants";
import { load } from "redux-localstorage-simple";

let JOKES = load({ namespace: "favourite-jokes" });

if (!JOKES || !JOKES.favouriteJokes || !JOKES.favouriteJokes.length) {
  JOKES = {
    favouriteJokes: [],
  };
}

const favouriteJokes = (state = JOKES.favouriteJokes, { id, joke, type }) => {
  switch (type) {
    case ADD_FAVOURITE_JOKE: {
      //проверяем есть лм в блоке FavouriteJokes шутка с данным id
      let favouriteNumber = state.findIndex((joke) => joke.id === id);

      // если ее нет- добавить, если есть- удалить
      if (favouriteNumber === -1) {
        state.unshift(joke);
      } else {
        state.splice(favouriteNumber, 1);
      }

      return [...state];
    }

    default:
      return state;
  }
};

export default favouriteJokes;
