const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  eligibility: {
    maxIncome: { type: Number, default: null },
    state: { type: String, default: 'All' },
    category: { type: String, default: 'All' }
  },
  url: { type: String, default: '' },
  benefitAmount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
