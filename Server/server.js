// ---------------------------------- All Packages Requires ----------------------------------
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Market")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 7006
const Parser = require("body-parser")

// ---------------------------------- All Middlewares ----------------------------------------
app.use(Parser.urlencoded({extended:true}))
app.use(Parser.json())

// ---------------------------------- All Routes Requires ------------------------------------
const ItemRoutes = require("../Routes/ItemRoutes")
const OrderRoutes = require("../Routes/OrderRoutes")
const UserRoutes = require("../Routes/UserRoutes")

// ---------------------------------- All Routes ---------------------------------------------
app.use("/api/items", ItemRoutes)
app.use("/api/orders", OrderRoutes)
app.use("/api/users", UserRoutes)

// ---------------------------------- PORT Listen --------------------------------------------
app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
})
// ---------------------------------- End Of Server ------------------------------------------
