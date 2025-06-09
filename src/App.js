import logo from './logo.svg';
import './App.css';
import './components/Navbar';
import Navbar from './components/Navbar';
import React, { useState, useEffect } from 'react';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // let date=(new Date('2022','10','20'));
  // let amount='252.12';
  // let title="Welcome";
  return (
    <div className="App">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      {/* <Navbar passedDate={date} passedTitle={title} passedAmount={amount} /> */}
    </div>
  );
}

export default App;
