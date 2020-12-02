const models = require('../models');

const { Pieces } = models;

const searchPage = (req, res) => {
  res.render('search', { csrfToken: req.csrfToken() });
};

const searchPieces = (req, res) => {
  if (!req.body.searchTerm) {
    return res.status(400).json({ error: 'Please enter a search term' });
  }

  const searchData = {
    search: req.body.search,
  };

  return Pieces.PieceModel.findByOwner(searchData.search, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ pieces: docs });
  });
};

module.exports.searchPage = searchPage;
module.exports.searchPieces = searchPieces;
