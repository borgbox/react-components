import React from 'react'
import './style.css'

const Card = ({children}:any) => {
    return (

  <div className='card-wrapper' style={{width:'25em'}}>
    <header className="card-container" style={{color: '#fff', backgroundColor:'rgba(0,0,0,0.2)'}}>
      <h3>John Doe</h3>
    </header>
    <div className="card-container" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
    
      <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar-card" style={{width:'60px', marginTop:'1em'}}/>
      <p style={{color:'#fff'}}>CEO at Mighty Schools. Marketing and Advertising. Seeking a new job and new opportunities.</p><br/>
    </div>
    <button style={{display: 'inline-block', width: '33.3%'}} className="">+ Connect</button>
    <button style={{display: 'inline-block', width: '33.3%'}} className="">+ Connect</button>
    <button style={{display: 'inline-block', width: '33.3%'}} className="">+ Connect</button>
  </div>

    )
}

export default Card
