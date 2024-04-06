const express = require("express")
const routes = new express.Router()
const OrderController = require("../Controllers/OrderController")

routes.get("/", OrderController.GetAllOrders)
routes.get("/:id", OrderController.GetOrder)
routes.post("/", OrderController.AddOrder)
routes.put("/:id", OrderController.UpdateOrder)
routes.delete("/:id", OrderController.DeleteOrder)

module.exports = routes