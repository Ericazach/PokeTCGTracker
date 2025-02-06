const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY_CLOUDINARY,
  api_secret:process.env.API_SECRET_CLOUDINARY,
});

const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Pokemons",
  },
});

module.exports.user = multer({
  storage: storageUser,
  limits: { fileSize: maxSize },
});