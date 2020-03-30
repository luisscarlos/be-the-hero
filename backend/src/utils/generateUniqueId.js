// Gera um id com 4 digitos aleatórios.

const crypto = require('crypto');

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}