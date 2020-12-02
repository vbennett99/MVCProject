const models = require('../models');

const { Pieces } = models;

const profilePage = (req, res) => {
  Pieces.PieceModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.render('profile', { csrfToken: req.csrfToken(), pieces: docs });
  });
};

const getPieces = (request, response) => {
  const req = request;
  const res = response;

  return Pieces.PieceModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured ' });
    }

    return res.json({ pieces: docs });
  });
};

//const getToken = (request, response) => {
//  const req = request;
//  const res = response;
//
//  const csrfJSON = {
//    csrfToken: req.csrfToken(),
//  };
//
//  res.json(csrfJSON);
//};

module.exports.profilePage = profilePage;
module.exports.getPieces = getPieces;
//module.exports.getToken = getToken;
