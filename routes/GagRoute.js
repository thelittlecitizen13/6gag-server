const { response, request } = require('express');
const { required } = require('joi');
const gagsData = require('../data/gagsData');
const uuid = require('uuid-random');
const e = require('express');

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
        liked: 0,
        disliked: 0,
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
        addGag(request.body);
        response.status(200);
        response.end();
    });
    app.post('/gags/:id/rate', (request, response) =>{
        var id = request.params.id;
        console.log(id);
        
        let result = gagsData.rateGag(id, request.body);
        if (result)
        {
            response.status(200);
            response.end();
        }
        else
        {
            response.status(400);
            response.end();
        }
    });
}

module.exports = router;