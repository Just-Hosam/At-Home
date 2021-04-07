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

## Frontend setup

- run _npm install_
- download the sass compiler extension (Live Sass Compiler has around 1.2 million downloads)
- go to VS code setting:
  - extensions
  - live sass compiler config
  - Live Sass Compile › Settings: Formats
  - change the savePath from null to "frontend/public/styles" (copy paste with quotations)
  - there is another setting just under called liveSassCompile.settings.generateMap
  - change it from true to false
  - save changes

App.scss is our main file, all additional scss files created must have an underscore \_ at the start of them and then imported to App.scss. This will allow us to have only one file for css in public.
