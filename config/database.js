const mongoose = require('mongoose');
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
mongoose.connect(DB_HOST + '/' + DB_NAME, 
{
	useNewUrlParser: true
}, function (err) {
	if (err) {
		console.error('error while connecting to database', err);
            // exit app
        process.exit(1);
        }
    });
module.exports = mongoose;