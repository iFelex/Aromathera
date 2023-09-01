const jwt = require('jsonwebtoken');
const secretKey = 'AromaThera.2019';

const users = [
  { id: 1, username: 'Daniel', password: 'querty20' },
  { id: 2, username: 'Andres', password: 'querty21' }
];

module.exports = {
  login: (username, password) => {
    const user = findUserByUsername(username);

    if (!user || !verifyPassword(user, password)) {
      return { success: false, message: 'Credenciales inválidas\n' };
    }

    const token = generateToken(user);
    return { success: true, token };
  }
};