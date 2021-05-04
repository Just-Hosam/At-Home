# @Home

@Home is a household productivity dashboard that aims to bring organization, democracy and collaboration to every family.

Visit the hosted version of this project [here](https://www.athomedashboard.com/) or watch our 5 minute presentation [here](https://youtu.be/i9a-0LJa1nI)

Dummy Accounts with prepopulated Dashboards:
- `email:` user1@test.com `password:` test
- `email:` user2@test.com `password:` test
- `email:` user3@test.com `password:` test
- `email:` user4@test.com `password:` test

This project was developed by [Hosam Dahrooge](https://github.com/Just-Hosam), [Nolan Eckert](https://github.com/Nolan-E), and [Kyle Lemmon](https://github.com/lemmonk).

<br>

## Getting Started

To run the following project on your machine please follow the steps for each part of the stack:

### Backend setup

<br>

1. To setup the database enter the following into your CLI:
  - psql -U vagrant template1
  - CREATE ROLE labber WITH LOGIN password 'labber';
  - CREATE DATABASE final OWNER labber;

2. Install all dependencies.
```
npm install
```
3. Create the `.env` file by using `.env.example` as a reference.

4. Reset/Seed the database.
```
npm run db:reset
```
5. Run the server.
```
npm start
```
6. And finally, visit the following.
```
http://localhost:8080/
```

<br>

### Frontend setup

<br>

1. Install all dependencies.
```
npm install
```
2. Download the sass compiler extension (Live Sass Compiler has around 1.2 million downloads)

3. Config the sass compiler by following the these steps:
  - Go to VS code setting > live sass compiler config > Live Sass Compile › Settings: Formats
  - Change the savePath from `null` to `"frontend/public/styles"` (copy paste with quotations)
  - There is another setting just under called liveSassCompile.settings.generateMap, set it to `true`
  - Save changes

4. Run the server.
```
npm start
```
5. And finally, visit the following.
```
http://localhost:3030/
```

NOTE: App.scss is our main file, all additional scss files created must have an underscore _ at the start of them and then imported to App.scss. This will allow us to have only one file for css in public.

<br>

## Final Product

Screenshots coming soon!

## Known Issues/Bugs

- Deleting the last image in the gallery will cause a crash (can be resolved with a reload)
- Issues with user authentication

## Future Features

- Create more widgets (Phonebook)
- Allowing for full CRUD operations on the widgets allowing the user to `Add`, `Remove`, and `Rearrange` the widgets

## Dev Dependencies

- Nodemon

## Dependencies

- Anylist
- Axios
- Bcrypt
- Body-parser
- Chalk
- Cookie-session
- Dotenv
- Express
- Material UI core
- Material UI icons
- Material UI lab
- Method-Override
- Morgan
- PG
- PG-native
- React Awesome Calendar
- React cookie
- React dom
- React google charts
- React router dom
- Socket.io
- Socket.io Client
