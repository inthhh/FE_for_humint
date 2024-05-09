import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Table from './TableData/Table';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
  <Provider store={store}>
    <Router>
      <Routes>
      
            <Route path="/" element={<Home/>} />
            <Route path="/7u8i9o0p!@" element={<Table/>} />
          
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
