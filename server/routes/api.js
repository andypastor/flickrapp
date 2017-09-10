const express = require('express');
const router = express.Router();

// Declare axios for HTTP request
const axios = require('axios');
const API = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

// Get API listing
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all posts
router.get('/images', (req, res) => {
    // Get posts from the api
    axios.get(`${API}`)
    .then(posts => {
        res.status(200).jsonp(posts.data);
    }).catch(error => {
        res.status(500).send(error);
    });
});

// Search images by tag
router.get('/search/:tags', (req, res) => {
    // Get posts from the api
    axios.get(`${API}&tags=${req.params.tags}`)
    .then(posts => {
        res.status(200).jsonp(posts.data);
    }).catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;