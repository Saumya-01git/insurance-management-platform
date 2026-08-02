const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  replyToTicket,
  updateTicketStatus,
} = require("../controllers/ticketController");

router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.post("/:id/reply", replyToTicket);
router.patch("/:id/status", updateTicketStatus);

module.exports = router;
