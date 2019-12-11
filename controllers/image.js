const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6ede32fb1a4040aa9509839c2e29e2b8'
  })

  const handleApiCall = (req, res) => {
    const {input} = req.body;
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