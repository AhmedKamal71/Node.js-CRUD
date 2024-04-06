const express = require("express")
const routes = new express.Router()
const ItemController = require("../Controllers/ItemController")

routes.get("/", ItemController.GetAllItems)
routes.get("/:id", ItemController.GetItem)
routes.post("/", ItemController.AddItem)
routes.put("/:id", ItemController.UpdateItem)
routes.delete("/:id", ItemController.DeleteItem)

module.exports = routes