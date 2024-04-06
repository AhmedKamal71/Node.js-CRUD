// ---------------------------------- All Requires ----------------------------------
const UserModel = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const UserValidate = require("../Utils/UserValidate")
// ---------------------------------- Get All Users ----------------------------------
let GetAllUsers = async (req,res)=>{
    try{
        let AllUsers = await UserModel.find({})
        if(AllUsers.length > 0){
            return res.json({AllUsers: AllUsers})
        }
        else{
            return res.json({Message: "No Data Founded"})
        }
    }
    catch(error){
        return res.json({Message: "Failed To fetch All Users"})
    }
}
// ---------------------------------- Get User By Email -------------------------------
let GetUser = async (req,res)=>{
    try{
        let UserId = req.params.id
        if(!UserId){
            return res.json({Message: "This Email Does'nt Exist!"})
        }
        let user = await UserModel.findOne({email: UserId})
        if(!user){
            return res.json({Message: "Failed To Get This User!"})
        }
        return res.json({User: user})
    }
    catch(error){
        return res.json({Message: "Failed To Get This User!"})
    }
}
// ---------------------------------- Add New User -------------------------------------
let AddUser = async (req,res)=>{
    let data = req.body
    if(UserValidate(data)){
        try{
            let foundUser = await UserModel.findOne({email: req.body.email.toLowerCase()})
            if(foundUser){
                return res.json({Message: "This User Is Already Exist!"})
            }
            let salt = await bcrypt.genSalt(10)
            let HashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = HashedPassword
            req.body.email = req.body.email.toLowerCase()
            let NewUser = new UserModel(data)
            await NewUser.save()
            return res.json({Message: "User Was Added Successfully"})
        }
        catch(error){
            return res.json({Message: "Error"})
        }
    }
    else{
        return res.json(UserValidate.errors[0])
    }
}
// ---------------------------------- Update User --------------------------------------
let UpdateUser = async (req,res)=>{
    let data = req.body
    if(UserValidate(data)){
        try {
            const findUser = await UserModel.findOne({ email: req.params.id });
            if (!findUser) {
                return res.status(404).json({ error: "User not found" });
            }
            await UserModel.updateOne({ email: req.params.id }, req.body);
            return res.json({ Message: "User Updated Successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update User" });
        }
    }
    else{
        return res.json(UserValidate.errors[0])
    }
}
// ---------------------------------- Delete User --------------------------------------
let DeleteUser= async (req,res)=>{
    try {
        const findUser = await UserModel.find({email: req.params.id});
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        await UserModel.deleteOne({ email: req.params.id });
        return res.json({ Message: "User Deleted Successfully" });
    } 
    catch (error) {
        return res.status(500).json({ error: "Failed to delete user" });
    }
}
// ---------------------------------- Export All Functions ------------------------------
module.exports = {GetAllUsers, GetUser, AddUser, UpdateUser, DeleteUser}
// ---------------------------------- End Of User Controller ----------------------------