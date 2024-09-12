const { spawn } = require("child_process");

exports.getSalaryIndeed = (req, res) => {
  const { jobRole, location } = req.body;
  console.log(req.body);

  const pythonProcess = spawn("python3", ["app2.py", jobRole, location]);

  let data = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    console.error(`Error: ${chunk}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      return res.status(500).send("Something went wrong!");
    }

    const [averageSalary, highSalary] = data.split(",");
    const website = "Indeed";

    res.json({
      website,
      averageSalary,
      highSalary,
    });
  });
};
