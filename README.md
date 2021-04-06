# modular_dashboard

LHL final project

## Backend setup

- connect to your vm
- enter this into CLI:

  - psql -U vagrant -d template1
  - CREATE ROLE labber WITH LOGIN password 'labber';
  - you probably will get a message saying labber is already created. GOOD
  - CREATE DATABASE final OWNER labber;

- clone the repo
- run _npm install_
- create your .env file based on .env.example (copy paste the whole thing)
- npm run db:reset
- npm run local (nodemon should boot up)
- visit the app at http://localhost:8080/
