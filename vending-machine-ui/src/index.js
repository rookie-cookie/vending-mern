import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Checkout from './pages/checkout.component'
import Admin from './pages/admin.component'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
       <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
    </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
