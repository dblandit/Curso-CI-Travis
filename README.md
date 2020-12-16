# Express-example
Repositorio dedicado a la demostración de una implementación de API Rest en [Express](https://expressjs.com/es/4x/api.html).

### Requisitos
- NodeJS (última versión estable)
- MongoDB
- Postman o curl

### Primeros pasos
1. Clonar el repositorio con el mecanismo de su preferencia (ssh o `git clone`).
2. Tipear en una terminal dentro del directorio que contiene el repositorio `npm install`.
3. Asegurarse de que existe levantada una instancia del server de mongo en el puerto `27017`. (Ejecutable llamado `mongod`).


#### Funcionamiento

- #### Development
    Levanta un daemon en el puerto [8080](http://localhost:8080/) para poder desarrollar y aplicar los cambios una vez se guarde el archivo.
    - `npm run nodemon`
- #### Production
    Corre un proceso Node en el puerto [8080](http://localhost:8080/) para poder interactuar con el servidor.
    - `npm start`

#### Archivos importantes
- /utils/mongodbUtil.js tiene las funciones usadas para interactuar con la base de datos
- /utils/setupMongodb.js está el setup de Mongo para Jest
- /utils/testUtils.js tiene el wrapper del objeto request y la función para hacer el login en los tests
- /seeds están definidos los datos para cargar en Mongo