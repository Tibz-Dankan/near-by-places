const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.get("/near-by-places", (req, res) => {
  console.log("req.query");
  console.log(req.query);
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
