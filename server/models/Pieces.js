const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let PieceModel = {};

const convertID = mongoose.Types.ObjectId;
const setTitle = (title) => _.escape(title).trim();

const PieceSchema = new mongoose.Schema({
  title: { // title of the piece
    type: String,
    required: true,
    set: setTitle,
  },
  tags: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  author: { // Who wrote the piece
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

PieceSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  tags: doc.tags,
  body: doc.body,
});

PieceSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    author: convertID(ownerId),
  };

  return PieceModel.find(search).select('title tags body author').lean().exec(callback);
};

PieceModel = mongoose.model('Piece', PieceSchema);

module.exports.PieceModel = PieceModel;
module.exports.PieceSchema = PieceSchema;
