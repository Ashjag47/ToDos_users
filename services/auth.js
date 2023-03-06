const bcrypt = require('bcrypt');
const db = require('../database/models/index');
const jwt = require('jsonwebtoken');
const { HTTPError } = require('../utils/errors');

const createUser = async (name, email, password) => {
    const userExists = await db.Users.findOne({ where: { email } });
    if (userExists) throw new HTTPError(400, 'User already exists');
  const hash = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    password: hash,
  };
  const result = await db.Users.create(user);
  return result;
}

const loginUser = async (email, password) => {
  const user = await db.Users.findOne({ where: { email } });
  if (!user) {
    throw new HTTPError(404,'User not found');
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new HTTPError(401,'Password is incorrect');
  }
  
  const jwtToken = jwt.sign(payload, 'secret', { expiresIn: '1h' });
  await redisClient.set(email, jwtToken);
  return jwtToken;
};

module.exports = { createUser, loginUser };

// exports.validateToken = async (token) => {
//     console.log("tokenserv:",token)

//         const decoded = jwt.verify(token, 'secret');
//         console.log(decoded.email)

//   const user = await db.Users.findOne({ where: { email: decoded.email } });
//   if(!user) {
//     throw new HTTPError(401,'User not found');
//   }
//   const savedToken = await redisClient.get(user.email);
//   if (savedToken !== token) {
//     throw new HTTPError(401,'Invalid token');
//   }
  
//   return user;
// }