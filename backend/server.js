var express = require('express');
var bcrypt = require('bcrypt-nodejs');  

var User = require('./models/User.js');

var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var app = express();

mongoose.Promise = Promise;

var posts = [
    {message: 'hello'},
    {message: 'world'}
 ];

 app.use(cors());
 app.use(bodyParser.json());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.get('/users', async (req, res) => {
    
    try {

        var users = await User.find({}, '-password -__v');
        res.send(users);    

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    
});

app.get('/profile/:id', async (req, res) => {
    
    try {

        var user = await User.findById(req.params.id, '-password -__v');
        
        if (!user) {
            return res.sendStatus(401).send({message: 'User not found !'});
        }
    
        res.status(200).send({user: user});

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    
});

app.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData);

    user.save((err, result) => {
        if (err) {
            console.error('Saving user error !', userData, user);
            res.sendStatus(500);
        }
    });

    console.log('User saved !', userData, user);
    res.sendStatus(200);
});


app.post('/login', async (req, res) => {
    var loginData = req.body;

    var user = await User.findOne({email: loginData.email});
    
    if (!user) {
        return res.sendStatus(401).send({message: 'Email or Password invalid !'});
    }
    
    console.log('User......', user);

    bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        if (!isMatch) {
            console.log('no match');
            return res.sendStatus(401).send({message: 'Password dont match !'});    
        }

        console.log('user match');
        var payload = {};
        var token = jwt.encode(payload, '123');

        res.status(200).send({token: token});
    });    

    
});

mongoose.connect('mongodb://admin:Admin01@ds125892.mlab.com:25892/pssocial', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Connected to Mongo !!!');
    }
});

app.listen(3000);