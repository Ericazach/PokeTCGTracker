const express = require("express");
const router = express.Router();

const pokemonsController = require("../controllers/pokemons.controllers");

router.get("/pokemons", pokemonsController.list);
router.get("/pokemons/:id", pokemonsController.detail);

module.exports = router;