const express = require("express");
const router = express.Router();
const storage = require("../config/multer.config");

const pokemonsController = require("../controllers/pokemons.controllers");
const usersController = require("../controllers/users.controllers");
const secure = require("../middlewares/secure.mid");
const userMid = require("../middlewares/user.mid");

router.get("/pokemons", pokemonsController.list);
router.get("/pokemons/:id", pokemonsController.detail);

router.get("/users", usersController.list);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.detail);
router.delete("/users/:id", usersController.delete);
router.patch(
    "/users/:id",
    storage.user.single("file"),
    secure.auth,
    userMid.exists,
    usersController.edit
);
router.post("/login", usersController.login);

module.exports = router;