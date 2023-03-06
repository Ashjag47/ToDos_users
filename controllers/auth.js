const authService = require('../services/auth');
const { HTTPError } = require('../utils/errors');

const createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const user = await authService.createUser(name, email, password);
        res.status(201).json(user);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const token = await authService.loginUser(email, password);
        res.status(200).json(token);
    }
    catch (err) {
        if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ message: err.message });
    }
}
module.exports = { createUser, loginUser };

// exports.validateToken = async (req, res) => {
//   const token = req.header('token');
//   console.log("token",token)
//   if(!token) {
//     res.status(401).json({ message: 'Invalid token' });
//   }

//   try {
//     console.log("token",token)
//     const user = await authService.validateToken(token);
//     console.log("user",user)
//     const savedToken = await redisClient.get(user.email);
//     if (savedToken !== token) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//     res.status(200).json(user);
//   }
//   catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// }