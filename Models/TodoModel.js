const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ObjectId = mongoose.ObjectId

const TodoSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "users"
        },
        task: {
            type: String
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }

    , { versionKey: false })

const TODO = mongoose.model("Todos", TodoSchema)

module.exports = TODO