import React, { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [generatedArticle, setGeneratedArticle] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateArticle = async () => {
    console.log("Generating Article!!");
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/ArticelWriter/articlePrompt",
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

      // Access the generated article from the response
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
    <div>
      <div className="App">
        <h1>AI Article Generator</h1>
        <form>
          <label>Prompt:</label>
          <input type="text" name="prompt" onChange={handleInputChange} />
          <button type="button" onClick={generateArticle}>
            Generate Article
          </button>
        </form>

        {generatedArticle && (
          <div>
            <h2>Generated Article:</h2>
            <p>{generatedArticle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
