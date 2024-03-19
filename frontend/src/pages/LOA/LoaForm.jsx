import React, { useState } from "react";
import "./loaform.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import gptImgLogo from "./assets/chatgptLogo.svg";
import download from "./assets/download.png";
import { Link } from "react-router-dom";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SideBar from "../../components/SideBar";
import LoaCritical from "./LoaCritical";
import LoaResearch from "./LoaResearch";
const LoaForm = () => {
  const [value, setValue] = React.useState("1");

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
    highestDegree: "",
    specialization: "",
    university: "",
    jobTitle: "",
    currentEmployer: "",
    experience: "",
    industry: "",
    achievements: "",
    impact: "",
    projects: "",
    quantifiedWorks: "",
    challengesOvercome: "",
    publications: "",
    industryInsight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [generatedArticle, setGeneratedArticle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Generating article");
    try {
      const response = await fetch(
        "http://15.206.166.198/api/v1/ArticelWriter/articleForm",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      const generatedArticleText =
        data.choices && data.choices[0] && data.choices[0].message
          ? data.choices[0].message.content
          : "";

      setGeneratedArticle(generatedArticleText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="App">
        <SideBar />

        <div className="main">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  background: "white",
                }}
              >
                <TabList
                  onChange={handleChangeTabs}
                  aria-label="lab API tabs example"
                  style={{ fontSize: "100px" }}
                >
                  <Tab label="Critical Role" value="1" />
                  <Tab label="Research paper" value="2" />
                  <Tab label="Original Contribution" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <LoaCritical type={"Critical Role"} />
              </TabPanel>
              <TabPanel value="2">
                <LoaResearch type={"Research Paper"} />
              </TabPanel>
              <TabPanel value="3">
                <LoaCritical type={"Original Contribution"} />
              </TabPanel>
            </TabContext>
          </Box>

          {generatedArticle && (
            <div className="chat bot">
              {/* <h2>Generated Article:</h2> */}
              <img src={download} alt="" className="chatImg" />
              <p className="txt">{generatedArticle}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoaForm;
