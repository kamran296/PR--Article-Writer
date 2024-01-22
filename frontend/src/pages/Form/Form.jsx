import React, { useState } from "react";
import "./Form.css";
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import gptImgLogo from './assets/chatgptLogo.svg';
import { Link } from 'react-router-dom'

const Form = () => {
  const [formData, setFormData] = useState({
    attribute: "",
    name: "",
    expertise: "",
    company: "",
    notableWork: "",
    contribution: "",
    achievements: "",
    education: "",
    projects: "",
    problemsSolved: "",
    publishes: "",
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
        "http://localhost:5000/api/v1/ArticelWriter/articleForm",
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
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">Article Writer</span>
          </div>
          <Link className="link" to="/">
          <button className="midBtn" onClick={() => navigate('/')}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          </Link>
          <div className="upperSideBottom">
          <Link className="link" to="/"><button className="query"><img src={msgIcon} alt="query"/>Prompt model</button></Link>
          <Link className="link" to="/article-form/"><button className="query"><img src={msgIcon} alt="query" />Form model</button></Link>

          </div>
        </div>
        <div className="lowerside"></div>
      </div>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="row">
          <label>
            Attribute:
            <input
              className="inp1"
              type="text"
              name="attribute"
              value={formData.attribute}
              onChange={handleChange}
            />
          </label>

          <label>
            Name:
            <input
              className="inp1"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          </div>

          <div className="row">
          <label>
            Expertise:
            <input
              className="inp1"
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
            />
          </label>

          <label>
            Company:
            <input
              className="inp1"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>
          </div>

          <div className="row">
          <label>
            Notable Work:
            <textarea
              className="inp1"
              name="notableWork"
              value={formData.notableWork}
              onChange={handleChange}
            />
          </label>

          <label>
            Contribution:
            <textarea
              className="inp1"
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
            />
          </label>
          </div>

          <div className="row">
          <label>
            Achievements:
            <textarea
              className="inp1"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
            />
          </label>

          <label>
            Education:
            <input
              className="inp1"
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </label>
          </div>

          <div className="row">
          <label>
            Projects:
            <textarea
              className="inp1"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
            />
          </label>

          <label >
            Problems Solved:
            <textarea
              className="inp1"
              name="problemsSolved"
              value={formData.problemsSolved}
              onChange={handleChange}
            />
          </label>
          </div>

          <div className="row">
          <label>
            Publishes:
            <textarea
              className="inp1"
              name="publishes"
              value={formData.publishes}
              onChange={handleChange}
            />
          </label>
          </div>
          <button className="midBtn" type="submit">Submit</button>
        </form>

        {generatedArticle && (
          <div className="chat bot">
            {/* <h2>Generated Article:</h2> */}
            <img src={gptImgLogo} alt="" className="chatImg" />
            <p className="txt">{generatedArticle}</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Form;
