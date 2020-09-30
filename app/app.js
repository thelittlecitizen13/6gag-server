const express = require('express');
const bodyParser = require('body-parser');
const gagRouter = require('../routes/GagRoute');
const cors = require('cors');


const port = 8080; // ToDo: set in configuration file
var app = express();

var coreOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(coreOptions));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

gagRouter(app);
app.use((request, response) => {
    response.status(404).send("URL Not Found");
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});