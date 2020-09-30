const express = require('express');
const bodyParser = require('body-parser');
const gagRouter = require('../routes/GagRoute');
const port = 8080; // ToDo: set in configuration file
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

gagRouter(app);
app.use((request, response) => {
    response.status(404).send("URL Not Found");
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});