const { response, request } = require('express');
const { required } = require('joi');
const gagsData = require('../data/gagsData');
const uuid = require('uuid-random');

// const Joi = require('joi');

const addGag = (gag) => {
    console.log(Object.keys(gag));
    
    let id = uuid();
    let uploaderName = gag.name
    let alt = gag.alt || "no alt" ;
    let title = gag.title || "no title";
    let photo = gag.photo;

    let newGag = {
        id: id,
        uploaderName: uploaderName,
        alt: alt,
        title: title,
        photo: photo
    }
    gagsData.addGag(newGag);
}


const router = (app) => {
    
    app.get('/gags', (request, response) => {      
        response.status(200).send(gagsData.readGags());
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