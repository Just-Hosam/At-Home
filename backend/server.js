// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

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

// Separated Routes for each Resource
const usersRouter = require('./routes/users.js');
const usersDashboardsRouter = require('./routes/users-dashboards.js');
const dashboardsUsersRouter = require('./routes/dashboards-users.js');
const groceriesRouter = require('./routes/groceries.js');
const photosRouter = require('./routes/photos.js');

const pollsRouter = require('./routes/polls.js');
const eventsRouter = require('./routes/events.js');
const recipesRouter = require('./routes/recipes.js');
const ingredientsRouter = require('./routes/ingredients.js');

// Mount all resource routes
app.use('/users', usersRouter);
app.use('/users/:userId/dashboards', usersDashboardsRouter);
app.use('/dashboards/:dashboardId/users', dashboardsUsersRouter);
app.use('/dashboards/:dashboardId/groceries', groceriesRouter);
app.use('/dashboards/:dashboardId/photos', photosRouter);
app.use('/dashboards/:dashboardId/polls', pollsRouter);
app.use('/dashboards/:dashboardId/events', eventsRouter);

app.use('/dashboards/:dashboardId/recipes', recipesRouter);
app.use(
	'/dashboards/:dashboardId/recipes/:recipeId/ingredients',
	ingredientsRouter
);

// Main routes
app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Final_Project listening on port ${PORT}`);
});
