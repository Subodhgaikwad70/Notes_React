import './Navbar.css'
import React, { useState } from 'react';

function Navbar({ toggleTheme, currentTheme })
{
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSwitchStyle = {
        position: 'relative',
        display: 'inline-block',
        width: '60px',
        height: '34px',
        margin: '0 10px',
    };

    const sliderStyle = {
        position: 'absolute',
        cursor: 'pointer',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: currentTheme === 'light' ? '#ccc' : '#2196F3',
        transition: '.4s',
        borderRadius: '34px',
    };

    const knobStyle = {
        position: 'absolute',
        height: '26px',
        width: '26px',
        left: currentTheme === 'light' ? '4px' : '30px',
        bottom: '4px',
        backgroundColor: 'white',
        transition: '.4s',
        borderRadius: '50%',
    };
    
    return (
    <nav className="navbar background">
        <div data-testid="hamburger-menu" className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <ul data-testid="nav-list" className={`nav-list ${isMobileMenuOpen ? 'show' : ''}`}>
            {/* <div class="logo"><img src="res/images.jpeg" alt="logo"></div> */}
            <li><a href="#home" >Home</a></li>
            <li><a href="#Sevices" >Services</a></li>
            <li><a href="#Contact Us" >Contact Us</a></li>
            <li><a href="#About" >About</a></li>
        </ul>
        <div className={`rightNav ${isMobileMenuOpen ? 'show-flex' : ''}`}>
            {/* <input type="text" name="search" id="search" placeholder="Software Engineering..." style="color: white;"> */}
            {/* <div id='date'>{date.toISOString()}</div>
            <div id='title'>{title}</div>
            <div id='amount'>{amount}</div> */}
            <label style={toggleSwitchStyle} htmlFor="theme-toggle">
                <input
                    type="checkbox"
                    id="theme-toggle"
                    data-testid="theme-toggle"
                    onChange={toggleTheme}
                    checked={currentTheme === 'dark'}
                    style={{opacity: 0, width: 0, height: 0}}
                />
                <span style={sliderStyle}>
                    <span style={knobStyle}></span>
                </span>
            </label>
            <button className="btn btn-sm">Search</button>
            <button className="btn btn_lg">Login
                {/* <a href="#html/login.html" >Login</a> */}
            </button>
        </div>
    </nav>   )
}
export default Navbar