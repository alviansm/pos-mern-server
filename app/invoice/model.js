const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const invoiceSchema = Schema({
	sub_total: {
		type: Number,
		required: [true, "Mohon isi sub total"]
	},
	delivery_fee: {
		type: Number,
		required: [true, "Mohon isi ongkir (Ongkos kirim)"]
	},	
	delivery_address: {
		provinsi: {type: String, required: [true, "Silahkan isi provinsi"]},
		kabupaten: {type: String, required: [true, "Silahkan isi kabupaten"]},
		kecamatan: {type: String, required: [true, "Silahkan isi kecamatan"]},
		kelurahan: {type: String, required: [true, "Silahkan isi kelurahan"]},
	},
	total: {
		type: Number,
		required: [true, "Silahkan isi total harga"]
	},
	payment_status: {
		type: String,
		enum: ["waiting_payment", "paid"],
		default: "waiting_payment"
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	order: {
		type: Schema.Types.ObjectId,
		ref: "Order"
	}
}, {timestamps: true});

module.exports = model("Invoice", invoiceSchema);
