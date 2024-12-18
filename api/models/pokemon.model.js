const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    name: String,
    image: String,
    attack: String,
    hp: Number,
    set: String,
    rarity: String,
    type: String,
    weakness: String,
    stage: String
})

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;