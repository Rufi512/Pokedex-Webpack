import React from "react"
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

export const typePokemon = (type,px) => {

    switch (type) {
      case "grass":
        return <GrassIcon width={px} height={px} />;
        break;

      case "bug":
        return <BugIcon width={px} height={px} />;
        break;

      case "dark":
        return <DarkIcon width={px} height={px} />;
        break;

      case "dragon":
        return <DragonIcon width={px} height={px} />;
        break;

      case "electric":
        return <ElectricIcon width={px} height={px} />;
        break;

      case "fairy":
        return <FairyIcon width={px} height={px} />;
        break;

      case "fighting":
        return <FightingIcon width={px} height={px} />;
        break;

      case "fire":
        return <FireIcon width={px} height={px} />;
        break;

      case "flying":
        return <FlyingIcon width={px} height={px} />;
        break;

      case "ghost":
        return <GhostIcon width={px} height={px} />;
        break;

      case "ground":
        return <GroundIcon width={px} height={px} />;
        break;

      case "ice":
        return <IceIcon width={px} height={px} />;
        break;

      case "normal":
        return <NormalIcon width={px} height={px} />;
        break;

      case "poison":
        return <PoisonIcon width={px} height={px} />;
        break;

      case "psychic":
        return <PsychicIcon width={px} height={px} />;
        break;

      case "rock":
        return <RockIcon width={px} height={px} />;
        break;

      case "steel":
        return <SteelIcon width={px} height={px} />;
        break;

      case "water":
        return <WaterIcon width={px} height={px} />;
        break;

      default:
        return "";
    }
  };


export const eggsPokemons = (name) =>{
 
  switch(name){
  
    case 'monster':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Monster</p>;
      break;

    case 'humanlike':
      return <p className={'egg-'+name}  style={{background: '#333333'}}>Human-Like</p>;
      break;

    case 'water1':
      return <p className={'egg-'+name}  style={{background: '#333333'}}>Amphibian</p>;
      break;

    case 'water2':
      return <p className={'egg-'+name}  style={{background: '#333333'}}>Fish</p>;
      break;

    case 'water3':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Marine</p>;
      break;

    case 'plant':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Bug</p>;
      break;

    case 'bug':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Bug</p>;
      break;

    case 'mineral':
      return <p className={'egg-'+name} style={{background:'#333333'}}>Mineral</p>;
      break;

    case 'flying':
      return <p className={'egg-'+name} style={{background:'#333333'}}>Flying</p>;
      break;

    case 'amorphous':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Amorphous</p>;
      break;

    case 'field':
      return <p className={'egg-'+name} style={{background:'#333333'}}>Field</p>;
      break;

    case 'fairy':
      return <p className={'egg-'+name} style={{background:'#333333'}}>Fairy</p>;
      break;

    case 'ditto':
      return <p className={'egg-'+name} style={{background:'#333333'}}>Ditto</p>;
      break;

    case 'grass':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Grass</p>;
      break;

    case 'ground':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Ground</p>;
      break;

    case 'dragon':
      return <p className={'egg-'+name} style={{background: '#333333'}}>Dragon</p>;
      break;

    default: 
      return <p style={{background:'#333333'}}>Unknown</p>

  }
}



