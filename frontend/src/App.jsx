import React, { useState } from "react";
// import "./App.css";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import LoaPrompt from "./pages/LOA/LoaPrompt";
import LoaForm from "./pages/LOA/LoaForm";
import LoaCritical from "./pages/LOA/LoaCritical";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/article-form" element={<Form />}></Route>
          <Route exact path="/loa-prompt" element={<LoaPrompt />}></Route>
          <Route exact path="/loa-form" element={<LoaForm />}></Route>
          <Route exact path="/critical-role" element={<LoaCritical />}></Route>
          <Route exact path="/drawer" element={<ResponsiveDrawer />}></Route>
          critical-role
        </Routes>
      </Router>
    </div>
  );
}

export default App;
