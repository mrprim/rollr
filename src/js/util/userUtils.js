function getName(user) {
    let name = 'Anonymous';
    if (user) {
        name = user.username || user.email || name;
    }
    return name;
}


module.exports = {
    getName
}
