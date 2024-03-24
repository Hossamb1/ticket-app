const express = require("express");
const router = express.Router();
const {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
} = require("../controller/ticketController");

const { protect } = require("../middleware/authMiddleware");

const noteRouter = require("./noteRoutes");

router.use("/:ticketId/notes", noteRouter);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
