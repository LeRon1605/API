const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();
const mongoClient = require('mongoose');
// Import Routes
const userRoute = require('./Routes/user');
const deckRoute = require('./Routes/deck');

const bodyParser = require('body-parser');

// Connect to mongoDB
mongoClient.connect('mongodb://localhost:27017/nodejs', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
	.then(() => console.log('Connect successfully to MongoDB!!'))
	.catch((err) => console.log(`Connect failure to MongoDB: ${err}`))
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// Routes
app.use('/user', userRoute);
app.use('/deck', deckRoute);
// Catch 404 error
app.use((req, res, next) => {
	const err = new Error('Not Found Page');
	err.status = 404;
	next(err);
})
// Error handler function
app.use((err, req, res, next) => {
	console.log(err);
	const error = (app.get('env') === 'development') ? err : {};
	const status = err.status || 500;

	return res.status(status).json({
		error: {
			message: error.message
		}
	})
})
app.listen(port, () => {
	console.log('Listening on port', port);
})