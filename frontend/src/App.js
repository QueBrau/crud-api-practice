import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import NewAnimalForm from './components/NewAnimalForm';
import AnimalDetails from './components/Details';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new-animal" element={<NewAnimalForm />} />
          <Route path="/animal/:id" element={<AnimalDetails />} />
          <Route path="/edit/:id" element={<NewAnimalForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
