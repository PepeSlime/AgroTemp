const express = require('express');
const router = express.Router();
const Device = require('../models/deviceModel');

router.post('/register', async (req, res) => {
  try {
    const { mac_address, name } = req.body;
    const result = await Device.create(mac_address, name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const devices = await Device.getAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Device.update(id, name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Device.delete(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/data', async (req, res) => {
  try {
    const { mac_address, temperature, humidity } = req.body;
    const result = await Device.saveData(mac_address, temperature, humidity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
