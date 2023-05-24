const router = require('express').Router()
const userModel = require('../models/userModel')
const authMiddleware= require('../middleware/authMiddleware')

router.post('/register', userModel.registerUser)

router.post('/login', userModel.loginUser)

router.get('/users', authMiddleware, userModel.getUsers)

module.exports= router