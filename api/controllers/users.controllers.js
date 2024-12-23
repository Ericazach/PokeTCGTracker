const User = require('../models/user.model');
const nodemailer = require('../config/nodemailer.config');
const createError = require('http-errors');
const jwt = require("jsonwebtoken");
const maxTimeSession = parseInt(process.env.MAX_TIME_SESSION) || 3600;


module.exports.list = (req, res, next) => {
    User.find()
        .populate("pokemons")
        .then(users => res.json(users))
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
};

module.exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return next(
                    createError(401, { errors: { password: "Invalid credentials" } })
                );
            }

            if (!user.confirm) {
                return next(
                    createError(401, {
                        errors: { username: "Please confirm your account" },
                    })
                );
            }
            user.checkPassword(req.body.password).then((match) => {
                if (!match) {
                    return next(
                        createError(401, { errors: { password: "Invalid credentials" } })
                    );
                }

                const token = jwt.sign(
                    { sub: user.id, exp: Date.now() / 1000 + maxTimeSession },
                    process.env.JWT_SECRET
                );

                res.json({ token, ...user.toJSON() });
            });
        })

        .catch(next);
};

module.exports.edit = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(createError(403, "Forbidden"));
    }

    const newProfilePic = req.file.path || "";
    Object.assign(req.user, { ...req.body, profilePic: newProfilePic });

    req.user
        .save()
        .then((user) => res.json(user))
        .catch(next);
};

module.exports.delete = (req, res, next) => {
    console.log(req.params.id, "delete");
    if (req.user.id !== req.params.id) {
        return next(createError(403, "Forbidden"));
    }

    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(204).send())
        .catch(next);
};

module.exports.create = (req, res, next) => {
    console.log("1", req.body);
    User.create(req.body)
        .then((user) => {
            console.log("2", user);
            nodemailer.sendConfirmationEmail(user);
            res.status(201).json(user);
        })
        .catch(next);
};