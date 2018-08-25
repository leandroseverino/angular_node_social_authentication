var moongose = require('mongoose');

let postSchema = new moongose.Schema({
    message: String,
    author: { type: moongose.Schema.Types.ObjectId, ref: 'User'}
});

// userSchema.pre('save', function(next) {
//     let user = this;

//     if (!user.isModified('password')) {
//         return next();
//     }

//     bcrypt.hash(user.password, null, null, (err, hash) => {
//         if (err){
//             return next(err);
//         } 

//         user.password = hash;
//         next();
//     })
// });

module.exports = moongose.model('Post', postSchema);