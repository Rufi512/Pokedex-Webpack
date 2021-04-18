import React from 'react'
import {Link} from 'react-router-dom'
import PikachuIcon from '../assets/icons/pikachu.svg'
export const NotFound = () =>{

  return(
    <div className="not-container">
      <h1>Oh No!,Can't see anything around here</h1>
      <div>
        <PikachuIcon/>
        <Link className="a" to="/">
          <button>Return to main page</button>
        </Link>
      </div>
    </div>
      )
}
