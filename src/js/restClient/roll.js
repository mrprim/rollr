const post = require('./post');

module.exports = function(req) {
    return post('/api/roll/',req);
};
