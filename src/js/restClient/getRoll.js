const get = require('./get');

module.exports = function(id) {
    return get('/api/roll/' + id);
};
