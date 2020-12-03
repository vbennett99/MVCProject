const models = require('../models');

const { Pieces } = models;
const { Account } = models;

const searchPage = (req, res) => {
  res.render('search', { csrfToken: req.csrfToken() });
};

const search = (req, res) => {
  if (!req.query.searchTerm) {
    console.log(req.body);
    return res.status(400).json({ error: 'No search term' });
  }

  const searchData = {
    search: req.query.searchTerm,
    type: req.query.searchType,
  };
  
  //Searching by title
  if(searchData.type === "title"){
    return Pieces.PieceModel.find({title: searchData.search}, (err, docs) => {
      if(err){
        console.log(err);
        return res.status(400).json({ error: 'An error occured' });
      }

      return res.json({ pieces: docs });
    });
  }
  
  //Searching by tag
  return Pieces.PieceModel.find({tags: searchData.search}, (err, docs) => {
    if(err){
      console.log(err);
      return res.status(400).json({ error: 'No search results' });
    }

    return res.json({ pieces: docs });
  });
}

module.exports.searchPage = searchPage;
module.exports.searchPieces = search;
