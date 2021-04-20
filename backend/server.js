// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = 8080;
const ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.enable('trust proxy');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

//web sockets
const server = require('http').createServer(app);
const cors = require('cors');
app.use(cors());

if(ENV !== 'production'){
const environment = 'http://localhost:3030'; // < -- frontend conn.
const io = require('socket.io')(server,{
	cors: {
		origin: environment,
		methods: ['GET', 'POST'],
	},
});

//create a socket.io connection
io.on('connection', (socket) => {
	const message = 'message';

	//listen for changes
  socket.on('input', (input) => {
    socket.broadcast.emit(message, input);
  });


	//disconnects socket with update message
	// socket.on("disconnect", () => {
	// io.emit(message, "A user has signed off the dashbaord");
	// });
});
}

// PG database client/connection setup
const db = require('./lib/db.js');
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(
	cookieSession({
		name: 'session',
		keys: ['Hosam', 'Nolan', 'Kyle'],
	})
);

// override for put, patch and delete methods
app.use(methodOverride('_method'));

// queries
const { checkUserByEmail } = require('./db/queries/user-queries');
const { addGrocery } = require('./db/queries/grocery-queries');

// Separated Routes for each Resource
const usersRouter = require('./routes/users.js');
const usersDashboardsRouter = require('./routes/users-dashboards.js');
const dashboardsUsersRouter = require('./routes/dashboards-users.js');
const groceriesRouter = require('./routes/groceries.js');
const photosRouter = require('./routes/photos.js');
const choresRouter = require('./routes/chores.js');
const pollsRouter = require('./routes/polls.js');
const eventsRouter = require('./routes/events.js');
const recipesRouter = require('./routes/recipes.js');
const ingredientsRouter = require('./routes/ingredients.js');
const emailRouter = require('./routes/send-mail.js');
// Mount all resource routes
app.use('/users', usersRouter);
app.use('/users/:userId/dashboards', usersDashboardsRouter);
app.use('/dashboards/:dashboardId/users', dashboardsUsersRouter);
app.use('/dashboards/:dashboardId/groceries', groceriesRouter);
app.use('/dashboards/:dashboardId/photos', photosRouter);
app.use('/dashboards/:dashboardId/chores', choresRouter);
app.use('/dashboards/:dashboardId/polls', pollsRouter);
app.use('/dashboards/:dashboardId/events', eventsRouter);
app.use('/dashboards/:dashboardId/recipes', recipesRouter);
app.use(
	'/dashboards/:dashboardId/recipes/:recipeId/ingredients',
	ingredientsRouter
);
app.use('/dashboards/:dashboardId/send-mail', emailRouter);
	

// Main routes
app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post('/voice', (req, res) => {
	const inputGrocery = req.body.inputGrocery;

	addGrocery(1, inputGrocery)
		.then((data) => {
			io.sockets.emit('message', 'groceries');
			res.json(data);
		})
		.catch((err) => console.log('error at voice', err));
});

app.post('/login', (req, res) => {
	const inputEmail = req.body.inputUser.email;
	const inputPassword = req.body.inputUser.password;

	checkUserByEmail(inputEmail, inputPassword)
		.then((data) => res.json(data))
		.catch((err) => console.log('Email/password is incorrect', err));
});

server.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});
