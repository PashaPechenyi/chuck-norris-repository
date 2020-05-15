import { ADD_JOKE } from "../../constants";

export const addJoke = (id, joke) => {
  return {
    type: ADD_JOKE,
    id,
    joke,
  };
};
