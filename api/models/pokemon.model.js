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
},
    {
        timestamps: true,
    },
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                return ret;
            },
        },
    })

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;