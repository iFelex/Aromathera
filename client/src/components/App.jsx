import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Inventory from '../pages/Inventory';
import Income from '../pages/Income';
import Egress from '../pages/Egress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/egress" element={<Egress />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
