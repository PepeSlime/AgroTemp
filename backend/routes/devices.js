const express = require('express');
const router = express.Router();
const Device = require('../models/deviceModel');

router.post('/data', (req, res) => {
  const { mac_address, temperature, humidity } = req.body;
  if (!mac_address || temperature === undefined || humidity === undefined) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }
  Device.saveData(mac_address, temperature, humidity, err => {
    if (err) return res.status(500).json({ error: 'Erro ao salvar dados' });
    res.status(201).json({ message: 'Dados recebidos com sucesso' });
  });
});

router.post('/register', (req, res) => {
  const { mac_address, name } = req.body;
  if (!mac_address || !name) {
    return res.status(400).json({ error: 'MAC Address e nome são obrigatórios' });
  }
  Device.create(mac_address, name, err => {
    if (err) return res.status(500).json({ error: 'Erro ao cadastrar dispositivo' });
    res.status(201).json({ message: 'Dispositivo cadastrado com sucesso' });
  });
});

router.get('/', (req, res) => {
  Device.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar dispositivos' });
    res.json(results);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });
  Device.update(id, name, err => {
    if (err) return res.status(500).json({ error: 'Erro ao editar dispositivo' });
    res.json({ message: 'Dispositivo atualizado com sucesso' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Device.delete(id, err => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir dispositivo' });
    res.json({ message: 'Dispositivo excluído com sucesso' });
  });
});

module.exports = router;