import React, { useContext } from 'react';
import ThemeContext from '../../context/ThemeContext';
import './style.css';

const Navbar = () => {
    const value = useContext(ThemeContext);
    const { isDarkTheme, toggleTheme } = value;

    return (
        <div className={`nav-bar-container-${isDarkTheme ? 'dark' : 'light'}`}>
            <img
                src={`https://assets.ccbp.in/frontend/react-js/website-logo-${isDarkTheme ? 'dark' : 'light'}-theme-img.png`}
                className="website-logo"
                alt="website logo"
            />
            <div className="middle-items" style={{ color: isDarkTheme ? "#fff" : "#171f46" }}>
                ~ Plan It ~
            </div>
            <button
                type="button"
                className="theme-button"
                testid="theme"
                onClick={toggleTheme}
            >
                <img
                    src={`https://assets.ccbp.in/frontend/react-js/${isDarkTheme ? 'light' : 'dark'}-theme-img.png`}
                    className="theme-img"
                    alt="theme"
                />
            </button>
        </div>
    );
}

export default Navbar;
