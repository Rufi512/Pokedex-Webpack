import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getSuggestions, getPokemonFavortitesData } from "./API.jsx";
import SearchIcon from "../assets/icons/search.svg";
import BoxIcon from "../assets/icons/box.svg";
import MenuIcon from "../assets/icons/menu.svg";
import CloseIcon from "../assets/icons/close.svg";

const TopBar = ({ pokemons }) => {
  const sidebar = useRef(null);
  const inputMobile = useRef(null);
  let history = useHistory();
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toSearch,setToSearch] = useState("")
  const [names, setNames] = useState([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      const res = await getSuggestions();
      setSuggestions(res);
    };

    const loadFavorites = async () => {
      let favs = [];
      for (const el of pokemons) {
        const res = await getPokemonFavortitesData(el);
        if (res !== "Error") {
          favs.push(res);
        }
      }
      setFavorites([]);
      if (pokemons.length > 0) {
        setFavorites(favs);
      }
    };

    loadSuggestions();
    loadFavorites();
  }, [pokemons]);

  const showSuggestions = (name) => {
    setNames([]);
    if (suggestions.length > 0 && name !== ""){
      const searchNormalize = name.toLowerCase();
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

  const showSidebar = (show) => {
    if (show) {
      sidebar.current.style.transform = "translateX(0%)";
    } else {
      sidebar.current.style.transform = "translateX(-100%)";
    }
  };

  const searchPokemon = (e) => {
    e.preventDefault();
    const name = toSearch.toLowerCase();
    history.push("/info/" + name);
    showSidebar(false)
  };

  return (
    <>
      <div className="top-bar">
        <MenuIcon
          style={{padding: "8px 16px 9px 4px", cursor: "pointer" }}
          onClick={(e) => {
            showSidebar(true);
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
        <div className="container">
        <CloseIcon
          style={{padding: "8px 16px 9px 4px",cursor: "pointer", width:'20px',height:'20px',alignSelf:'flex-start',fill:'#000' }}
          onClick={(e) => {
            showSidebar(false);
          }}
        />
          <div className="pokemon-search">
            <form onSubmit={searchPokemon}>
              <div className="search-bar">
                <SearchIcon />{" "}
                <input
                  ref={inputMobile}
                  type="text"
                  onChange={(e) => {
                    showSuggestions(e.target.value);
                    setToSearch(e.target.value)
                  }}
                  placeholder="Search pokemon"
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
              <button type="submit">Search</button>
            </form>
          </div>

          {pokemons.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                background:'#ececec'
              }}
            >
              <BoxIcon height="38" style={{marginLeft:'10px'}} />
              <p style={{marginLeft:'10px'}}>Favorites pokemon</p>
            </div>
          ) : (
            <div className="fav-message">
              <BoxIcon height="50" />
              <p>Your favorites pokemon will appear here, try adding one!</p>
            </div>
          )}

          <div className="favorites-pokemon">
            {favorites.map((el, i) => {
              return (
                <div
                  className="view-favorite"
                  key={i}
                  onClick={(e) => {
                    history.push("/info/" + el.id);
                    showSidebar(false);
                  }}
                >
                  <img src={el.sprite} alt={el.name} />
                  <p>{el.name}</p>
                </div>
              );
            })}
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