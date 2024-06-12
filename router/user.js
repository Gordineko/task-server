const Router = require("express");
const router = new Router();
const userController = require("../controller/usersController");


router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/users", userController.getAllUsers);

module.exports = router;
