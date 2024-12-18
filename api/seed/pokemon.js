const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGO_URI = "mongodb://localhost:27017/pokemontcgpocket";

// Conectar a MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

conn.once("open", () => {
    console.log("Conectado a MongoDB");

    // Configurar GridFSBucket
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "pokemons", // Nombre de la colección
    });

    // Leer imágenes de una carpeta y subirlas a MongoDB
    const folderPath = "../assets/imagenes"; // Ruta de la carpeta
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("Error leyendo la carpeta:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(folderPath, file);

            // Crear un stream de lectura desde el archivo
            const readStream = fs.createReadStream(filePath);

            // Subir el archivo al bucket
            const uploadStream = bucket.openUploadStream(file);
            readStream.pipe(uploadStream);

            uploadStream.on("finish", () => {
                console.log(`Archivo subido: ${file}`);
            });

            uploadStream.on("error", (error) => {
                console.error(`Error subiendo ${file}:`, error);
            });
        });
    });
});