const express = require("express");
const app = express();

const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
  res.setHeader("Content-Security-Policy", "frame-src https://bit.ly; report-uri /report");
  res.sendFile('views/index.html', {root: __dirname })
});

app.post("/report", (req,res) => {
  console.log(req.body)
  return res.send('CSP fail: Report received');
});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is listening on port 5000`);
});
