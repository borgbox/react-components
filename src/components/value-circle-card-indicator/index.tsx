import React, { useState, useEffect } from 'react'
import './style.css'

interface IValueCircleCardIndicator {
  width: number,
  height: number,
  value: number,
  unit?: string,
  title?: string,
  icon?: any,
  animationTime?: number
}

const ValueCircleCardIndicator = ({ width, height, value, unit, title, icon, animationTime = 300 }: IValueCircleCardIndicator) => {

  const [valueCounter, setValueCounter] = useState(0);

  useEffect(() => {
    animateValue(valueCounter > 0 ? valueCounter : 0, value, animationTime);
  }, [value])

  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setValueCounter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  return (

    <div className='value-circle-card-indicator-wrapper' style={{ width: `${width}em`, height: `${height}em` }}>
      <span style={{ textAlign: 'center', fontSize: '.7em', color: '#fff', opacity: .7 }}>{title}</span>
      <div className="value-circle-card-indicator-container">

        {icon && <span style={{ color: '#fff', fontSize: '1.4em', marginRight: '.2em', opacity: '.5' }}>{icon}</span>}

        {/*  <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar-value-circle-card-indicator" style={{width:'40px'}}/> */}

        <div>

          <span style={{ fontSize: '2.5em', color: '#fff' }}>{valueCounter}</span>
          <span style={{ marginLeft: '.3em', fontSize: '1em', color: '#fff', opacity: '.5' }}>{unit}</span>
        </div>

      </div>

    </div>

  )
}

export default ValueCircleCardIndicator
