const express = require("express")
const routes = new express.Router()
const UserController = require("../Controllers/UserController")

routes.get("/", UserController.GetAllUsers)
routes.get("/:id", UserController.GetUser)
routes.post("/", UserController.AddUser)
routes.put("/:id", UserController.UpdateUser)
routes.delete("/:id", UserController.DeleteUser)

module.exports = routes