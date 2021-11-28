const express = require('express');
const path = require('path');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');


app.use(bodyParser.json({ limit: '50mb' }));


let server = https.createServer({
}, app)


server.listen(3000, function () {
    const d = new Date();
    const day = d.toLocaleDateString();
    const hrs = d.toLocaleTimeString();

    console.log("Started at: ", day, hrs)
    console.log('Listening Port:', 3000);
});