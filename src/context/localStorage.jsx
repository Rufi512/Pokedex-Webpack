export function loadStoragePokemons(){
	const serializedState = localStorage.getItem('pokemons')
	if(serializedState === null){
		return {pokemons:[]};
	}else{
		return JSON.parse(serializedState)
	}
}

export const savePokemonToLocalStorage = (pokemon)=>{
const initialSave = JSON.stringify(pokemon)
localStorage.setItem('pokemons',initialSave)
}
