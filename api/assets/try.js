const fs = require('fs');
const path = require('path');

// Carpeta con las imágenes
const imagesFolder = '../assets/imagenes';
// Carpeta donde se guardarán las imágenes renombradas
const outputFolder = './output-images';
// JSON de salida
const outputJson = './images.json';

// Verifica que las carpetas existan
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Función para limpiar y generar nuevos nombres
const cleanFileName = (oldName, index) => {
  // Personaliza este formato según tus necesidades
  const baseName = oldName
    .replace(/_/g, '-') // Reemplaza '_' por '-'
    .toLowerCase(); // Convierte a minúsculas
  return `poke-${index + 1}${path.extname(oldName)}`; // Ejemplo: "image-1.jpg"
};

// Procesar archivos
const images = fs.readdirSync(imagesFolder);
const imagesData = images.map((file, index) => {
  const oldPath = path.join(imagesFolder, file);
  const newName = cleanFileName(file, index);
  const newPath = path.join(outputFolder, newName);

  // Renombra el archivo
  fs.copyFileSync(oldPath, newPath);

  // Devuelve datos para el JSON
  return {
    id: index + 1,
    name: newName,
    url: `./imagenes/${newName}`, // Cambia esta ruta según tu API o carpeta estática
  };
});

// Escribe el JSON
fs.writeFileSync(outputJson, JSON.stringify(imagesData, null, 2));

console.log('Procesamiento completado. Archivos renombrados y JSON generado.');