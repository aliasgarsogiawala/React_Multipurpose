// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

function Home() {
  return (
    <div class="butts">
      <h1>Welcome to Alis Hub</h1>
      <h2>What problem of yours did you bother me for?</h2><br></br><br></br>
      <div className='code'>
        <Link to="/code-editor">
            <button className="button">Code Editor</button>
        </Link>
      </div>
      <div className='trans'>
        <Link to="/code-generator">
            <button className="button">Translator</button>
        </Link>
      </div>
      <div className='curr'>
        <Link to="/currency-converter">
            <button className="button">Currency Converter</button>
        </Link>
      </div>
      <div className='wee'>
        <Link to="/weather">
            <button className="button">Weather</button>
        </Link>
      </div>
      <div className="container">
      
      
      
      
    </div>
    </div>
  );
}

export default Home;
