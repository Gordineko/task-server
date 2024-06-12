const Router = require("express");
const router = new Router();

const user = require("./user");
const posts = require("./posts");
router.use("/user", user);
router.use("/posts", posts);


module.exports = router;
