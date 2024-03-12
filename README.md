# Repo Scraper

Repo Scraper is a web application that allows users to search for repositories from GitHub.
Users can search for repositories by name or username of the repository owner. 
The application also allows users to view the details of a repository,
such as the readme, owner of the repository, description. The application is built using React and Node.js.

## Technologies
- React
- Node.js
- Express
- TypeScript
- GraphQL
- MongoDB

### External API
- GitHub API

## Installation

For the installation of the application, you need to have Node.js installed on your machine.
You can download Node.js from the official website [here](https://nodejs.org/en/).
```shell
# Clone the repository
git clone https://github.com/Kaspaaro/WebProju-2.git
npm install
```
Application uses separate servers for the frontend and backend.
To start the application, you need to start both servers by command.
```shell
# Start the application
npm run start
```
## Attention!

For using the application in full functionality in locally, you need to have **an auth server** and **database** for the app.
You can use this for the auth server or make your own.
```shell
  git clone https://github.com/SmuuSka/web-2-auth
```
And for the database, you can use MongoDB for free from the official website [here](https://www.mongodb.com/).
After you have the auth server and database, you need to configure the environment variables in the .env file.
```text
react-app/.env

NODE_ENV=development
DATABASE_URL=your-database-url
PORT=3000 api server port
PORT_API=3001 react server port
REACT_APP_AUTH_URL=your-auth-server-url, for example http://localhost:3001
JWT_SECRET=your-jwt-secret, for the auth server also needed to have in the auth server

SECRET_USERNAME=your-admin-email from db. Need only for the jest tests.
SECRET_PASSWORD=your-admin-password. Need only for the jest tests.
API_TOKEN=your-github-token, for make a queries to the github api. 
You can get it from your github account Settings/<>Developer settings/Personal access token(classic).

```
```text
auth-server/.env

NODE_ENV=development
PORT=3001
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
```
For using the application, you need to open the browser and go to the address [http://localhost:3000](http://localhost:3000).

## Features
### Basic user functionality
- Search for repositories by name or username of the repository owner
- View the details of a repository which includes a readme(if provided), owner of the repository, description.
### Registered user functionality
- Save repositories to the favorites list
- Get notified when a repository is updated
### Admin functionality
- Remove users from the application
