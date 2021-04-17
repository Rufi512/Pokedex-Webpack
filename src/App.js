import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './context/store'
import TopBar from './components/TopBar'
import {ListPokemon} from './pages/ListPokemon'
import PokemonInformation from './pages/PokemonInformation'
import {NotFound} from './pages/NotFound'
import {savePokemonToLocalStorage} from './context/localStorage'

export const App = () =>{

store.subscribe(() => {
  savePokemonToLocalStorage({
    pokemons: store.getState().pokemons
  })
})

   return(
      <Provider store={store}>
      <Router>
         <TopBar/>
         <Switch>
         <Route exact path="/" component={ListPokemon}/>
         <Route exact path="/info/:pokemon" component={PokemonInformation}/>
         <Route component={NotFound}/>
         </Switch>
      </Router>
      </Provider>
   )
}
