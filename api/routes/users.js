const express = require('express')
const router = express.Router()

const User = require('../models/User')

const bcrypt = require('bcrypt');
const saltRounds = 10;

function hashAsync(req) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                let password = hash;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body.email, salt, async function(err, hash) {
                        let id = hash;
                        await User.create({
                            id: id,
                            email: req.body.email,
                            password: password,
                        })
                    });
                });
            });
        });
    })
}

function compareAsync(req, db) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(req, db, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

// addUser
router.put('/', async(req, res) => {
    try{
        const existingUser = await User.findOne({ email: req.body.email });
        
        if(existingUser !== null) {
            res.status(200).json({valid: false})
        } else{
            hashAsync(req)
            res.status(200).json({valid: true})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// checkUser
router.post('/', async(req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user !== null){
            const compare = await compareAsync(req.body.password, user.password)
            if(compare == true){
                let random = (Math.random() + 1).toString(36);
                const token = await bcrypt.hash(random, saltRounds)

                user.token = token;
                user.save();

                res.status(200).json({valid: true, id: user.id, token: random});
            } else{
                res.status(200).json({valid: false})
            }
        }else{
            res.status(200).json({valid: false})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// getUserLoginStatus
router.post('/:id', async(req, res) => {
    try{
        const user = await User.findOne({ id: req.params.id })
        const compare = await compareAsync(req.body.token, user.token)
        if(compare == true){
            res.status(200).json({valid: true, email: user.email})
        } else{
            res.json({valid: false})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router