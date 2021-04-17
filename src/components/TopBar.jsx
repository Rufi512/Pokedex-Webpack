import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getSuggestions,getPokemonFavortitesData } from "./API.jsx";
import SearchIcon from "../assets/icons/search.svg";
import BoxIcon from "../assets/icons/box.svg";
import MenuIcon from "../assets/icons/menu.svg";
import CloseIcon from "../assets/icons/close.svg";

const TopBar = ({ pokemons }) => {
  useEffect(() => {
    console.log("call", pokemons);
    console.log(pokemons);
  }, []);

  const sidebar = useRef(null);
  const inputMobile = useRef(null);
  let history = useHistory();
  const [toSearch, setToSearch] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites,setFavorites] = useState([])
  const [names, setNames] = useState([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      const res = await getSuggestions();
      setSuggestions(res);
    };

    const loadFavorites = async () =>{
      let favs = []
      for(const el of pokemons){
        const res = await getPokemonFavortitesData(el)
        if(res !== 'Error'){
        favs.push(res)
        }
      }
      setFavorites(favs)
    }

    loadSuggestions();
    loadFavorites();
  }, [pokemons]);

  const showSuggestions = (name) => {
    setNames([]);
    if (suggestions.length > 0) {
      const searchNormalize = name.toLowerCase();

      setOnSearch(false);

      for (const pokemon of suggestions) {
        const nameNormalize = pokemon.name.toLowerCase();
        if (
          nameNormalize
            .substring(0, searchNormalize.split("").length)
            .includes(searchNormalize) === true
        ) {
          setNames((olds) => [...olds, pokemon.name]);
        }
      }
    }
  };

  const showBar = (show) => {
    if (show) {
      sidebar.current.style.transform = "translateX(0%)";
    } else {
      sidebar.current.style.transform = "translateX(-100%)";
    }
  };

  return (
    <>
      <div className="top-bar">
        <MenuIcon
          style={{ padding: "4px", cursor: "pointer" }}
          onClick={(e) => {
            showBar(true);
          }}
        />
        <h2
          style={{ cursor: "pointer", fontSize: "21px" }}
          onClick={(e) => {
            history.push("/");
          }}
        >
          Pokedex
        </h2>
      </div>

      <div ref={sidebar} className="sidebar">
        <CloseIcon
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            showBar(false);
          }}
        />
        <div className="container">
          <div className="pokemon-search">
            <div className="search-bar">
              <SearchIcon />{" "}
              <input
                ref={inputMobile}
                type="text"
                onChange={(e) => {
                  showSuggestions(e.target.value);
                  setToSearch(e.target.value);
                  if (e.target.value !== "") {
                    setOnSearch(true);
                  } else {
                    setOnSearch(false);
                  }
                }}
                placeholder="Search the pokemon with name!"
                value={toSearch || ""}
              />
            </div>
            <div className="container-suggestions">
              {names.map((el, i) => {
                return (
                  <div
                    key={i}
                    onClick={(e) => {
                      setToSearch(e.target.innerText);
                      inputMobile.current.focus();
                      setNames([]);
                    }}
                  >
                    <SearchIcon />
                    <p style={{ textTransform: "capitalize" }}>{el}</p>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={(e) => {
                const name = toSearch.toLowerCase()
                window.location.replace("/info/" + name)
                sidebar.current.style.transform = "translateX(0%)";

              }}
            >
              Search
            </button>
          </div>
          <div className="favorites">
            {pokemons ? (
              <div>
              <BoxIcon height="38" /><p>Pokemons guardados</p>
              </div>
            ) : (
              <div>
                <BoxIcon height="50" />
                <p style={{ margin: "auto", maxWidth: "210px" }}>
                  Your favorite pokemon will appear here, try adding one!
                </p>
              </div>
            )}


              {
                favorites.map((el,i)=>{
                  return(
                     <div className="view-favorite" key={i} onClick={(e)=>{window.location.replace("/info/" + el.id)}} >
                       <img src={el.sprite} alt={el.name}/>
                       <p>{el.name}</p>
                     </div>
                    )
                })
              }
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);