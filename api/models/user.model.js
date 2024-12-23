const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Username is required",
        minlength: [3, "Name needs at least 2 chars"],
        match: [/^[a-z0-9]+$/, "Username must be lowercase and without spaces"],
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        required: "Email is required",
        match: [/^\S+@\S+\.\S+$/, "User email must be valid"],
    },
    confirm: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: "User password is required",
        minlength: [8, "User password needs at least 8 chars"],
    },
    profilePic: {
        type: String,
        match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Image URL must be valid"],
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },

},
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                return ret;
            },
        },
    })

userSchema.virtual("pokemons", {
    ref: "Pokemon",
    localField: "_id",
    foreignField: "trainer",
    justOne: false,
});

userSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified("password")) {
        bcrypt
            .genSalt(10)
            .then((salt) => {
                return bcrypt.hash(user.password, salt).then((hash) => {
                    user.password = hash;
                    next();
                });
            })
            .catch((error) => next(error));
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};



const User = mongoose.model("User", userSchema);
module.exports = User;