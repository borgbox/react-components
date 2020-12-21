import React from 'react'
import './style.css'
const Navbar = () => {
    return (
        <div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
                <li style={{float:'right'}}><a className="active" href="#about">1</a></li>
            </ul>
        </div>
    )
}

export default Navbar
