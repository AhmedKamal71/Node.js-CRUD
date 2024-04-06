// ---------------------------------- All Requires ----------------------------------
const ItemModel = require("../Models/ItemModel")
const ItemValidate = require("../Utils/ItemValidate")
// ---------------------------------- Get All Items  --------------------------------
const GetAllItems = async (req, res) => {
    try {
        const allItems = await ItemModel.find({});
        if (allItems.length > 0) {
            return res.json({ AllItems: allItems });
        } else {
            return res.json({ Message: "No items found" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch all items" });
    }
};
// ---------------------------------- Get Item By ID --------------------------------
const GetItem = async (req, res) => {
    try {
        const item_id = req.params.id;
        if (!item_id) {
            return res.status(400).json({ Message: "No item ID provided" });
        }
        const item = await ItemModel.findOne({ _id: item_id });
        if (!item) {
            return res.status(404).json({ Message: "Failed to find this item" });
        }
        return res.json({ item: item });
    } 
    catch (error) {
        console.error("Error fetching item:", error);
        return res.status(500).json({ error: "Failed to fetch item" });
    }
};
// ---------------------------------- Add New Item --------------------------------
const AddItem = async (req, res) => {
    let data = req.body
    if(ItemValidate(data)){
        try {
            const newItem = new ItemModel(data); 
            await newItem.save(); 
            return res.json({ Message: "Item Added Successfully" , Data: req.body});
        } catch (error) {
            console.error("Error adding item:", error);
            return res.json({ error: "Failed to add item" });
        }
    }
    else{
        return res.json(ItemValidate.errors[0])
    }
};
// ---------------------------------- Update Item --------------------------------
const UpdateItem = async (req, res) => {
    let data = req.body
    if(ItemValidate(data)){
        try {
            const findItem = await ItemModel.findOne({ _id: req.params.id });
            if (!findItem) {
                return res.status(404).json({ error: "Item not found" });
            }
            await ItemModel.updateOne({ _id: req.params.id }, req.body);
            return res.json({ Message: "Item Updated Successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update item" });
        }
    }
    else{
        return res.json(ItemValidate.errors[0])
    }
};
// ---------------------------------- Delete Item --------------------------------
const DeleteItem = async (req, res) => {
    try {
        const findItem = await ItemModel.findById(req.params.id);
        if (!findItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        await ItemModel.deleteOne({ _id: req.params.id });
        return res.json({ Message: "Item Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete item" });
    }
};
// ---------------------------------- Export All Functions -----------------------
module.exports = {GetAllItems, GetItem, AddItem, UpdateItem, DeleteItem}
// ---------------------------------- End Of Item Controller ---------------------