import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Inventory from '../pages/Inventory';
import Income from '../pages/Income';
import Egress from '../pages/Egress';
import Modify from '../pages/Modify';
import HomeAdmin from '../pages/HomeAdmin';
import Add from '../pages/Add';
import EgressHistory from '../pages/EgressHistory';
import IncomeHistory from '../pages/IncomeHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/homeAdmin" element={<HomeAdmin />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/income" element={<Income />}></Route>
        <Route path="/egress" element={<Egress />}></Route>
        <Route path="/modify" element={<Modify />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/egressHistory" element={<EgressHistory />}></Route>
        <Route path="/incomeHistory" element={<IncomeHistory />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
