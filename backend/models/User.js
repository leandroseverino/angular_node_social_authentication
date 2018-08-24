var moongose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');  

let userSchema = new moongose.Schema({
    email: String,
    password: String,
    name: String,
    description: String 
});

userSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err){
            return next(err);
        } 

        user.password = hash;
        next();
    })
});

module.exports = moongose.model('User', userSchema);