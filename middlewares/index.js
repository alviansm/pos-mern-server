const {getToken, policyFor} = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const User = require('../app/user/model');
const {subject} = require('@casl/ability');

function decodeToken() {
	return async function(req, res, next) {
		try {
			let token = getToken(req);

			if (!token) return next();	
			req.user = jwt.verify(token, config.secretKey);
			let user = await User.findOne({token: {$in: [token]}});
			
			if (!user) {
				res.json({
					error: 1,
					message: "Token kadaluarsa"
				});
			}
		} catch (err) {
			if (err && err.name === "JsonWebTokenError") {
				return res.json({
					error: 1,
					err: err
				});
			}
			next(err);
		}
		return next();
	}
}

// access authority 
function police_check(action, subject) {
	return function(req, res, next) {
		let policy = policyFor(req.user);
		if (!policy.can(action, subject)) {
			return res.json({
				error: 1,
				message: `Tidak diperkenankan melakukan ${action} ${subject}`
			});
		}
		next();
	}
}

module.exports = {
	decodeToken,
	police_check
}