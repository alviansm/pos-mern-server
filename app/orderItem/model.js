const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const orderItemSchema = Schema({
	name: {
		type: String,
		minlength: [5, "Panjang nama makanan minimal 5 karakter"],
		required: [true, "Nama makanan tidak boleh kosong"]
	},
	price: {
		type: Number,
		required: [true, "Harga item tidak boleh kosong"]
	},
	qty: {
		type: Number,
		required: [true, "Kuantitas tidak boleh kosong"],
		min: [1, "Kuantitas setidaknya 1"]
	},
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product"
	},
	order: {
		type: Schema.Types.ObjectId,
		ref: "Order"
	},
});

module.exports = model("OrderItem", orderItemSchema);