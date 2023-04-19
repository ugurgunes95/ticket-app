const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");

router.post("/buy", ticketsController.buyTicketController);
router.post("/list", ticketsController.listTicketsController);

module.exports = router;
