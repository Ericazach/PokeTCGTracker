const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.cleanBody = (req, res, next) => {
    if (req.body) {
        delete req.body._id;
        delete req.body.author;
        delete req.body.createdAt;
        delete req.body.updatedAt;
    }
    next();
};

module.exports.auth = (req, res, next) => {
    console.log(req.headers.authorization, "req.headers.authorization");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(createError(401, "Missing access token"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        User.findById(decoded.sub)
            .populate({
                path: "pokemons",
                populate: {
                    path: "user pokemons",
                },
            })
            .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    next(createError(401, "user not found"));
                }
            });
    } catch (err) {
        next(createError(401, err));
    }
};