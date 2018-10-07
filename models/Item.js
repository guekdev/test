const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  message: {
    type: String,
    required: true,

  },
  date: {
    type: Date,
    default: Date
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
