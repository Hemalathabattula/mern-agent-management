const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
});

const listSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
  items: [itemSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model('List', listSchema);
