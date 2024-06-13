import React from 'react';
import './Home.css';
import axios from 'axios';
import { toHaveDescription } from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import Login from '../Login_/Login';

function Home() {
  
  return (
    <div className="Home">
            <Login/>
    </div>
  );
}

export default Home;
