import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux'
import {getListPokemon} from "../components/API"
import { typePokemon } from "../components/SomethingFunctions";
import SearchIcon from "../assets/icons/search.svg";
import LoaderIcon from "../assets/icons/loader.svg";

export const ListPokemon = () => {

  let history = useHistory()

  const [pokemons,setPokemons] = useState([])

  const [loading,setLoading] = useState(false)
  
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    setLoading(true);
    const load = async () =>{
    if (pokemons.length === 0) {
     const res = await getListPokemon(0);
      console.log(res)
      if(res !== 'Error'){
      setPokemons(res)
    }
  }

    if (pokemons) { 
      setLoading(false);
    }
  }
    load();
  }, []);

  const loadPokemons = async () =>{
    const res = await getListPokemon(page+12)
    if(!res.status === 200){
      console.log(res)
    }else{
    setPage(page+12)
    for(const pokemon of res ){
      setPokemons((olds) => [...olds, pokemon]);
    } 
  }
}

  return (
    <React.Fragment>
      <div className="list-container">
        {pokemons.map((el, i) => {
          let typeOne = "";
          let typeTwo = "";

          if (el.type[0]) {
            typeOne = typePokemon(el.type[0], "30");
          }
          if (el.type[1]) {
            typeTwo = typePokemon(el.type[1], "30");
          }

          return (
            <div
              className="pokemon-card"
              key={i}
              onClick={(e) => {
                history.push(`/info/${i+1}`);
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <p style={{ textTransform: "capitalize" }}>{el.name}</p>
                <p style={{ color: "#565656" }}>#{el.id}</p>
              </div>

              <img
                src={el.sprite}
                alt={el.name}
                style={{ width: "fit-content" }}
              />

              <div
                style={{
                  display: "inline-flex",
                  width: "130px",
                  justifyContent: "space-around",
                }}
              >
                {typeOne}
                {typeTwo}
              </div>
            </div>
          );
        })}

        <div
          className="loader-list"
          style={{
            transform: loading === true ? "translateY(0%)" : "translateY(100%)",
          }}
        >
          <LoaderIcon style={{ width: "24px", marginRight: "5px" }} />{" "}
          <p> Loading...</p>
        </div>


      </div>

      <button
        className="button-action"
        style={{
          transform: loading === true ? "translateY(100%)" : "translateY(0%)",
        }}
        onClick={(e) => {
          console.log('request');
          loadPokemons(); 
        }}
      >
        Load more
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) =>({})

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListPokemon)