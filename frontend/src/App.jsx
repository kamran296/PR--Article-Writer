import React, { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/article-form" element={<Form />}></Route>
          <Route exact path="/drawer" element={<ResponsiveDrawer />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
