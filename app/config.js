const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

var secretKey = process.env.SECRET_KEY;

module.exports = {
	rootPath: path.resolve(__dirname, '..'),
	secretKey,
	serviceName: process.env.SERVICE_NAME,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
	dbCluster: process.env.DB_CLUSTER,
	dbCollection: process.env.DB_COLLECTION
}