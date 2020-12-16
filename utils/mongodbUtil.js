const mongoose = require('mongoose');
const { readdir } = require('fs').promises;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/finanzas";

function connect(databaseName) {
    const uri = mongoURI + databaseName;
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
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