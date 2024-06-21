import React, { useState, useEffect } from "react";
import navbar from "./assets/navbar.png";
import profile from "./assets/profile.png";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      // const response = await axios.get("http://localhost:5000/oauth/profile", {
      //   withCredentials: true,
      // });
      const response = await fetch("http://localhost:5000/oauth/profile", {
        method: "GET",
        credentials: "include", // This ensures cookies are sent with the request
      });
      const data = await response.json();
      console.log("response", data);
      setUser(data);
    } catch (error) {
      // navigate("*");
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log(user, 5454545);

  // console.log(userdata, 5454);
  return (
    <nav className=" w-full  h-24  bg-[#FFFFFF] flex justify-between fixed  z-50">
      <div className="flex items-center text-xl px-2 py-2  ">
        <img
          className="  h-24 w-32 cursor-pointer inline-block"
          src={navbar}
          alt=""
        />
        <span className=" text-gradient-to-r from-[#AA22FF] via-[#D989FF] to-[#51FFE0] text-2xl font-semibold">
          AI
        </span>
      </div>
      <div className="flex items-center gap-x-5 px-2">
        <button className=" group">
          <img className=" mr-4 h-12 w-12" src={profile} alt="profile-icon" />
          <div className="z-10 bg-white hidden absolute rounded-lg shadow w-32 group-focus:block right-0">
            <ul className=" text-xl text-black">
              <li className="pt-2">
                <a href="">Profile</a>
              </li>
              <li className="pt-2">
                <a href="">Setting</a>
              </li>
              <li className="pt-2">
                <a href="">Signout</a>
              </li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
