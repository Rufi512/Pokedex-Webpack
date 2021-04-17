import { createStore } from "redux";
import { loadStoragePokemons } from "./localStorage";

const initialState = {
	pokemons: loadStoragePokemons().pokemons,
};

const reducerPokemons = (state = initialState, action) => {

	if (action.type === "ADD_FAVORITE") {
		return {
			...state,
			pokemons: state.pokemons.concat(action.id),
		};
	}

	if (action.type === "REMOVE_FAVORITE") {
        const pokemonList = state.pokemons.filter(el => el !== action.id)
		return {
			...state,
			pokemons: pokemonList,
		};
	}

	return state;
};

export default createStore(reducerPokemons);
