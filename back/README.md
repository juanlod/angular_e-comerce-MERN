# angular_udemy_course_e-comerce

## Backend

# Iniciar proyecto node con typescript

1.  Ejecutar los comandos:
`npm init -y`
`npm install --save-dev typescript`

2.  Crear archivo tsconfig.json

3.  Añadir las siguientes lineas al archivo tsconfig.json

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

4.  Crear carpeta src y en su interior el archivo app.ts y añadir la configuración básica

import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


5.  Ejecutar el comando `npx tsc`

6.  Ejecutar el comando `node dist/app.js`

7.  Ejecutar el comando `npm install --save-dev eslint`

8.  Ejecutar el comando `npx eslint --init`
  * How would you like to use ESLint?: To check syntax and find problems
  * What type of modules does your project use?: JavaScript modules (import/export)
  * Which framework does your project use?: None of these
  * Does your project use TypeScript?: Yes
  * Where does your code run?: Node
  * What format do you want your config file to be in?: JavaScript
  * Would you like to install them now? Yes
  * Which package manager do you want to use? npm

9.  Ejecutar el comando `npx eslint . --ext .ts`

10. Ejecutar el comando `npm install --save-dev ts-node`

11. Modificar las siguientes lineas del archivo package.json para arrancar con nodemon y typescript

  "main": "dist/app.js",
  "scripts": {
    "start": "tsc && node dist/app.js",
    "lint": "eslint . --ext .ts",
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

## Librerias
### Encriptacion de contraseñas
npm install bcrypt-nodejs

### Parseador de informacion en formato json
npm install body-parser

### Permite guardar imagenes y videos en el backend
npm install connect-multiparty

### Lenguaje base del backend
npm install express

### Manejador de fecha
npm install moment

### Modelador de mongodb
npm install mongoose@6.10.0

### Generador de tokens de usuario
npm install jsonwebtoken

### Decodificador de token
npm install jwt-simple

### Reinicializador de node para cambios en el backend
npm install --save-dev nodemon


### Carpetas

#### Controllers
Carpeta que contendra los controladores

#### Helpers
Carpeta que codificara los tokens que se van a generar

#### Middlewares
Carpeta que contendra el validador del token

#### Models
Carpeta que contendra los modelos

#### Routes
Carpeta que contendra las rutas del api

#### Uploads
Carpeta que contendra los archivos subidos al servidor

## MongoDB
### Instalacion

xcode-select --install
brew install mongodb-community@6.0
brew services start mongodb-community@6.0

#### Url de conexion a mongo
mongodb://localhost:27017

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/


## Arranque
Ejecutar el comando `npm run dev`