const express = require('express');
const { add } = require('./calculator');

function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/add', (req, res) => {
    const { a, b } = req.body;

    if (a === undefined || b === undefined || typeof a !== 'number' || typeof b !== 'number') {
      return res.status(400).json({ error: 'Both \'a\' and \'b\' must be valid numbers' });
    }

    try {
      const result = add(a, b);
      res.json({ result });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  return app;
}

module.exports = createApp;
