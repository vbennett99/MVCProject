const models = require('../models');

const { Pieces } = models;

const searchPage = (req, res) => {
  res.render('search', { csrfToken: req.csrfToken() });
};

const search = (req, res) => {
  if (!req.body.searchTerm) {
    return res.status(400).json({ error: `attempted search for: ${req.body.searchTerm}` });
  }

  const searchData = {
    search: req.body.search,
    type: req.body.type,
  };

  console.log(searchData);

  return Pieces.PieceModel.findByOwner(searchData.search, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ pieces: docs });
  });
};

module.exports.searchPage = searchPage;
module.exports.search = search;
