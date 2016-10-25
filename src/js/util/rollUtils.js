function getBBCode(roll) {
    let result = JSON.parse(roll.result);
    return '<a href="https://rollbox.herokuapp.com?roll=' + roll._id + '"></a>';
}


module.exports = {
    getBBCode
}
