const router = require('express').Router();
let Playlist = require('../models/playlist.model');

router.route('/').get((req, res) => {
  Playlist.find()
    .then(playlists => res.json(playlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const link = req.body.link;
  const emotion = Number(req.body.emotion);
  const age = Number(req.body.age);

  const newPlaylist = new Playlist({
    link,
    emotion,
    age,
    clean
  });

  newPlaylist.save()
  .then(() => res.json('Playlist added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:score').get((req, res) => {
  Playlist.find({emotion: req.params.score})
    .then(
      playlists => res.json(playlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/clean/:score').get((req, res) => {
  Playlist.find({emotion: req.params.score, clean: True})
    .then(
      playlists => res.json(playlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Playlist.findByIdAndDelete(req.params.id)
    .then(playlists => res.json(playlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Playlist.findById(req.params.id)
    .then(playlist => {
      playlist.link = req.body.link;
      playlist.emotion = Number(req.body.emotion);
      playlist.age = Number(req.body.age);

      playlist.save()
        .then(() => res.json('Playlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
