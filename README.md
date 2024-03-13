# Repo Scraper

Repo Scraper is a web application designed for developers, project managers, tech enthusiasts, students, and educators who frequently use
GitHub or are involved in software development. The application uses the GitHub API to get the repositories and their details by using Octokit for
REST API requests and GraphQL requests. 

Users can easily search for repositories by entering the name or username of the repository owner.
The application offers comprehensive repository details, including the README, owner information,
and description, empowering users to make informed decisions about the repositories they explore.

For registered users, the application provides the functionality to save 
repositories to the favorites list and get notified when a repository is updated.

### Authors
- Kaspar Tullus
- Samu Aikio

## Technologies
![Static Badge](https://img.shields.io/badge/React%20v.18.2-blue?style=flat&logo=react&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Node-v20.11.0-darkgreen?style=flat&logo=node.js&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Express.js-v4.18.3-darkred?style=flat&logo=express&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Graphql.js-v16.8.1-purple?style=flat&logo=graphql&logoColor=purple&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Mongoose-v8.1.2-darkred?style=flat&logo=mongoose&logoColor=purple&labelColor=%23000000)

### External API
- GitHub API
    - REST endpoints
    - GraphQL endpoints

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
Application uses MongoDB for the database and uses mongoose for the connection.
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
- View the details of a repository which includes a readme(if provided), owner(s) of the repository, description and programming language(s).
### Registered user functionality
- Save repositories to the favorites list
- Get notified when a repository is updated
### Admin functionality
- Remove users from the application

## GitHub API
The application uses the GitHub API to get the repositories and their details.
The API has a rate limit of 60 requests per hour for unauthenticated users and
5000 requests per hour for authenticated users.


## License
[MIT](https://choosealicense.com/licenses/mit/)
