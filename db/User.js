const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    admin: Boolean,
    googleId: {
        type: String,
        index: true,
        unique: true,
        sparse: true
    },
    created_at: Date,
    updated_at: Date
});


userSchema.statics.findOrCreate = function(query, user, callback) {
    this.find(query).exec((err, users) => {
        if (users.length === 0) {
            const newUser = User(user || query);
            newUser.save();
            users = [newUser];
            console.log('Authentication:', 'User Created');
        } else {
            console.log('Authentication:', 'User Found!');
        }

        callback(err, users[0]);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
