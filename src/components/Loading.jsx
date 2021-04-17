import React from 'react'
import pokeballIcon from '../assets/icons/pokeball2.png'
export const Loader = () =>{

  return(
    <div className="loader" style={{display:'none'}}>
    <img style={{width:'80px'}} src={pokeballIcon} alt="pokeball" />
    <p>Loading</p>
  </div>
  )
}
