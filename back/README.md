# angular_udemy_course_e-comerce

## Backend

# Initialize the project with node and typescript

To configure a node project with typescript and mongo you may perform the following steps:

1.  Execute the commands:
`npm init -y`
`npm install --save-dev typescript`

2.  Create tsconfig.json file

3.  Add this lines to tsconfig.json

```
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "lib": ["es2015"]
}
```

4.  Create src folder and inside put the file app.ts and add this basic configuration

```
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
```

5.  Execute the command `npx tsc`

6.  Execute the command `node dist/app.js`

7.  Execute the command `npm install --save-dev eslint`

8.  Execute the command `npx eslint --init`
  * How would you like to use ESLint?: To check syntax and find problems
  * What type of modules does your project use?: JavaScript modules (import/export)
  * Which framework does your project use?: None of these
  * Does your project use TypeScript?: Yes
  * Where does your code run?: Node
  * What format do you want your config file to be in?: JavaScript
  * Would you like to install them now? Yes
  * Which package manager do you want to use? npm

9.  Execute the command `npx eslint . --ext .ts`

10. Execute the command `npm install --save-dev ts-node`

11. Modify this lines in package.json file to run the project with nodemon and typescript

```
  "main": "dist/app.js",
  "scripts": {
    "start": "tsc && node dist/app.js",
    "lint": "eslint . --ext .ts",
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

## Libraries
### Password encriptation 
`npm install bcrypt-nodejs`

### JSON data parser
`npm install body-parser`

### Permit save file and videos in the server
`npm install connect-multiparty`

### Web framework from node
`npm install express`

### Data managing
`npm install moment`

### Mongo db modeler
`npm install mongoose@6.10.0`

### Token generator
`npm install jsonwebtoken`

### Token decodifier
`npm install jwt-simple`

### Change dev server restarter
`npm install --save-dev nodemon`


### Folders
#### Controllers
Controller folder container

#### Helpers
Generated token folder codificator container

#### Middlewares
Token folder validator container

#### Models
Aplication models container

#### Routes
Api routes container

#### Uploads
Folder containing the uploaded files  and videos


## MongoDB
### Macos Instalation

Execute this commands in bash:

`xcode-select --install`

`brew install mongodb-community@6.0`

`brew services start mongodb-community@6.0`

#### Mongo url connection

`mongodb://localhost:27017`

#### Mongo guide
`https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x`

## Start the server in dev mode
Execute the command: `npm run dev`