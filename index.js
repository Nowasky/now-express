import * as http from 'http';
//import * as WebSocket from 'ws';

const webs = require("ws")
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
  ws.send('CSP report: ' + req.body);
  return res.send('CSP violation report received');
});

// Listen on port 5000
var server = app.listen(port, () => {
  console.log(`Server is listening on port 5000`);
});

const wss = new webs.Server({ server });

wss.on('connection', (ws: webs) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});
