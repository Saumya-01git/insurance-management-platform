const { body } = require("express-validator");

const policyValidation = [

    body("customerId")
        .isInt({ min: 1 })
        .withMessage("Valid Customer ID is required"),

    body("policyType")
        .trim()
        .notEmpty()
        .withMessage("Policy type is required"),

    body("policyNumber")
        .trim()
        .notEmpty()
        .withMessage("Policy number is required"),

    body("premiumAmount")
        .isFloat({ min: 1 })
        .withMessage("Premium amount must be greater than 0"),

    body("startDate")
        .isISO8601()
        .withMessage("Please enter a valid start date"),

    body("endDate")
        .isISO8601()
        .withMessage("Please enter a valid end date"),

    body("status")
        .isIn(["ACTIVE", "EXPIRED", "CANCELLED"])
        .withMessage("Invalid policy status")

];

module.exports = {
    policyValidation
};