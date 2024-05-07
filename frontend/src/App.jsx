import React, { useState } from "react";
// import "./App.css";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import LoaPrompt from "./pages/LOA/LoaPrompt";
import LoaForm from "./pages/LOA/LoaForm";
import LoaCritical from "./pages/LOA/LoaCritical";
import BioWriter from "./pages/Bio/BioWriter";
import BioWriterPrompt from "./pages/Bio/BioWriterPrompt";
import SidebarTail from "./components/SidebarTail";
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
          <Route exact path="/bio-writer" element={<BioWriter />}></Route>
          <Route
            exact
            path="/bio-writer-prompt"
            element={<BioWriterPrompt />}
          ></Route>
          <Route exact path="/sidebar" element={<SidebarTail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
