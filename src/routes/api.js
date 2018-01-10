// dependencies
const express = require('express');

// models
const Story = ('../models/story');
const Comment = require('place the path here');  // <- place path for comment.js from this directory here

const router = express.Router();

// api endpoints
router.get('/whoami', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});

router.get('/user', function(req, res) {
    res.send({
         _id: 'anonid',
        name: 'Anonymous',
        last_post: 'Anon was here'
    });
});


router.get('/stories', function(req, res) {
    // CODE TGT: 
    // Find all the stories in the database
    // Send an empty response: this is necessary
});

router.post('/story', function(req, res) {
    // CODE TGT: Create a new story with the "content" parameter
    // Question: Do we get content with req.body.content or req.query.content?
});

router.get('/comment', function(req, res) {
    // CODE: Fetch the comments that have the parent given in the "parent" parameter
    // Question: Do we get parent with req.body.parent or req.query.parent?
    Comment.find({ parent: /* input the parent parameter here */ }, function(err, comments) {
        res.send(comments);
    });
});

router.post('/comment', function(req, res) {
    // CODE: populate the parent and content keys below
    const newComment = new Comment({
        'creator_id':'anonid',
        'creator_name':'Anonymous',
        'parent': /* remove this comment and add the parameter "parent" from the request */,
        'content': /* remove this comment and add the parameter "content" from the request */
    });

    // CODE: save the comment
    // your code goes here
    
    res.send({});
});

module.exports = router;
