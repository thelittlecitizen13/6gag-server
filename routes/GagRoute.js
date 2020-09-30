const { response, request } = require('express');
const { required } = require('joi');
const gagsData = require('../data/gagsData');
const uuid = require('uuid-random');

var gags = gagsData.readGags();

//const gags = require('../data/data').images;
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

const addGag = (gag) => {
    let id = uuid();
    let alt = gag.alt || "no alt" ;
    let title = gag.title || "no title";
    let photo = gag.photo;

    let newGag = {
        id: id,
        alt: alt,
        title: title,
        photo: photo
    }
    gagsData.addGag(newGag);
    gags = gagsData.readGags();
}


const router = (app) => {
    
    app.get('/gags', (request, response) => {      
        response.status(200).send(gags);
    });
    app.get('/gags/:id', (request, response) => {
        var id = request.params.id;
        var gag = gagsData.readGag(id);
        if (gag)
        {
            response.status(200).send(gag);
        }
        else
        {
            response.status(404).send(`gag id ${id} not found`);
        }
    });
    app.post('/gags/post', (request, response) => {
        //let gagAsString = JSON.stringify(request.body);
        //addGag(gagAsString);
        addGag(request.body);
    });
}

module.exports = router;