// ---------------------------------- All Requires ----------------------------------
const OrderModel = require("../Models/OrderModel")
const OrderValidate = require("../Utils/OrderValidate")
// ---------------------------------- Get All Orders ----------------------------------
let GetAllOrders = async (req,res)=>{
    try{
        let AllOrders = await OrderModel.find({})
        if(AllOrders.length > 0){
            return res.json({AllOrders: AllOrders})
        }
        else{
            return res.json({Message: "No Data Founded"})
        }
    }
    catch(error){
        return res.json({Message: "Failed To fetch All Orders"})
    }
}
// ---------------------------------- Get Order By ID ----------------------------------
let GetOrder = async (req,res)=>{
    try{
        let OrderId = req.params.id
        if(!OrderId){
            return res.json({Message: "This ID Does'nt Exist!"})
        }
        let order = await OrderModel.findOne({_id: OrderId})
        if(!order){
            return res.json({Message: "Failed To Get This Order!"})
        }
        return res.json({Order: order})
    }
    catch(error){
        return res.json({Message: "Failed To Get This Order!"})
    }
}
// ---------------------------------- Add New Order ----------------------------------
let AddOrder = async (req,res)=>{
    let data = req.body
    if(OrderValidate(data)){
        try{
            let NewOrder = new OrderModel(data)
            await NewOrder.save()
            return res.json({Message: "Order Was Added Succsessfully", data: data})
        }
        catch(error){
            return res.json({Message:"Failed To Add This Order!"})
        }
    }
    else{
        return res.json(OrderValidate.errors[0])
    }
}
// ---------------------------------- Update Order ----------------------------------
let UpdateOrder = async (req,res)=>{
    let data = req.body
    if(OrderValidate(data)){
        try {
            const findOrder = await OrderModel.findOne({ _id: req.params.id });
            if (!findOrder) {
                return res.status(404).json({ error: "Order not found" });
            }
            await OrderModel.updateOne({ _id: req.params.id }, req.body);
            return res.json({ Message: "Order Updated Successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update Order" });
        }
    }
    else{
        return res.json(OrderValidate.errors[0])
    }
}
// ---------------------------------- Delete Order ----------------------------------
let DeleteOrder = async (req,res)=>{  
    try {
        const findOrder = await OrderModel.findById(req.params.id);
        if (!findOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        await OrderModel.deleteOne({ _id: req.params.id });
        return res.json({ Message: "Order Deleted Successfully" });
    } 
    catch (error) {
        return res.status(500).json({ error: "Failed to delete order" });
    }
}
// ---------------------------------- Export Order Functions ------------------------
module.exports = {GetAllOrders, GetOrder, AddOrder, UpdateOrder, DeleteOrder}
// ---------------------------------- End Of Order Controller -----------------------