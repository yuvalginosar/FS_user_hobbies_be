import express from "express"
import userControllers from "../controllers/userControllers.js";

const router = express.Router();

router
    .route("/")
    .get(userControllers.getUsersList)

    router
    .route("/hobbies")
    .get(userControllers.getUsersWithHobbiesList)

    router
    .route('/add-user')
    .post(userControllers.addNewUser)

    router
    .route('/add-hobby')
    .post(userControllers.addNewHobby)

    router
    .route("/:id")
    .delete(userControllers.deleteUser)
export default router;