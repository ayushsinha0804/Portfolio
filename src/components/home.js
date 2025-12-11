// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home">
    <h1>Ayush Sinha</h1>
    <p>Welcome to my portfolio site</p>
    <nav>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/experience">Experience</Link>
      <Link to="/skills">Skills</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  </div>
);

export default Home;
