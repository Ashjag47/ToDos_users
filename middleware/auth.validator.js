const JWT = require('jsonwebtoken');
const Joi = require('joi');
const { Lists } = require("../database/models");

const { HTTPError } = require('../utils/errors');

const JWTVaidator = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader;
		if (!token) throw new HTTPError(401, 'Access denied');
		const verifiedData = JWT.verify(token, 'secret');
		const { error } = Joi.object({ id: Joi.number().required(), email: Joi.string().email({ tlds: { allow: false } }), iat: Joi.number().required(), exp: Joi.number().required() }).validate(verifiedData);
		if (error) throw new HTTPError(401, 'Invalid Token');
		console.log(verifiedData);
		req.user = verifiedData;
		next();
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(400).json({ message: err.message });
	}
};

const listValidator = async (req, res, next) => {
	try {
		const list = await Lists.findOne({ where: { id: req.params.listId } });
		if (list.userId!=req.user.id ) throw new HTTPError(404, 'Access denied');
		next();
	} catch (err) {
		if (err instanceof HTTPError) return res.status(err.statusCode).json({ message: err.message });
		res.status(400).json({ message: err.message });
	}
};


module.exports = { JWTVaidator, listValidator };