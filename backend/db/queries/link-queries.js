const db = require('../../lib/db.js');

const getDashboardsPerUser = (userId) => {
	const text = `
  SELECT dashboards.id, dashboards.name
  FROM links
  JOIN dashboards ON dashboard_id = dashboards.id
  WHERE users.id = $1`;
	const values = [userId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) =>
			console.log(`Error at links queries 'getDashboardsPerUser'`, err)
		);
};

const getUsersPerDashboard = (dashboardId) => {
	const text = `
	SELECT links.id as link_id, links.user_id, users.first_name, users.last_name, users.email, links.admin
	FROM links
  JOIN users ON user_id = users.id
	WHERE dashboard_id = $1
	ORDER BY first_name;`;
	const values = [dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows)
		.catch((err) =>
			console.log(`Error at links queries 'getUsersPerDashboard'`, err)
		);
};

const createLink = (userId, dashboardId) => {
	const text = `
  INSERT INTO links (user_id, dashboard_id, admin)
  VALUES ($1, $2, false)
  RETURNING *;`;
	const values = [userId, dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) => console.log(`Error at links queries 'createLink'`, err));
};

const createFirstLink = (userId, dashboardId) => {
	const text = `
  INSERT INTO links (user_id, dashboard_id, admin)
  VALUES ($1, $2, true)
  RETURNING *;`;
	const values = [userId, dashboardId];

	return db
		.query(text, values)
		.then((res) => res.rows[0])
		.catch((err) =>
			console.log(`Error at links queries 'createFirstLink'`, err)
		);
};

const createDashboard = (userId, dashboardObj) => {
	const text = `
  INSERT INTO dashboards (name, groceries, recipes, events, polls, photos, chores, contacts)
  VALUES ($1, true, true, true, true, true, true, true)
  RETURNING id, name;`;
	const values = [dashboardObj.name];

	return db
		.query(text, values)
		.then((res) => {
			const newDashboardObj = res.rows[0];
			return createFirstLink(userId, newDashboardObj.id);
		})
		.catch((err) =>
			console.log(`Error at links queries 'createDashboard'`, err)
		);
};

const deleteLink = (userId, dashboardId) => {
	const text = `
  DELETE FROM links
  WHERE user_id = $1
  AND dashboard_id = $2;`;
	const values = [userId, dashboardId];

	return db
		.query(text, values)
		.catch((err) => console.log(`Error at links queries 'deleteLink'`, err));
};

const toggleAdmin = (userId, userStatus, dashboardId) => {
	const text = `
  UPDATE links
  SET admin = $1
  WHERE user_id = $2
  AND dashboard_id = $3;`;
	const values = [userId, userStatus, dashboardId];

	return db
		.query(text, values)
		.catch((err) => console.log(`Error at links queries 'toggleAdmin'`, err));
};

module.exports = {
	getDashboardsPerUser,
	deleteLink,
	createDashboard,
	getUsersPerDashboard,
	createLink,
	toggleAdmin,
};
