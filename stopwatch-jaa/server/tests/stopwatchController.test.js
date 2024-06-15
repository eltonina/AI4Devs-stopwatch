// server/tests/stopwatchController.test.js
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Stopwatch = require('../src/models/Stopwatch');

describe('Stopwatch API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let stopwatchId;

  test('should start the stopwatch', async () => {
    const response = await request(app).post('/api/stopwatch/start');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    stopwatchId = response.body._id;
  });

  test('should record a lap', async () => {
    const response = await request(app).post('/api/stopwatch/lap').send({ id: stopwatchId });
    expect(response.status).toBe(200);
    expect(response.body.laps).toHaveLength(1);
  });

  test('should stop the stopwatch', async () => {
    const response = await request(app).post('/api/stopwatch/stop').send({ id: stopwatchId });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('endTime');
  });

  test('should reset the stopwatch', async () => {
    const response = await request(app).post('/api/stopwatch/reset').send({ id: stopwatchId });
    expect(response.status).toBe(200);
  });
});
