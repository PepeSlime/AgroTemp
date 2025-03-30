const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const deviceRoutes = require('./routes/devices');
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use('/api/devices', deviceRoutes);
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/agrotemp.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
