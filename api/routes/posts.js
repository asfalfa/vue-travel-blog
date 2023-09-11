const express = require('express');
const router = express.Router();
const multer  = require('multer')

const DIR = './public/';
const Post = require('../models/Post');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

//FETCHES
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

router.post('/', async(req, res) => {
    try{
        const post = await Post.findOne({ id: req.body.id });
        res.json(post);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

// addPost
router.put('/', 
    upload.fields([{
        name: 'covers', maxCount: 2,
    },{
        name: 'gallery', maxCount: 10,
    }]), async(req, res) => {
    try{
        if(!req.body.title){
            res.status(500).json({valid: false});
        } else{
            const url = req.protocol + '://' + req.get('host');

            const gallery = [];
            const covers = [];
    
            for (var i = 0; i < req.files.gallery.length; i++) {
                gallery.push(url + '/public/' + req.files.gallery[i].filename)
            }
            for (var i = 0; i < req.files.covers.length; i++) {
                covers.push(url + '/public/' + req.files.covers[i].filename)
            }

            let data = req.body;
            await Post.create({
                id: (data.title).toLowerCase(),
                title: data.title,
                author_name: data.author_name,
                category: data.category,
                content: data.content,
                date: data.date,
                covers: covers,
                gallery: gallery,
            });
            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

router.put('/:id', async(req, res) => {
    try{
        if(!req.body.data){
            res.status(200).json({valid: false})
        } else{
            let data = req.body.data;
            
            const post = await Post.findOne({ id: data.id });
            post.id = (data.title).toLowerCase();
            post.title = data.title;
            post.author_name = data.author_name;
            post.category = data.category;
            post.content = data.content;
            post.top_image_url = data.top_image_url;
            post.bottom_image_url = data.bottom_image_url;
            post.gallery = data.gallery;
            post.save();
            
            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router
