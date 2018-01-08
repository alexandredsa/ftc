const mongoose = require('mongoose');

const NationalitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  flag_url: {
    type: String
  }
}, {
  versionKey: false
});

NationalityModel = mongoose.model('Nationality', NationalitySchema);

module.exports = NationalityModel;