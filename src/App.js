import React from "react";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCompany from "./components/CreateCompany";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateCompany />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
