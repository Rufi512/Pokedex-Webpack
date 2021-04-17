import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getPokemonData } from "../components/API";
import { ProgressCircle } from "../components/ProgressCircle";
import { typePokemon, eggsPokemons } from "../components/SomethingFunctions";
import HeightIcon from "../assets/icons/height.svg"
import WeightIcon from "../assets/icons/weight.svg"
import CaptureIcon from "../assets/icons/red.svg"
import ExperienceIcon from "../assets/icons/stars.svg"
import HpIcon from "../assets/icons/life.svg";
import SwordIcon from "../assets/icons/sword.svg";
import DefenseIcon from "../assets/icons/defense.svg";
import VelocityIcon from "../assets/icons/velocity.svg";
import FavIcon from "../assets/icons/fav.svg";
import HabitatIcon from "../assets/icons/habitat.svg";
import HappinessIcon from "../assets/icons/happiness.svg";
import EggsIcon from "../assets/icons/eggs.svg";

const PokemonInformation = ({props,pokemons,addPokemon,removePokemon}) => {
  
  const [pokemon, setPokemon] = useState({
    type: [],
    eggs: [],
    stats_normal: [],
    stats_special: [],
  });

  const [position, setPosition] = useState(1);

  const containerInformation = useRef(null);

  const lineSection = useRef(null);

  const selectors = useRef(null);

  const changeSection = (e) => {
    lineSection.current.style.left = `${e}px`;
  };

  useEffect(() => {
    const request = async () => {
      const res = await getPokemonData(props.match.params.pokemon);
      setPokemon(res);
    };
    request();
  }, [props]);

  useEffect(() => {
    const updateWindowDimensions = () => {
      lineSection.current.style.left =  `${selectors.current.children[position].offsetLeft}px`;
      lineSection.current.style.width = `${selectors.current.children[position].offsetWidth}px`;
    };

    updateWindowDimensions();

     window.addEventListener("resize", updateWindowDimensions);

     return () => window.removeEventListener("resize", updateWindowDimensions);
    
  }, [position,selectors]);

  if (!pokemon) {
    return (
      <div>
        <h1 style={{ color: "#000" }}>Information not found</h1>
      </div>
    );
  }

  const containerImg = (value) => {
    switch (value) {
      case "HP":
        return <HpIcon width="37.91%" height="38px" />;
      case "Attack":
        return <SwordIcon height="50px" />;
      case "Defense":
        return <DefenseIcon height="50px" />;
      case "Speed":
        return <VelocityIcon width="38%" height="50px" />;
    }
  };
  return (
    <div
      className={`card-container ${pokemon.type[0] ? pokemon.type[0] : ''}${pokemon.type[1] ? '-' + pokemon.type[1] : ''}`}
      style={{ display: pokemon.id ? "flex" : "none" }}
    >
      <div className="card">
        <div className="card-header">
          <div style={{ flexDirection: "row", marginTop: "10px" }}>
            <p style={{ margin: "0" }}>ID: #{pokemon.id}</p>{" "}
            <FavIcon
            fill={`${pokemons.find(el => el === pokemon.id) ? '#f92f7e' : '#232323'}`}
              style={{ width: "28px", height: "30px" , cursor:'pointer', transition:'all 0.3s ease'}}
              onClick={(e) => {
                  const pokemonFind = pokemons.find(el => el === pokemon.id)
                  if(pokemonFind){
                    removePokemon(pokemon.id)
                  }else{
                  addPokemon(pokemon.id);
                  }
              }}
            />{" "}
          </div>
          <div>
            <p
              style={{
                textTransform: "capitalize",
                fontSize: "24px",
                margin: "10px 0",
              }}
            >
              {pokemon.name}
            </p>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <div className="container-types">
              {pokemon.type[0] ? (
                <div>
                  <p>{pokemon.type[0]}</p> {typePokemon(pokemon.type[0], "22")}
                </div>
              ) : (
                ""
              )}
              {pokemon.type[1] ? (
                <div>
                  <p>{pokemon.type[1]}</p> {typePokemon(pokemon.type[1], "22")}
                </div>
              ) : (
                ""
              )}
            </div>
            <div style={{ maxWidth: "500px" }}>
              <p style={{ lineHeight: "24px" }}>{pokemon.description}</p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="selectors" ref={el => { console.log(el); selectors.current = el; }}>

            <div id="line-selector" ref={el => { console.log(el); lineSection.current = el; }}></div> 
            
            <p
              onClick={(e) => {
                containerInformation.current.style.transform = "translateX(0%)";
                changeSection(e.target.offsetLeft);
                setPosition(1);
              }}
            >
              General
            </p>
            <p
              onClick={(e) => {
                containerInformation.current.style.transform =
                  "translateX(-100%)";
                changeSection(e.target.offsetLeft);
                setPosition(2);
              }}
            >
              Stats
            </p>
            <p
              onClick={(e) => {
                containerInformation.current.style.transform =
                  "translateX(-200%)";
                changeSection(e.target.offsetLeft);
                setPosition(3);
              }}
            >
              Specials
            </p>
            <p
              onClick={(e) => {
                containerInformation.current.style.transform =
                  "translateX(-300%)";
                changeSection(e.target.offsetLeft);
                setPosition(4);
              }}
            >
              Fauna
            </p>

         

          </div>
          <div className="container-information" ref={containerInformation}>
            <div className="information">
              <div className="card-information" style={{weight:'95px',justifyContent:'space-around'}}>
               <WeightIcon style={{height:'45px'}}/>
                <p>{pokemon.weight}</p> 
                <p>Weight</p>
              </div>

              <div className="card-information" style={{weight:'95px',justifyContent:'space-around'}}>
                <HeightIcon style={{height:'45px'}}/>
                <p>{pokemon.height}</p>
                <p>Height</p>
              </div>

              <div className="card-information" style={{weight:'95px',justifyContent:'space-around'}}>
                <CaptureIcon style={{height:'45px'}}/>
                <p>{pokemon.captureRate} </p>
                <p>Capture Rate</p>
              </div>

              <div className="card-information" style={{weight:'95px',justifyContent:'space-around'}}>
              <ExperienceIcon style={{height:'45px'}}/>
                <p>{pokemon.experience} </p>
                <p>Experience</p>
              </div>
            </div>

            <div className="information stats">
              {pokemon.stats_normal.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="card-information"
                    style={{ justifyContent: "space-between" }}
                  >
                    <ProgressCircle color={el.colorStroke} points={el.value} />
                    <p>{el.name}</p>
                    {containerImg(el.name)}
                  </div>
                );
              })}
            </div>

            <div className="information stats">
              {pokemon.stats_special.map((el, i) => {
                return (
                  <div
                    key={i}
                    className="card-information"
                    style={{ justifyContent: "space-between" }}
                  >
                    <ProgressCircle color={el.colorStroke} points={el.value} />
                    <p style={{ fontSize: "14px" }}>{"Special-" + el.name}</p>
                    {containerImg(el.name)}
                  </div>
                );
              })}
            </div>

            <div className="information ambient">
              <div className="various">
                <div>
                  {pokemon.eggs[0] ? eggsPokemons(pokemon.eggs[0]) : ""}
                  {pokemon.eggs[1] ? eggsPokemons(pokemon.eggs[1]) : ""}
                </div>
                <EggsIcon width="40px" height="40px" />
              </div>

              <div className="various" style={{ justifyContent: "flex-end" }}>
                <div>
                  {pokemon.habitat ? (
                    <p
                      style={{
                        background: "#333333",
                        textTransform: "capitalize",
                      }}
                      className={"habitat-" + pokemon.habitat}
                    >
                      {pokemon.habitat}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <HabitatIcon />
              </div>

              <div className="various">
                <div>
                  <ProgressCircle
                    color={"#ffd93b"}
                    points={pokemon.happiness}
                  />
                  <HappinessIcon height="33px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state,myProps) =>({
  pokemons:state.pokemons,
  props:myProps
})

const mapDispatchToProps = (dispatch) => ({

  addPokemon(id) {
    dispatch({
      type: "ADD_FAVORITE",
      id
    });
  },

  removePokemon(id) {
    dispatch({
      type: "REMOVE_FAVORITE",
      id
    });
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonInformation);