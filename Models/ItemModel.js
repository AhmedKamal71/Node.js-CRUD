// ---------------------------------- All Requires ----------------------------------
const mongoose = require("mongoose")
// ---------------------------------- Table Schema ----------------------------------
let ItemSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    Description: String
})
// ---------------------------------- Export Class ----------------------------------
module.exports = mongoose.model("items", ItemSchema)
// ---------------------------------- End Of Item Class -----------------------------