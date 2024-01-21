import React, { useState } from "react";

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
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Attribute:
            <input
              type="text"
              name="attribute"
              value={formData.attribute}
              onChange={handleChange}
            />
          </label>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Expertise:
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
            />
          </label>

          <label>
            Company:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>

          <label>
            Notable Work:
            <textarea
              name="notableWork"
              value={formData.notableWork}
              onChange={handleChange}
            />
          </label>

          <label>
            Contribution:
            <textarea
              name="contribution"
              value={formData.contribution}
              onChange={handleChange}
            />
          </label>

          <label>
            Achievements:
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
            />
          </label>

          <label>
            Education:
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
          </label>

          <label>
            Projects:
            <textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
            />
          </label>

          <label>
            Problems Solved:
            <textarea
              name="problemsSolved"
              value={formData.problemsSolved}
              onChange={handleChange}
            />
          </label>

          <label>
            Publishes:
            <textarea
              name="publishes"
              value={formData.publishes}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {generatedArticle && (
          <div>
            <h2>Generated Article:</h2>
            <p>{generatedArticle}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
