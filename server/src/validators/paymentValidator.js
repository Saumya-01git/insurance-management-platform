const { body } = require("express-validator");

const paymentValidation = [

    body("policyId")
        .isInt({ min: 1 })
        .withMessage("Valid Policy ID is required"),

    body("paymentDate")
        .isISO8601()
        .withMessage("Please enter a valid payment date"),

    body("dueDate")
        .isISO8601()
        .withMessage("Please enter a valid due date"),

    body("amount")
        .isFloat({ min: 1 })
        .withMessage("Payment amount must be greater than 0"),

    body("paymentStatus")
        .isIn(["PAID", "PENDING", "OVERDUE"])
        .withMessage("Invalid payment status")

];

module.exports = {
    paymentValidation
};