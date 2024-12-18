require("dotenv").config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use("/api/v1", require("./config/routes.config"));

mongoose.connect('mongodb://127.0.0.1:27017/pokemontcgpocket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('Conectado a MongoDB');

    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'pokemons', // Cambia si tu bucket tiene otro nombre
    });

    // Mapea todas las imágenes de GridFS
    const obtenerImagenes = async () => {
        const files = await conn.db.collection('pokemons.files').find({}).toArray(); // 'fs.files' es la colección que guarda los metadatos de las imágenes

        // Mapea los archivos a un objeto con 'nombre' e 'imagen'
        const imagenes = files.map(file => ({
            nombre: file.filename, // Nombre del archivo
            imagen: `http://localhost:${PORT}/images/${file.filename}`, // URL para acceder a la imagen
        }));

        return imagenes;
    };

    // Endpoint para obtener todas las imágenes mapeadas
    app.get('/imagenes', async (req, res) => {
        try {
            const imagenes = await obtenerImagenes();
            res.json(imagenes); // Devuelve el objeto con las imágenes
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
            res.status(500).send('Error al obtener las imágenes');
        }
    });

    // Endpoint para servir imágenes
    app.get('/images/:filename', (req, res) => {
        const filename = req.params.filename;

        bucket
            .openDownloadStreamByName(filename)
            .pipe(res)
            .on('error', (err) => {
                console.error('Error al descargar la imagen:', err);
                res.status(404).send('Imagen no encontrada');
            });
    });

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});

app.listen(3002, () => {
    console.log(`Servidor ejecutándose en 3002`);
});

