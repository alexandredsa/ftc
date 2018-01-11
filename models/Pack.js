const mongoose = require('mongoose');

const PackSchema = new mongoose.Schema({
  name: {
    type: String
  },
  constant: {
    type: String,
    enum: ['CANTAGALO', 'TUIUTI', 'ITAPURA', 'BLACK_SLUDGE'],
    required: true,
    index: true
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

PackModel.open = (constant) => {
  
};

PackModel.openCantagalo = () => {
  
}

PackModel.openTuiuti = () => {
  
}

PackModel.openItapura = () => {
  
}

PackModel.openBlackSludge = () => {
  
}

module.exports = PackModel;