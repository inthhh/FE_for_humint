import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home_/Home';
import Table from './components/mainTable/Table';
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
