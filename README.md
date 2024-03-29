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

## Application Website Links
- [Frontend](https://reposcraper.azurewebsites.net/)

## Technologies
![Static Badge](https://img.shields.io/badge/v18.2-blue?logo=React&label=React&labelColor=black)
![Static Badge](https://img.shields.io/badge/Node-v20.11.0-darkgreen?style=flat&logo=node.js&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Express.js-v4.18.3-darkred?style=flat&logo=express&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Graphql.js-v16.8.1-purple?style=flat&logo=graphql&logoColor=purple&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/Mongoose-v8.1.2-darkred?style=flat&logo=mongoose&logoColor=purple&labelColor=%23000000)
![Static Badge](https://img.shields.io/badge/v2.10.1-blue?logo=Bootstrap&label=React%20Bootstrap&labelColor=black)



### External API
- GitHub API
    - REST endpoints
    - GraphQL endpoints

## Features
### Basic user functionality
- Search for repositories by name or username of the repository owner
- View the details of a repository which includes a readme(if provided),
- owner(s) of the repository, description(if provided) and programming language(s).
### Registered user functionality
- Save and remove repositories to the favorites list
- Get notified when a repository is updated
### Admin functionality
- Remove users from the application

### Future features
- User settings panel

## Application structure
![](documentation/structure.png)

## Installation

For the installation of the application, you need to have Node.js installed on your machine.
You can download Node.js from the official website [here](https://nodejs.org/en/).
```shell
# Clone the repository
git clone https://github.com/Kaspaaro/WebProju-2.git
cd WebProju-2
npm install
```
Application uses separate servers for the frontend and backend.
To start the application, you need to start both servers by command.
```shell
# Start the application !Note: You need to have the .env file configured.
npm run build
npm run start
```
## Attention!
### **Note**: The register is not broken, it just lacks the feature to tell the user that he's now registered. So when you fill the fields, just try to log in to the account 🙂
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
JWT_SECRET=your-jwt-secret, the auth server also need to have in the auth server equal jwt secret.

SECRET_USERNAME=your-admin-email from db. Needed only for the jest tests.
SECRET_PASSWORD=your-admin-password, Needed only for the jest tests.
API_TOKEN=your-github-token, for making queries to the github api. 
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
Apollo server is running on the address [http://localhost:3001/graphql](http://localhost:3001/graphql)



## GitHub API
The application uses the GitHub API to get the repositories and their details.
The API has a rate limit of 60 requests per hour for unauthenticated users and
5000 requests per hour for authenticated users.

## Unit Testing
The application uses Jest for unit testing. The tests are located in the tests folder.
To run the tests, you need to run the command:
```shell
npm run test
```

## Test Results
We have covered our most of our database and server functionality with unit tests.
Tests with GithubAPI are not covered with unit tests.
Tests require .env file with the following variables:

```text
SECRET_USERNAME=your-admin-email from db
SECRET_PASSWORD=your-admin-password
Database_URL=your-database-url
React_APP_AUTH_URL=your-auth-server-url
React_App_GRAPHQL_SERVER=your-graphql-server-url
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
