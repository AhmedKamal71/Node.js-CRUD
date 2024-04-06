// ---------------------------------- All Requires ----------------------------------
const mongoose = require("mongoose")
// ---------------------------------- Table Schema ----------------------------------
let OrderSchema = new mongoose.Schema({
  totalPrice: {
    type: Number,
    required: true
  },
  items: {
    type: [Number],
    required: true
  }
})
// ---------------------------------- Export Class ----------------------------------
module.exports = mongoose.model("orders", OrderSchema)
// ------------------------------ End Of Order Class  -------------------------------