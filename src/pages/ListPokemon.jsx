import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Loader } from "../components/Loader";
import { getListPokemon } from "../components/API";
import { typePokemon } from "../components/SomethingFunctions";
import SearchIcon from "../assets/icons/search.svg";

export const ListPokemon = () => {
  let history = useHistory();

  const [pokemons, setPokemons] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error,setError] = useState(false)

  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false)
    const load = async () => {
      if (pokemons.length === 0) {
        const res = await getListPokemon(0);
        if (res !== "Error") {
          setPokemons(res);
        }else{
          setError(true)
        }
      }
      if (pokemons) {
        setLoading(false);
      }
    };
    load();
  }, []);

  const loadPokemons = async () => {
    if (loading !== true) {
      setLoading(true);
      const res = await getListPokemon(page + 12);
      if (res === 'Error') {
        alert("Fail to request")
        return ''
      } else {
        setPage(page + 12);
        for (const pokemon of res) {
          setPokemons((olds) => [...olds, pokemon]);
        }
        setLoading(false);
      }
    } 
  };

  if(error){
    return(
       <div className="error-pokemon">
       <h2>An error has occurred, try to reload the page</h2>
       <button type="button" onClick={(e)=>{window.location.reload()}}>Reload</button>
       </div>
      )
  }

  return (
    <React.Fragment>
      <Loader loading={loading} />
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
                history.push(`/info/${i + 1}`);
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
      </div>

      <button
        className="button-action"
        style={{
          transform: loading === true ? "translateY(100%)" : "translateY(0%)",
        }}
        onClick={(e) => {
          loadPokemons();
        }}
      >
        Load more
      </button>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ListPokemon);