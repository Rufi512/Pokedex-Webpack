import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import PokemonContext from "../context/Pokemon/PokemonContext";
import ArrowIcon from "../assets/icons/arrowLeft.svg";
import BugIcon from "../assets/icons/types/bug.svg";
import DarkIcon from "../assets/icons/types/dark.svg";
import DragonIcon from "../assets/icons/types/dragon.svg";
import ElectricIcon from "../assets/icons/types/electric.svg";
import FairyIcon from "../assets/icons/types/fairy.svg";
import FightingIcon from "../assets/icons/types/fighting.svg";
import FireIcon from "../assets/icons/types/fire.svg";
import FlyingIcon from "../assets/icons/types/flying.svg";
import GhostIcon from "../assets/icons/types/ghost.svg";
import GrassIcon from "../assets/icons/types/grass.svg";
import GroundIcon from "../assets/icons/types/ground.svg";
import IceIcon from "../assets/icons/types/ice.svg";
import NormalIcon from "../assets/icons/types/normal.svg";
import PoisonIcon from "../assets/icons/types/poison.svg";
import PsychicIcon from "../assets/icons/types/psychic.svg";
import RockIcon from "../assets/icons/types/rock.svg";
import SteelIcon from "../assets/icons/types/steel.svg";
import WaterIcon from "../assets/icons/types/water.svg";

export const ListPokemon = (props) => {
  const { pokemons, getList, getPokemon } = useContext(PokemonContext);

  

  return (
    <React.Fragment>
      <h2>Pokedex</h2>
    </React.Fragment>
  );
};
