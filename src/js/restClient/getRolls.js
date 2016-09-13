const get = require('./get');

module.exports = function() {
    return get('/api/roll');
};
