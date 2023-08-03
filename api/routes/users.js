const express = require('express')
const router = express.Router()

const User = require('../models/User')

// addUser
router.put('/', async(req, res) => {
    try{
        const users = await User.create({
            id: '', // hash a random number
            email: req.body.email,
            password: '', // hash a pw
        })
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// checkUser
router.post('/', async(req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

// getUserLoginStatus
router.post('/:id', async(req, res) => {
    try{
        const user = await User.findOne({ id: req.params.id })
        // compare the hash sent and the one saved in db

        res.status(200).json(user)
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

module.exports = router