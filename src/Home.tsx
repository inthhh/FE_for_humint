import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Table from './tabledata/Table';
import { toHaveDescription } from '@testing-library/jest-dom/matchers';
import store from './redux/store';
import { Provider } from 'react-redux';
import Login from './LoginData/Login';

function Home() {
  
  return (
    <div className="Home">
            <Login/>
    </div>
  );
}

export default Home;
