const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.json({ limit: '50mb' }));

//IMPORT INDEX ROUTES
app.use(require('./server/routes/index'));


let server = http.createServer({

}, app)

//redirect this routes into the front end build.
app.get(["/", "/registro", "/donadores", "/reportes"], (req, res) => {
    res.sendFile(path.join(__dirname, 'server', 'build', 'index.html'))
});

server.listen(3000, function () {
    const d = new Date();
    const day = d.toLocaleDateString();
    const hrs = d.toLocaleTimeString();

    console.log("Started at: ", day, hrs)
    console.log('Listening Port:', process.env.PORT || 3000);
});