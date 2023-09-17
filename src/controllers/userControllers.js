
import usersModel from "../models/usersModel.js"

async function addNewUser(req, res){
    try {
        const newUser = await usersModel.createUser(req.body)
        res.status(201).send(newUser);
    } catch (error) {
        console.log(error)  
    }
}

async function addNewHobby(req, res){
    try {
        const newHobby = await usersModel.addHobby(req.body)
        res.status(201).send(newHobby);
    } catch (error) {
        console.log(error)  
    }
}

async function getUsersList(req, res){
    try {
        const users = await usersModel.getAllUsers()
        res.send(users);
    } catch (error) {
        console.log(error)  
    }
}

async function getUsersWithHobbiesList(req, res){
    try {
        const users = await usersModel.getAllUsersAndHobbies()
        res.send(users);
    } catch (error) {
      console.log(error)  
    }
}

async function deleteUser(req, res){
    try {
        const { id } = req.params;
        const users = await usersModel.deleteUserAndHobbies(id)
        res.send(users);
    } catch (error) {
        console.log(error)  
    }
}
export default {addNewUser, getUsersList, addNewHobby, getUsersWithHobbiesList, deleteUser}