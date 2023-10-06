const express = require('express');
const router = express.Router();
const multer  = require('multer')

const DIR = './public/';

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

router.post('/', upload.array('files', 10), async(req, res) => {
    try{
        const reqFiles = [];
        const url = req.protocol + '://' + req.get('host');

        for (var i = 0; i < req.files.length; i++) {
          reqFiles.push(url + '/public/' + req.files[i].filename)
        }

        res.status(200).json(reqFiles);
    }catch(err){
        res.status(500).json({message: err.message});
    }   
})

module.exports = router