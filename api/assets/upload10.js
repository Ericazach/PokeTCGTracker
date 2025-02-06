require("../config/db.config");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");
const Pokemon = require("../models/pokemon.model");

// // Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
});

// Lista de Pokémon con las rutas absolutas de las imágenes
const pokemonsArr = [
    {
        name: "Bulbasaur",
        image: path.resolve(__dirname, "images/cPK_10_000010_00_FUSHIGIDANE_C_M_M_es_ES.png"),
        attack: "Latigo cepa",
        hp: 70,
        set: "Genes Formidables",
        rarity: "Basico",
        type: "Planta",
        weakness: "Fuego",
        stage: "Basico",
    },
    {
        name: "Ivysaur",
        image: path.resolve(__dirname, "images/cPK_10_000020_00_FUSHIGISOU_U_M_M_es_ES.png"),
        attack: "Hoja afilada",
        hp: 90,
        set: "Genes Formidables",
        rarity: "Fase 1",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 1",
    },
    {
        name: "Venusaur",
        image: path.resolve(__dirname, "images/cPK_10_000030_00_FUSHIGIBANA_R_M_M_es_ES.png"),
        attack: "Megaagotar",
        hp: 160,
        set: "Genes Formidables",
        rarity: "Fase 2",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 2",
    },
    {
        name: "Venusaur EX",
        image: path.resolve(__dirname, "images/cPK_10_000040_00_FUSHIGIBANAex_RR_M_M_es_ES.png"),
        attack: "Hoja afilada",
        attack2: "Floracion Gigante",
        hp: 190,
        set: "Genes Formidables",
        rarity: "Fase 2",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 2",
    },
    {
        name: "Caterpie",
        image: path.resolve(__dirname, "images/cPK_10_000050_00_CATERPIE_C_M_M_es_ES.png"),
        attack: "Encontrar un amigo",
        hp: 50,
        set: "Genes Formidables",
        rarity: "Basico",
        type: "Planta",
        weakness: "Fuego",
        stage: "Basico",
    },
    {
        name: "Metapod",
        image: path.resolve(__dirname, "images/cPK_10_000060_00_TRANSEL_C_M_M_es_ES.png"),
        attack: "Picadura",
        hp: 80,
        set: "Genes Formidables",
        rarity: "Fase 1",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 1",
    },
    {
        name: "Butterfree",
        image: path.resolve(__dirname, "images/cPK_10_000070_00_BUTTERFREE_R_M_M_es_ES.png"),
        attack: "Tornado",
        hp: 120,
        set: "Genes Formidables",
        rarity: "Fase 2",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 2",
    },
    {
        name: "Weedle",
        image: path.resolve(__dirname, "images/cPK_10_000080_00_BEEDLE_C_M_M_es_ES.png"),
        attack: "Aguijonazo",
        hp: 50,
        set: "Genes Formidables",
        rarity: "Basico",
        type: "Planta",
        weakness: "Fuego",
        stage: "Basico",
    },
    {
        name: "Kakuna",
        image: path.resolve(__dirname, "images/cPK_10_000090_00_COCOON_C_M_M_es_ES.png"),
        attack: "Picadura",
        hp: 80,
        set: "Genes Formidables",
        rarity: "Fase 1",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 1",
    },
    {
        name: "Beedrill",
        image: path.resolve(__dirname, "images/cPK_10_000100_00_SPEAR_R_M_M_es_ES.png"),
        attack: "Aguijon Afilado",
        hp: 120,
        set: "Genes Formidables",
        rarity: "Fase 2",
        type: "Planta",
        weakness: "Fuego",
        stage: "Fase 2",
    },
];

// Función para subir una imagen a Cloudinary
const uploadImage = async (imagePath) => {
    if (!fs.existsSync(imagePath)) {
        throw new Error(`Archivo no encontrado: ${imagePath}`);
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "pokemon_images",
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};

// Función para subir las imágenes y crear los Pokémon
const uploadAndCreatePokemons = async () => {
    try {
        const pokemonPromises = pokemonsArr.map(async (pokemon) => {
            const imageUrl = await uploadImage(pokemon.image);
            return { ...pokemon, image: imageUrl }; // Actualiza la URL de la imagen
        });

        const updatedPokemons = await Promise.all(pokemonPromises);

        await Pokemon.create(updatedPokemons);
        console.log("Pokemons creados exitosamente");
    } catch (err) {
        console.log("Error creando pokemons:", err);
    }
};

// Ejecutar el script
uploadAndCreatePokemons();