import React from 'react';
import AppContext from '../context';

function ThemeSwitch() {
    const { darkTheme, toggleTheme } = React.useContext(AppContext);

    return (
        <div className="theme-switch-wrapper">
            <label className="theme-switch" htmlFor="checkbox">
                <input 
                    type="checkbox" 
                    id="checkbox" 
                    checked={darkTheme}
                    onChange={toggleTheme}
                />
                <div className="slider round">
                    <span className="theme-icon">
                        {darkTheme ? '🌙' : '☀️'}
                    </span>
                </div>
            </label>
        </div>
    );
}

export default ThemeSwitch;