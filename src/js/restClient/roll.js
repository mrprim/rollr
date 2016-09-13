const get = require('./get');

module.exports = function(diceString) {
    return get('/api/roll/' + diceString);
};
