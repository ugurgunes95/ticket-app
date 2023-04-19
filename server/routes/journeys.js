const router = require("express").Router();
const journeysController = require("../controllers/journeysController");

router.get("/", journeysController.journeysController);
router.post("/", journeysController.filteredJourneysController);
router.post("/:id", journeysController.journeyDetailsController);

module.exports = router;
