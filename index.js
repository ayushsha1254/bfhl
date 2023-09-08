const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Dummy user data
const user = {
  full_name: "John Doe",
  dob: "17091999",
  email: "john@xyz.com",
  roll_number: "ABCD123",
};

// POST endpoint
app.post("/bfhl", (req, res) => {
  const requestData = req.body.data;
  const response = {
    is_success: true,
    user_id: `${user.full_name}_${user.dob}`,
    email: user.email,
    roll_number: user.roll_number,
    numbers: [],
    alphabets: [],
    highest_alphabet: [],
  };

  // Extract numbers and alphabets from the requestData
  requestData.forEach((item) => {
    if (typeof item === "string" && /^[A-Za-z]$/.test(item)) {
      response.alphabets.push(item);
      response.highest_alphabet = [item];
    } else if (!isNaN(item)) {
      response.numbers.push(item);
    }
  });

  res.json(response);
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to BFHL!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
