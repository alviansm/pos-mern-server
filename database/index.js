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

const MONGO_URI = "mongodb://localhost:27017/myapp"
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('open', () => {
	console.log("Local database ready...");
});


module.exports = db;
