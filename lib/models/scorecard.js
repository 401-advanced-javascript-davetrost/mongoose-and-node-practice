const mongoose = require('mongoose');
const { Schema } = mongoose;

const scorecardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
    enum: ['Orchard Park', 'Qorvo DGC', 'Milo McIver West', 'Milo McIver East'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
  },
  holeScores: [{
    type: Number,
    min: 1,
  }],
  puttingPercentages: {
    circleOnePutting: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    circleTwoPutting: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0,
    }
  },
  isRatedRound: {
    type: Boolean,
    default: false,
  },
});

module.exports = { scorecardSchema };