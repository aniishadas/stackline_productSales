import React from "react";
import "./App.css";
import logo from "./assets/stackline_logo.svg";
import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { setData, setError } from './reduxStore/slice';
import { fetchData } from './mockApi';
import ProductTable from './components/productTable'
import SidePanel from './components/sidePanel'
import ProductChart from './components/lineChart'

function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchDataAsync = async () => {
        dispatch(setError(null));
  
        try {
          const fetchedData = await fetchData();
          dispatch(setData(fetchedData));
        } catch (err) {
          dispatch(setError('Error in getting product data'));
        } 
      };
  
      fetchDataAsync();
    }, [dispatch]);
  
  return (
    <div className="product_page">
      <div className="app-header">
        <img src={logo} alt="Stackline logo" className="logo" />
      </div>
      <div className="pageContent">
        <div className="left_SideBar">
          <SidePanel />
        </div>
        <div className="right_Content">
          <div className="chart_div">
            <ProductChart />
          </div>
          <div className="table_div">
            <ProductTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
