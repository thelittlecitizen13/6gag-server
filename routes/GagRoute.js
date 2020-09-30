const { response, request } = require('express');

const gags = require('../data/data').images;
// const Joi = require('joi');

const getGag = (id) => {
    try{
        return gags.find(gag => parseInt(id) === parseInt(gag.id));
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const router = (app) => {
    app.get('/gags', (request, response) => {
        response.status(200).send(gags);
    });
    app.get('/gags/:id', (request, response) => {
        var id = request.params.id;
        var gag = getGag(id);
        if (gag)
        {
            response.status(200).send(gag);
        }
        else
        {
            response.status(404).send(`gag id ${id} not found`);
        }
    });
}

module.exports = router;