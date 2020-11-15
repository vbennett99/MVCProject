const models = require('../models');

const { Pieces } = models;

const uploadPage = (req, res) => {
  res.render('upload', { csrfToken: req.csrfToken() });
};

const makePiece = (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.status(400).json({ error: 'All pieces must at least have a title and a body.' });
  }

  const pieceData = {
    title: req.body.title,
    tags: req.body.tags,
    body: req.body.body,
    author: req.session.account._id,
  };

  const newPiece = new Pieces.PieceModel(pieceData);

  const piecePromise = newPiece.save();

  piecePromise.then(() => res.json({ redirect: '/profile' }));

  piecePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'A piece by that title already exists' });
    }

    return res.status(400).json({ error: 'An error as occurred' });
  });

  return piecePromise;
};

module.exports.uploadPage = uploadPage;
module.exports.make = makePiece;
