import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import LoaPrompt from "./pages/LOA/LoaPrompt";
import LoaForm from "./pages/LOA/LoaForm";
import LoaCritical from "./pages/LOA/LoaCritical";
import BioWriter from "./pages/Bio/BioWriter";
import BioWriterPrompt from "./pages/Bio/BioWriterPrompt";
import SidebarTail from "./components/SidebarTail";
import Chatbot from "./pages/Chatbot/Chatbot";
import Niche from "./pages/Niche/Niche";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/userSlice";

import axios from "axios";
import LorPrompt from "./pages/LOR/LorPrompt";
import LorForm from "./pages/LOR/LorForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddData from "./pages/AddData/AddData";
import ClientChatbot from "./pages/ClientChatbot/ClientChatbot";
import LoginForm from "./pages/REA/loginForm";
import ResultPage from "./pages/REA/Result";
import Landing from "./pages/Landing/Landing";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);
  // console.log("App.jsx user:", user);
  // console.log("app.jsx user", memoizedUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        {user && user.success ? (
          <>
            <Route exact path="/prd" element={<Home />} />
            <Route exact path="/article-form" element={<Form />} />
            <Route exact path="/loa-prompt" element={<LoaPrompt />} />
            <Route exact path="/loa-form" element={<LoaForm />} />
            <Route exact path="/critical-role" element={<LoaCritical />} />
            <Route exact path="/lor" element={<LorPrompt />} />
            <Route exact path="/lor-form" element={<LorForm />} />
            <Route exact path="/bio-writer" element={<BioWriter />} />

            <Route
              exact
              path="/bio-writer-prompt"
              element={<BioWriterPrompt />}
            />

            <Route exact path="/sidebar" element={<SidebarTail />} />
            <Route exact path="/chatbot" element={<Chatbot />} />
            <Route exact path="/niche" element={<Niche />} />
            <Route exact path="/client" element={<ClientChatbot />} />
            <Route exact path="/add-data" element={<AddData />} />
            <Route exact path="/rea-form" element={<LoginForm />} />
            <Route exact path="/rea-result" element={<ResultPage />} />
            <Route exact path="/" element={<Landing />} />

            {user.user.isAdmin === "Admin" && (
              <Route exact path="/dashboard" element={<Dashboard />} />
            )}
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
