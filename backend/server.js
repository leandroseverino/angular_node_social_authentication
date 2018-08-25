var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var app = express();

// Models
var User = require('./models/User.js');
var Post = require('./models/Post.js');

// Endpoints
var auth = require('./auth.js');

mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());


app.get('/posts/:id', async (req, res) => {
    
    try {
       
        let author = req.params.id;
        let posts = await Post.find({author}, '-_id -__v');
        res.send(posts);

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
    
});

app.post('/posts', auth.checkAuthenticated, (req, res) => {
    
    let postData = req.body;
    postData.author = req.userId;

    let post = new Post(postData);

    post.save((err, result) => {
        if (err) {
            console.error('Saving post error !', post);
            res.sendStatus(500);
        }
    });     

    console.log('Post saved !', post);
    res.sendStatus(200);
    
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
            return res.sendStatus(401).send({
                message: 'User not found !'
            });
        }

        res.status(200).send({
            user: user
        });

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }

});


mongoose.connect('mongodb://admin:Admin01@ds125892.mlab.com:25892/pssocial', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('Connected to Mongo !!!');
    }
});

app.use('/auth', auth.router);

app.listen(process.env.PORT || 3000);


