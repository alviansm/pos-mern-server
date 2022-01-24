const mongoose = require('mongoose');

// atlas connection
// mongoose.connect(MONGODB_URI);
// const db = mongoose.connection;
// 
// db.on('open', () => {
// 	console.log("Atals database ready");
// });

// local, changed to production -> heroku
// mongoose.connect(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('open', () => {
	console.log("Local database ready...");
});


module.exports = db;
