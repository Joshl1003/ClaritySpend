import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Categories from "./pages/Categories";
//import React from 'react'

export default function App() {
  return (  
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
} 
