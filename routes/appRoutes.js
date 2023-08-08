const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

router
  .get("/", appController.getNotes)
  .get("/add", appController.getCreateNotes)
  .get("/search?", appController.getSearch)
  .post("/add", appController.postCreateNotes)
  .get("/edit/:noteId", appController.getEditNotes)
  .post("/edit/:noteId?", appController.postEditNotes)
  .get("/delete/:noteId?", appController.deleteNotes)
  .get("/starred", appController.getStarred)
  .post("/starred/true", appController.postStarSetTrue);

module.exports = router;
