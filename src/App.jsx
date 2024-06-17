import './App.css';
import './index.css'
import React, { useState } from 'react';

function App() {
  // state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [unit, setUnit] = useState('imperial'); // Default to imperial units

  const calcBmi = (event) => {
    //prevent submitting to the server
    event.preventDefault();

    if (weight === '' || height === '' || isNaN(weight) || isNaN(height)) {
      alert('Please enter a valid weight and height');
      return;
    }

    let bmi = 0;
    if (unit === 'imperial') {
      const heightInInches = parseFloat(height);
      const weightInPounds = parseFloat(weight);
      bmi = (weightInPounds / (heightInInches * heightInInches) * 703);
    } else {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      bmi = weightInKg / (heightInMeters * heightInMeters);
    }
    setBmi(bmi.toFixed(1));

    // Logic for message
    if (bmi < 18.5) {
      setMessage('You are underweight');
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setMessage('You are a healthy weight');
    } else if (bmi >= 25 && bmi < 29.9) {
      setMessage('You are overweight');
    } else {
      setMessage('You are obese');
    }
  }

  const reload = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setMessage('');
  }

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    reload();
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>

          <div className='>Unit '>
            <label>Unit System</label>
            <select value={unit} onChange={handleUnitChange}>
              <option value="imperial">Imperial (lbs, in)</option>
              <option value="metric">Metric (kg, cm)</option>
            </select>
          </div>

          <div className='Weight'> 
            <label>Weight ( {unit === 'imperial' ? 'lbs' : 'kg'})</label>
            
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={`Enter weight in ${unit === 'imperial' ? 'pounds' : 'kilograms'}`}
              required
            />
          </div>

          <div className='Height '>
            <label>Height ({unit === 'imperial' ? 'in' : 'cm'})</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter height in ${unit === 'imperial' ? 'inches' : 'centimeters'}`}
              required
            />
          </div>

          <div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' type='button' onClick={reload}>Reload</button>
          </div>
        </form>

        <div className='center'>
          {bmi && (
            <>
              <h3>Your BMI is: {bmi}</h3>
              <p>{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
