# Fullstack GraphQL

Riqra Challenge

**API** built with Node + Express + GraphQL + Sequelize (supports MySQL, Postgres, Sqlite and MSSQL). 

**WebApp** built with React + Apollo Client. 

## 📝 Features
- [x] List thoughts
- [x] Add thought
- [x] Delete thought
- [x] View single thought

## ▶️ Running
- Clone repo `git clone git@github.com:jnreynoso/riqra-challenge.git`
- Install NPM modules API `cd backend` and `npm install`
- Install NPM modules Webapp `cd frontend` and `npm install`
- Modify `/backend/src/config/database.json` for database credentials
- Modify `/backend/src/config/config.json` for API port (optional)
- Modify `/frontend/.env` for webapp port (optional)
- Run API `cd backend` and `npm start`, browse GraphiQL at http://localhost:3000/
- Run Webapp `cd frontend` and `npm start`, browse webapp at http://localhost:8082/

## 🏗 Core Structure
    riqra-challenge
      ├── backend (api.example.com)
      │   ├── src
      │   │   ├── config
      │   │   ├── models
      │   │   ├── schema
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   └── package.json
      │
      ├── frontend (example.com)
      │   ├── public
      │   ├── src
      │   │   ├── components
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   ├── .env
      │   └── package.json
      │
      ├── .gitignore
      └── README.md

## 📘 Guides
### API
- Adding new Module (Eg: Users):
  - Copy `/backend/src/models/thought.js` to `/backend/src/models/user.js` and modify the file for table name and respective fields
  - Add an entry to the `models` object in `/backend/src/models/index.js`
  - Copy `/backend/src/schema/thoughts` to `/backend/src/schema/users` and modify `type.js`, `resolvers.js` and `fields/query.js` and `fields/mutations.js`
  - Import `/backend/src/schema/users/fields/query.js` in `/backend/src/schema/query.js`
  - Import `/backend/src/schema/users/fields/mutations.js` in `/backend/src/schema/mutations.js`