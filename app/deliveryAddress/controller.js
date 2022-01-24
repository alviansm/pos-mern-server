const {police_check} = require('../../middlewares');
const DeliveryAddress = require('./model');
const {policyFor} = require('../../utils');

const index = async (req, res, next) => {
	try {
        let {skip=0, limit=10} = req.query;
		let count = await DeliveryAddress.find({user: req.user_id}).countDocuments();
		let address =
			await DeliveryAddress
			.find({user: req.user._id})
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.sort('createdAt');
			return res.json({
				data: address,
				count
			});
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			})
		}
		next(err);
	}
}

const store = async (req, res, next) => {
	try {
		let payload = req.body;
        console.log("Payload: ", payload);
        let user = req.user;
		let address = new DeliveryAddress({...payload, user: user._id});
		await address.save();
		return res.json({
			address
		});
	} catch (err) {
        console.log("Terdapat kesalahan");
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			})
		}
		next(err);
	}
}

const update = async (req, res, next) => {
	try {
		let {_id, ...payload} = req.body;
		let {id} = req.params;
		let address = await DeliveryAddress.findById(id);
		let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
		let policy = policyFor(req.user);
		if (!policy.can('update', subjectAddress)) {
			return res.json({
				error: 1,
				message: `Anda tidak diperkenankan mengubah alamat :(`
			})
		}
		// otherwise -> success (update)
		address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true});
		res.json(address);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			});
		}
		next(err);
	}
}

const destroy = async (req, res, next) => {
	try {
		let {id} = req.params;
		let address = await DeliveryAddress.findById(id);
		let subjectAddress = subject('DeliveryAddress', {...address, user_id: address.user});
		let policy = policyFor(req.user);
		if (!policy.can('delete', subjectAddress)) {
			return res.json({
				error: 1,
				message: `Anda tidak diperkenankan menghapus alamat :(`
			});
		}
		// otherwise -> success (delete)
		address = await DeliveryAddress.findByIdAndDelete(id);
		res.json(address);
	} catch (err) {
		if (err && err.name === "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			})
		}
		next(err);
	}
} 

module.exports = {
	store,
	index,
	update,
	destroy
}
