const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

router.post("/", registerController.registerController);
router.all("/", registerController.otherMethods);

module.exports = router;
