const express = require('express');
const router = express.Router();
const multer  = require('multer')
const fs = require('fs-extra');

const DIR = './public/post-attachments/temp';
const Post = require('../models/Post');
const { v4: uuidv4 } = require('uuid');

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

// getPosts
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

// getPostData
router.get('/:id', async(req, res) => {
    try{
        const post = await Post.findOne({ id: req.params.id });
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
            let data = req.body;
            
            const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
            const dir = req.body.title.toLowerCase().split(' ').join('-');;
            const url = req.protocol + '://' + req.get('host');

            const gallery = [];
            const covers = [];
    
            for (var i = 0; i < req.files.gallery.length; i++) {
                let result = (req.files.gallery[i].filename).match(imageReg);
                const uuid = uuidv4();
                gallery.push(url + '/public/post-attachments/' + dir + '/gallery/' + uuid + result[0])
                fs.move('./public/post-attachments/temp/' + req.files.gallery[i].filename, './public/post-attachments/' + dir + '/gallery/' + uuid + result[0], function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }
            for (var i = 0; i < req.files.covers.length; i++) {
                let result = (req.files.covers[i].filename).match(imageReg);
                const uuid = uuidv4();
                covers.push(url + '/public/post-attachments/' + dir + '/covers/' + uuid + result[0])
                fs.move('./public/post-attachments/temp/' + req.files.covers[i].filename, './public/post-attachments/' + dir + '/covers/' + uuid + result[0], function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
            }

            const categoryRegex = /([^,]+)/gm;
            let categoryArray = data.category.match(categoryRegex);
            for (let i = 0; i < categoryArray.length; i++){
                let result = (categoryArray[i]).toLowerCase().trim().split(' ').join('-');
                categoryArray[i] = result;
            }

            await Post.create({
                id: (data.title).toLowerCase().split(' ').join('-'),
                title: data.title,
                author_name: data.author_name,
                category: categoryArray,
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

// editPost
router.put('/:id',
    upload.fields([{
        name: 'covers', maxCount: 2,
    },{
        name: 'gallery', maxCount: 10,
    }]), async(req, res) => {
    try{
        if(!req.body){
            res.status(500).json({valid: false})
        } else{
            let data = req.body;
            const post = await Post.findOne({ id: data.id });

            const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
            const dir = post.title.toLowerCase().split(' ').join('-');
            const url = req.protocol + '://' + req.get('host');

            const gallery = [];
            const covers = [];
    
            if(req.files.gallery){
                for (var i = 0; i < req.files.gallery.length; i++) {
                    let result = (req.files.gallery[i].filename).match(imageReg);
                    const uuid = uuidv4();
                    gallery.push(url + '/public/post-attachments/' + dir + '/gallery/' + uuid + result[0])
                    fs.move('./public/post-attachments/temp/' + req.files.gallery[i].filename, './public/post-attachments/' + dir + '/gallery/' + uuid + result[0], function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
            }
            if(req.files.covers){
                for (var i = 0; i < req.files.covers.length; i++) {
                    let result = (req.files.covers[i].filename).match(imageReg);
                    const uuid = uuidv4();
                    covers.push(url + '/public/post-attachments/' + dir + '/covers/' + uuid + result[0])
                    fs.move('./public/post-attachments/temp/' + req.files.covers[i].filename, './public/post-attachments/' + dir + '/covers/' + uuid + result[0], function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                }
            }

            if(post.title !== data.title) {
                let newTitle = data.title.toLowerCase().split(' ').join('-');
                fs.copy('./public/post-attachments/' + dir, './public/post-attachments/' + newTitle, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                })
                setTimeout(() => { 
                    fs.rmdir('./public/post-attachments/' + dir, { recursive: true }); 
                }, 10000);
            }

            const categoryRegex = /([^,]+)/gm;
            let categoryArray = data.category.match(categoryRegex);
            for (let i = 0; i < categoryArray.length; i++){
                let result = (categoryArray[i]).toLowerCase().trim().split(' ').join('-');
                categoryArray[i] = result;
            }

            post.id = (data.title).toLowerCase().split(' ').join('-');
            post.title = data.title;
            post.author_name = data.author_name;
            post.category = categoryArray;
            post.content = data.content;
            for(var i = 0; i < covers.length; i++){
                post.covers.push(covers[i]);
            }
            for(var i = 0; i < gallery.length; i++){
                post.gallery.push(gallery[i]);
            }
            post.save();
            
            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

// removePost
router.delete('/:id', async(req, res) => {
    try{
        if(!req.body){
            res.status(200).json({valid: false})
        } else{
            const post = await Post.findOne({ id: req.params.id });

            fs.remove('./public/post-attachments/' + post.id, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
            post.remove();

            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

// movePostImage
router.put('/:id/image', async(req, res) => {
    try{
        if(!req.body.image){
            res.status(200).json({valid: false})
        } else{
            const url = req.protocol + '://' + req.get('host');
            const data = req.body;
            const post = await Post.findOne({ id: req.params.id });

            const image = (data.image).match(/\/([^\/]+)\/?$/)[1];
            const format = (image).match(/[\/.](gif|jpg|jpeg|tiff|png)$/)[0];
            const uuid = uuidv4();

            if(data.type == 'covers'){
                fs.move('./public/post-attachments/' + post.id + '/' + data.type + '/' + image, './public/post-attachments/' + post.id + '/gallery/' + uuid + format, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
                const link = url + '/public/post-attachments/' + post.id + '/gallery/' + uuid + format;
                (post.gallery).push(link);
            } else if(data.type == 'gallery'){
                fs.move('./public/post-attachments/' + post.id + '/' + data.type + '/' + image, './public/post-attachments/' + post.id + '/covers/' + uuid + format, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                });
                const link = url + '/public/post-attachments/' + post.id + '/covers/' + uuid + format;
                (post.covers).push(link);
            }

            let newArray = post[data.type];
            const deleteIndex = newArray.findIndex((el) => el == data.image);

            if (deleteIndex > -1) {
                newArray.splice(deleteIndex, 1);
            }
            post[data.type] = newArray;

            post.save();

            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

// removePostImage
router.delete('/:id/image', async(req, res) => {
    try{
        if(!req.body.image){
            res.status(200).json({valid: false})
        } else{
            const data = req.body;
            const post = await Post.findOne({ id: req.params.id });

            let newArray = post[data.type];
            const deleteIndex = newArray.findIndex((el) => el == data.image);
            fs.remove('./public/post-attachments/' + post.id + '/' + data.type + '/' + data.image.split("/").pop(), function (err) {
                if (err) {
                    return console.error(err);
                }
            });
            if (deleteIndex > -1) {
                newArray.splice(deleteIndex, 1);
            }
            post[data.type] = newArray;
            post.save();

            res.status(200).json({valid: true});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router
