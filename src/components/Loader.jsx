import React from 'react'
import LoaderIcon from '../assets/icons/loader.svg'
export const Loader = (props) =>{

  return(
    <div className="loader" style={{transform:`${props.loading ? 'translateY(0)' : 'translateY(100%)'}` }}>
    <LoaderIcon/>
    <p>Loading</p>
  </div>
  )
}
