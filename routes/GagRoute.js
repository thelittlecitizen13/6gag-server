const gags = require('../data/data').images;

const router = (app) => {
    app.get('/gags', (request, response) => {
        response.status(200).send(gags);
    });
}

module.exports = router;