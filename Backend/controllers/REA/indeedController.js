const { spawn } = require("child_process");

exports.getSalaryIndeed = (req, res) => {
  const { jobRole, location } = req.body;
  console.log(req.body);

  // Start Xvfb before running Selenium script
  // const xvfbProcess = spawn("Xvfb", [
  //   ":99",
  //   "-screen",
  //   "0",
  //   "1920x1080x24",
  //   "&",
  // ]);

  // // Set display for the Python process
  // const env = { ...process.env, DISPLAY: ":99" };

  const pythonProcess = spawn("python3", ["app2.py", jobRole, location], {
    env,
  });

  let data = "";

  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stderr.on("data", (chunk) => {
    console.error(`Error: ${chunk}`);
  });

  pythonProcess.on("close", (code) => {
    // Stop Xvfb after the Selenium script completes
    // xvfbProcess.kill();

    // if (code !== 0) {
    //   console.error(`Python script exited with code ${code}`);
    //   console.error(`Error: ${errorData}`); // Log the error output
    //   return res.status(500).send({
    //     message: "Something went wrong!",
    //     error: errorData || `Python process exited with code ${code}`, // Include error details
    //   });
    // }

    if (code !== 0) {
      return res.status(500).send('Something went wrong!');
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
