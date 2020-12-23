import React,{useState, useEffect} from 'react'
import './style.css'

interface IValueCardIndicator{
  width: number,
  height: number,
  title?: string,
  children: any
}

const CardWrapper = ({width, height, title, ...rest}:IValueCardIndicator) => {


    return (

  <div className='card-wrapper-indicator-wrapper' style={{width:`${width}em`, height:`${height}em`}}>
    <span style={{fontSize:'.7em', color: '#fff', padding: '.5em', opacity: .7}}>{title}</span>
    <div className="card-wrapper-indicator-container">

      {rest.children}

    </div>

  </div>

    )
}

export default CardWrapper
