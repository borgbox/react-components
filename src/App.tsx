import React from 'react';
import Navbar from './components/navbar';
import './App.css';
import Card from './components/card';
import RadialChart from './components/radial-chart';
import Gauge from './components/gauge';
import RadialGauge from './components/radial-gauge';
import ValueCardIndicator from './components/value-card-indicator';
import { FaTemperatureHigh } from 'react-icons/fa'
import ValueCircleCardIndicator from './components/value-circle-card-indicator';
import CardWrapper from './components/card-wrapper';

function App() {
  return (
    <div style={{padding: '2em'}}>      
      <Navbar></Navbar>
      <Card></Card>
      <RadialChart progress={10} unit='RPM'></RadialChart>
      <Gauge suffix='RPM' needleColor='#818893' value={30} showNeedle={true} width={250} height={160} label="This is a big one" />
      <RadialGauge needleColor='#818893' value={45} max={120} min={0} unit='RPM' />
      {/* <ValueCardIndicator icon={<FaTemperatureHigh/>} value={10} width={8} height={5} unit='Cº' title='TEMPERATURE'></ValueCardIndicator> */}
      <ValueCardIndicator value={20} width={8} height={5} unit='Cº' title='TEMPERATURE'></ValueCardIndicator>
      <ValueCircleCardIndicator value={20} width={8} height={8} unit='Cº' title='TEMPERATURE'></ValueCircleCardIndicator>
      <CardWrapper  width={12} height={15}  title='TEMPERATURE'>
        <span>123</span>
        <span>123</span>
        <span>123</span>
        <span>123</span>
        <span>123</span>
      </CardWrapper>
    </div>
  );
}

export default App;
