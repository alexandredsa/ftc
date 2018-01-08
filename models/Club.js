const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String
  },
  logo_url: {
    type: String
  }
}, {
  versionKey: false
});

ClubModel = mongoose.model('Club', ClubSchema);


module.exports = ClubModel;