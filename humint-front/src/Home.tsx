import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Table from './tabledata/Table';
import { toHaveDescription } from '@testing-library/jest-dom/matchers';
import store from './redux/store';
import { Provider } from 'react-redux';

interface datalist {
  id: number;
  date: string;
  rhq: string;
  subsidiary: string;
  site_code: string;
  page_type: string;
  category: string;
  location: string;
  title: string;
  Description: string;
  contents: string;
  check_result: string;
  check_reason: string;
  created_at: string;
  updated_at: string;
}

function Home() {

  
  return (
    <div className="Home">
          QA 자동화
          <Provider store={store}>
            <Table/>
          </Provider>
    </div>
  );
}

export default Home;
