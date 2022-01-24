const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const bcrypt = require('bcrypt');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let userSchema = Schema({
	full_name: {
		type: String,
		required: [true, "Nama tidak boleh kosong"],
		maxlength: [255, "3 < Jumlah karakter < 255"],
		minlength: [3, "3 < Jumlah karakter < 255"]
	},
	customer_id: {
		type: Number,
	},
	email: {
		type: String,
		required: [true, "Email tidak boleh kosong"],
		maxlength: [255, "Kurangi jumlah karakter email" ]
	},
	password: {
		type: String,
		required: [true, "Kata sandi tidak boleh kosong"],
		maxlength: [255, "Kurangi jumlah karakter kata sandi"],
		minlength: [6, "Kata sandi terlalu pendek"]
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user"
	},
	token: [String]
}, {timestamps: true});

// email validation (regex method)
userSchema.path('email').validate(function(value) {
	const EMAIL_RE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return EMAIL_RE.test(value);
}, attr => `${attr.value} bukan email`);

// emaill register validation
userSchema.path('email').validate(async function(value) {
	try {
		// find User collection by email
		const count = await this.model('User').count({email: value});

		// email found -> false -> failed
		// not found -> true -> ok
		return (!count);
	} catch(err) {
		// if err throw err
		if (err && err.name == "ValidationError") {
			return res.json({
				error: 1,
				message: err.message,
				fields: err.errors
			});
		}
		next(err);
	}
}, attr => `${attr.value} sudah terdaftar`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND);
	next();
});

userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

module.exports = model("User", userSchema);