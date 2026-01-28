const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(process.env.APP_VERSION || "Stable Version");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const port = 3000;
app.listen(port, () => console.log(`Running on ${port}`));
