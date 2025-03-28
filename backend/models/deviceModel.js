const db = require('../config/db');

const Device = {
  create: (mac_address, name, callback) => {
    const query = 'INSERT INTO devices (mac_address, name) VALUES (?, ?)';
    db.query(query, [mac_address, name], callback);
  },
  getAll: callback => {
    const query = 'SELECT * FROM devices';
    db.query(query, callback);
  },
  update: (id, name, callback) => {
    const query = 'UPDATE devices SET name = ? WHERE id = ?';
    db.query(query, [name, id], callback);
  },
  delete: (id, callback) => {
    const query = 'DELETE FROM devices WHERE id = ?';
    db.query(query, [id], callback);
  },
  saveData: (mac_address, temperature, humidity, callback) => {
    const query = 'INSERT INTO device_data (mac_address, temperature, humidity) VALUES (?, ?, ?)';
    db.query(query, [mac_address, temperature, humidity], callback);
  }
};

module.exports = Device;