const mongoose = require('mongoose');
const User = require('./User');

function connect() {
    return new Promise((resolve, reject) => {
        var db = mongoose.connection;
        db.on('error', reject);
        db.once('open', resolve);
        mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');
    });
}

module.exports = {
    connect: connect,
    User: User
};
