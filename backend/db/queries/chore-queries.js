const db = require("../../lib/db.js");

const getChores = (dashboardId) => {
  const text = `
  SELECT * 
  FROM chores
  WHERE dashboard_id = $1
  ORDER BY id;`;
  const values = [dashboardId];

  return db
    .query(text, values)
    .then((res) => res.rows)
    .catch((err) => console.log('Error at chores queries "getChores"', err));
};

const getChore = (dashboardId, choreId) => {
  const text = `
	SELECT *
	FROM chores
	WHERE dashboard_id = $1
	AND id = $2;`;
  const values = [dashboardId, choreId];

  return db
    .query(text, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log('Error at chores queries "getChore"', err));
};

const addChore = (dashboardId, choreText) => {
  const text = `
  INSERT INTO chores (dashboard_id, text)
	VALUES ($1, $2)
	RETURNING *;`;
  const values = [dashboardId, choreText];

  return db
    .query(text, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log('Error at chores queries "addChore"', err));
};

const editChore = (dashboardId, choreId, choreText, assignedName, choreDone) => {
  const text = `
	UPDATE chores
	SET text = $1, name = $2, done = $3
	WHERE dashboard_id = $4
	AND id = $5
  RETURNING *;`;
  const values = [choreText, assignedName, choreDone, dashboardId, choreId];

  return db
    .query(text, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log('Error at chores queries "editChore"', err));
};

const deleteChore = (dashboardId, choreId) => {
  const text = `
	DELETE FROM chores
	WHERE dashboard_id = $1
	AND id = $2
	RETURNING *;`;
  const values = [dashboardId, choreId];

  return db
    .query(text, values)
    .then((res) => res)
    .catch((err) => console.log('Error at chores queries "deleteChore"', err));
};

module.exports = {
  getChores,
  getChore,
  addChore,
  editChore,
  deleteChore,
};
