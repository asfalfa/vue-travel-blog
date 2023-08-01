const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

//FETCHES
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find()
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.post('/', async(req, res) => {
    try{
        const post = await Post.findOne({ id: req.body.id });
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router
