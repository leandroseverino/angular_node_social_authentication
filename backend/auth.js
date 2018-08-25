var User = require('./models/User.js');
var bcrypt = require('bcrypt-nodejs');  
var jwt = require('jwt-simple');
var express = require('express');
var router = express.Router();

router.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData);

    user.save((err, newUser) => {
        if (err) {
            console.error('Saving user error !', userData, user);
            return res.status(500).send({message: 'Error saving user !'});
        }

        console.log('User saved !', userData, newUser);

        storeAndSendToken(res, newUser);

    });

});

router.post('/login', async (req, res) => {
    var loginData = req.body;

    var user = await User.findOne({email: loginData.email});
    
    if (!user) {
        return res.status(401).send({message: 'Email or Password invalid !'});
    }
    
    console.log('User......', user);

    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            console.log('no match');
            return res.status(401).send({message: 'Password dont match !'});    
        }

        storeAndSendToken(res, user);
    });    
});

function storeAndSendToken(res, user) {

    var payload = { sub: user._id };
    var token = jwt.encode(payload, 'n0d3.j5');
    res.status(200).send({token: token});
}

var auth = {
    router, 
    checkAuthenticated: (req, res, next) => {
        if (!req.header('Authorization')) {
            return res.status(401).send({message: 'Unauthorized User, Missing Auth Header !'});
        }
    
        let token = req.header('Authorization').split(' ')[1];
        let payload = jwt.decode(token, 'n0d3.j5');
    
        if (! payload) {
            return res.status(401).send({message: 'Unauthorized User, Header Invalid !'});
        }
    
        req.userId = payload.sub;
    
        next();
    }
}

module.exports = auth;