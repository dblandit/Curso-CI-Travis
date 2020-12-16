// Mock manual

// Crea un mock en base a un modulo, o sea que todas sus funciones van a tener
// la implementación default (sin comportamient).
const path = jest.createMockFromModule('path');

// Definimos la implementación de las funciones que nos interese.
// No es necesario definir todas las funciones.
path.join = (...paths) => {
    return '/foo/bar';
};

module.exports = path;