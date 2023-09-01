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

// addPost
router.put('/', async(req, res) => {
    try{
        if(!req.body.title || !req.body.content){
            res.status(200).json({valid: false})
        } else{
            await Post.create({
                id: req.body.title,
                title: req.body.title,
                author_name: req.body.author_name,
                content: req.body.content,
                date: req.body.date,
                top_image_url: req.body.top_image_url,
                bottom_image_url: req.body.bottom_image_url,
            })
            res.status(200).json({valid: true})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

router.put('/:id', async(req, res) => {
    try{
        if(!req.body.data){
            res.status(200).json({valid: false})
        } else{
            let data = req.body.data;
            
            const post = await Post.findOne({ id: data.id });
            post.id = (data.title).toLowerCase(),
            post.title = data.title;
            post.author_name = data.author_name;
            post.content = data.content;
            post.top_image_url = data.top_image_url;
            post.bottom_image_url = data.bottom_image_url;
            post.save()
            
            res.status(200).json({valid: true})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router
