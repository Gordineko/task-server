const express = require('express');
const postsController = require("../controller/postController");
const router = express.Router();

router.post('/createPost', postsController.create);

router.delete('/deletePost', postsController.deleted);

module.exports = router;
