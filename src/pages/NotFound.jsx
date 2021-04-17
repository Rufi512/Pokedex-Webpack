import React from 'react'
import {Link} from 'react-router-dom'
import Pikachu from '../assets/icons/pikachu.svg'
export const NotFound = () =>{

  return(
    <div className="not-container">
      <h1 style={{width:'50%'}}>Oh No!,Can't see anything around here</h1>
      <div>
        <Pikachu/>
        <Link className="a" to="/">
          <button>Return to main page</button>
        </Link>
      </div>
    </div>
      )
}
