const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
})

const handleApiCall = (req, res) => {
    const { input } = req.body;
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))

}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('unable to get count');
        })
}

module.exports = {
    handleImage,
    handleApiCall
}