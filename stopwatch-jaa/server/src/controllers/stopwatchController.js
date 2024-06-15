// server/src/controllers/stopwatchController.js
const Stopwatch = require('../models/Stopwatch');

exports.startStopwatch = async (req, res) => {
  try {
    const stopwatch = new Stopwatch({ startTime: new Date() });
    await stopwatch.save();
    res.status(201).json(stopwatch);
  } catch (error) {
    res.status(500

).json({ error: error.message });
  }
};

exports.stopStopwatch = async (req, res) => {
  try {
    const { id } = req.body;
    const stopwatch = await Stopwatch.findById(id);
    if (!stopwatch) {
      return res.status(404).json({ error: 'Stopwatch not found' });
    }
    stopwatch.endTime = new Date();
    await stopwatch.save();
    res.status(200).json(stopwatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.lapStopwatch = async (req, res) => {
  try {
    const { id } = req.body;
    const stopwatch = await Stopwatch.findById(id);
    if (!stopwatch) {
      return res.status(404).json({ error: 'Stopwatch not found' });
    }
    stopwatch.laps.push(new Date());
    await stopwatch.save();
    res.status(200).json(stopwatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetStopwatch = async (req, res) => {
  try {
    const { id } = req.body;
    const stopwatch = await Stopwatch.findByIdAndDelete(id);
    if (!stopwatch) {
      return res.status(404).json({ error: 'Stopwatch not found' });
    }
    res.status(200).json({ message: 'Stopwatch reset' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};