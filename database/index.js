const mongoose = require('mongoose');
const {dbUser, dbPass, dbCluster, dbCollection} = require('../app/config');

// atlas connection
// mongoose.connect(MONGODB_URI);
// const db = mongoose.connection;
// 
// db.on('open', () => {
// 	console.log("Atals database ready");
// });

// local, changed to production -> heroku
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('open', () => {
	console.log("Local database ready...");
});


module.exports = db;
