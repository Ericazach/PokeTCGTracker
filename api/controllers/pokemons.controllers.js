const Pokemon = require("../models/pokemon.model");

module.exports.list = (req, res, next) => {
    Pokemon.find()
        .then(pokemons => res.json(pokemons))
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    Pokemon.findById(req.params.id)
        .then(pokemon => res.json(pokemon))
        .catch(next);
}