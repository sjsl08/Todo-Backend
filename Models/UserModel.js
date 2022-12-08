const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ObjectId = mongoose.ObjectId

const UserSchema = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: String
    }, { versionKey: false })

const User = mongoose.model("user", UserSchema)

module.exports = User