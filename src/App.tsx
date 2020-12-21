import React from 'react';
import Navbar from './components/navbar';
import './App.css';
import Card from './components/card';
import RadialChart from './components/radial-chart';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Card></Card>
      <RadialChart progress={60}></RadialChart>
    </div>
  );
}

export default App;
