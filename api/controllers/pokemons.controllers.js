const Pokemon = require("../models/pokemon.model");

// mongoose.connect('mongodb://127.0.0.1:27017/pokemontcgpocket');

// const conn = mongoose.connection;

// // Espera a que la conexión con MongoDB esté abierta
// let bucket; // Variable para almacenar la instancia de GridFSBucket

// conn.once('open', () => {
//     console.log('Conectado a MongoDB');
//     bucket = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: 'pokemons', // Cambia si tu bucket tiene otro nombre
//     });
// });

// Función para obtener imágenes desde GridFS
// const obtenerImagenes = async () => {
//     if (!conn.db) {
//         throw new Error('La conexión a MongoDB no está lista');
//     }

//     const files = await conn.db.collection('pokemons.files').find({}).toArray();

//     const imagenes = files.map(file => ({
//         nombre: file.filename, // Nombre del archivo
//         imagen: `http://localhost:${PORT}/images/${file.filename}`, // URL para acceder a la imagen
//     }));

//     return imagenes;
// };

// Controladores
module.exports.list = async (req, res, next) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        res.status(500).send('Error al obtener las imágenes');
    }
};

module.exports.detail = (req, res, next) => {
    Pokemon.findById(req.params.id)
        .then(pokemon => res.json(pokemon))
        .catch(next);
};