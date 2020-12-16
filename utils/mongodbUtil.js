const mongoose = require('mongoose');
const { readdir } = require('fs').promises;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/finanzas";

function connect(databaseName) {
    const uri = mongoURI + databaseName;
    const options = {
        // Indica que use el nuevo parser del string de conexión.
        // El anterior está deprecado.
        useNewUrlParser: true,

        // Indica que use la nueva forma de Server Discover y Monitoring engine.
        // El anterior está deprecado.
        useUnifiedTopology: true,

        // Pisa una opción (ensureIndex) que viene por default que está deprecada.
        useCreateIndex: true,

        // Evita que se creen automaticamente los índices de todos los modelos.
        // Tambien puede causar que se ejecute alguna query de mongoose antes de
        // terminar de crear los índices y terminaría fallando. 
        autoIndex: false,

        // Definir la base a que se conecta.
        // Tiene prioridad sobre la base que esté en el string de conexión.
        // dbName: databaseName
    };
  
    return mongoose.connect(uri, options);
}

function disconnect() {
    return mongoose.disconnect();
}

async function seedDB() {
    // readdir obtiene una lista con los nombres de los archivos
    const seedFiles = await readdir(__dirname + '/../seeds');
  
    // Mapeamos los nombres a promises que van cargar sus datos
    await Promise.all(seedFiles.map(fileName => seedFrom(fileName)));
}

function seedFrom(fileName) {
    // Obtenemos el nombre del modelo al que le vamos a cargar datos
    const modelName = fileName.split('.seed.js')[0];
    // Buscamos el modelo de mongoose
    const model = mongoose.models[modelName];
    // Importamos el contenido del archivo
    const fileContents = require('../seeds/' + fileName);
  
    // Cargamos los datos en la base
    return model.insertMany(fileContents)
}

function deleteCollections() {
    // Mongoose nos provee las colecciones a través de un hash.
    // Solo nos interesa iterar los valores del hash.
    const collections = Object.values(mongoose.connection.collections);
  
    // deleteMany() retorna una promesa así que esperamos a todas.
    // En este caso usamos allSettled porque no nos interesa el resultado de la promesa.
    return Promise.allSettled(
        collections.map(collection => collection.deleteMany())
    );
}

module.exports = { connect, disconnect, seedDB, deleteCollections };