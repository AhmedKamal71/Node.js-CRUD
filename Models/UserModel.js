// ---------------------------------- All Requires ----------------------------------
const mongoose = require("mongoose")
// ---------------------------------- Table Schema ----------------------------------
let UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    email: String,
    password: String
})
// ---------------------------------- Export Class ----------------------------------
module.exports = mongoose.model("users", UserSchema)
// -------------------------------- End Of User Class --------------------------------