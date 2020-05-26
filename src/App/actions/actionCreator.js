import { ADD_FAVOURITE_JOKE } from "../../constants";

export const addFavouriteJoke = (id, joke) => {
  return {
    type: ADD_FAVOURITE_JOKE,
    id,
    joke,
  };
};
