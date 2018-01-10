const mongoose = require('mongoose');

const PackSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  logo_url: {
    type: String
  }
}, {
  versionKey: false
});


PackModel = mongoose.model('Pack', PackSchema);


module.exports = PackModel;