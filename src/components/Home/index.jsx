import React, { useContext } from 'react';
import Navbar from '../Navbar';
import ThemeContext from '../../context/ThemeContext';
import './style.css';

const Home = () => {
    const value = useContext(ThemeContext);
    const { isDarkTheme } = value;

    return (
        <div className={isDarkTheme ? 'main-home-container dark' : 'main-home-container'}>
            <Navbar />
            <div className={`home-container-${isDarkTheme ? 'dark' : 'light'}`}>
                <img
                    src={`https://assets.ccbp.in/frontend/react-js/home-${isDarkTheme ? 'dark' : 'light'}-img.png`}
                    className="home-image"
                    alt="home"
                />
                <h1 className={`home-heading-${isDarkTheme ? 'dark' : 'light'}`}>Home</h1>
            </div>
        </div>
    );
}

export default Home;
