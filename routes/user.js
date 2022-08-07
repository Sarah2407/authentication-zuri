const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const usersController = require('../controllers/usersController');

router.post('/api/register', usersController.registerUser);

router.post('api/auth/login', 
        [
            check("email", "Please enter a valid email").isEmail(),
            check("password", "Please enter a correct password").exists()
        ], 
    usersController.loginUser
);


router.get('api/auth', auth, usersController.loggedInUser);

module.exports = router;