
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import CodeEditor from './CodeEditor';
import CodeGenerator from './CodeGenerator';
import CurrencyConverter from './CurrencyConverter';
import Weather from './Weather'; 
import './App.css';
import './Weather.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/code-generator" element={<CodeGenerator />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/weather" element={<Weather />} /> 
      </Routes>
    </Router>
  );
}

export default App;