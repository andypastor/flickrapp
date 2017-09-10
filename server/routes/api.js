const express = require('express');
const router = express.Router();
const dJSON = require('dirty-json');

// Declare axios for HTTP request
const axios = require('axios');
const API = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

// Get API listing
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all images
router.get('/images', (req, res) => {
    // Get images from the api
    axios.get(`${API}`)
    .then(posts => {
        if(typeof(posts.data) == 'string'){
            var data = dJSON.parse(posts.data).then(function (r) {            
                console.log(JSON.stringify(r));
                res.status(200).json(r);
            });
        }        
        else{
            res.status(200).json(posts.data);
        }
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

// Search images by tag
router.get('/search/:tags', (req, res) => {
    // Get images from the api
    axios.get(`${API}&tags=${req.params.tags}`)
    .then(posts => {        
        if(typeof(posts.data) == 'string'){
            var data = dJSON.parse(posts.data).then(function (r) {            
                console.log(JSON.stringify(r));
                res.status(200).json(r);
            });
        }        
        else{
            res.status(200).json(posts.data);
        }        
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;