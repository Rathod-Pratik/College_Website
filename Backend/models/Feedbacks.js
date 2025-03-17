const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    index: true 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    index: true 
  },
  rating: { 
    type: Number, 
    min: 1, 
    max: 5 
  },
  review: { 
    type: String 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
