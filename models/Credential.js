const mongoose = require('mongoose');

const Credentialchema = new mongoose.Schema({
  login: {
    type: String,
    index: { unique: true }
  },
  password: {
    type: String
  },
  token: {
    type: String
  }
}, {
    versionKey: false
  });

CredentialModel = mongoose.model('Credential', Credentialchema);


module.exports = CredentialModel;