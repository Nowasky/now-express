import * as WebSocket from 'ws';

const express = require("express");
const app = express();

const port = 5000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Body parser
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
  res.setHeader("Content-Security-Policy", "frame-src https://bit.ly; report-uri /report");
  res.sendFile('views/index.html', {root: __dirname })
});

app.post("/report", (req,res) => {
  console.log(req.body)
  ws.send('CSP report: ' + req.body);
  return res.send('CSP violation report received');
});

// Listen on port 5000
app.listen(port, () => {
  console.log(`Server is listening on port 5000`);
});
