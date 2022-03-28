# Store Backend Project
>This is a store backend api that provides users, order, products endpoints CRUD operations and other business logic operations
## Getting Started
1. Head to project directory
2. Setup environment: add ```.env``` file to the project or simply edit ```.env.exapmle``` file and rename it. 
  For More see [Setup Envrionment](#setup-environment) Section
3. Simply run one of the following commands
   - to run project with ```nodejs```
      ```bash
        npm run quickstart
      ```
   - to run project with ```nodemon```
      ```bash
        npm run quickstartdev
      ```
      these commands will **install dependencies**, then **build project**, then **migrate DB up**, and finally **start project** with node or nodemon
4. open postman and import 
   ```store Api.postman_collection.json```,
   ```localdev.postman_environment.json``` 
   files, and start playing with the project.
   >==Note:== **{{ TOKEN }}** and **{{ BASE_URL }}** postman environment variable **may need to be edited**


## Scripts
|script|description|
|------|-----------|
|build        | builds typescript to javascript into dist/ folder |
|start        | starts server with node|
|startdev     | starts server with nodemon|
|quickstart   | install dependencies,build,migrate,then starts server|
|quickstartdev|same as quickstart but starts server with nodemon|
|test         |rebuild & runs all tests @ test database environment|
|migrate:up   |migrate up DB|
|migrate:down |migrate down DB|

## Setup Environment
**First,** enter psql terminal, and create 2 databases one for dev and the other one for test
```bash
create database [DB name]
```
**Second,** create ```.env``` file with all required environment variables, 
OR 
rename ```.example.env``` file as ```.env``` and edit for your environment values.

## Run Tests
run the following command
```bash
npm run test
```

## Endpoints & Database Schema
see [REQUIREMENTS.MD](REQUIREMENTS.md)
