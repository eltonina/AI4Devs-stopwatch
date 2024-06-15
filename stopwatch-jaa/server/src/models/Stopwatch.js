// server/src/models/Stopwatch.js
const mongoose = require('mongoose');

const StopwatchSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: false },
  laps: { type: [Date], required: false },
});

module.exports = mongoose.model('Stopwatch', StopwatchSchema);
