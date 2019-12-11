const handleHome = (req, res, db) => {
    db('users').select('name', 'email', 'entries')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json('no users found');
        })
}

module.exports = {
    handleHome: handleHome
}