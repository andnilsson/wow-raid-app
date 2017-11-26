const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const clanSchema = new Schema({
  guestSignature: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  message: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
})
const Signature = mongoose.model('Signature', signatureSchema);

module.exports = Signature;