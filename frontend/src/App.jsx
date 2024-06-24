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
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/userSlice";

import axios from "axios";

function App() {
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/oauth/profile", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     setUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // if (!user) {
  //   getUser();
  // }
  // useEffect(() => {
  //   getUser();
  // }, []);
  // const memoizedUser = useMemo(() => user, [user]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [userStatus, dispatch]);
  console.log("App.jsx user:", user);
  // console.log("app.jsx user", memoizedUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        {user && user.success ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/article-form" element={<Form />} />
            <Route exact path="/loa-prompt" element={<LoaPrompt />} />
            <Route exact path="/loa-form" element={<LoaForm />} />
            <Route exact path="/critical-role" element={<LoaCritical />} />
            <Route exact path="/bio-writer" element={<BioWriter />} />
            <Route
              exact
              path="/bio-writer-prompt"
              element={<BioWriterPrompt />}
            />
            <Route exact path="/sidebar" element={<SidebarTail />} />
            <Route exact path="/chatbot" element={<Chatbot />} />
          </>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
