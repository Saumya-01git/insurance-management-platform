const { body } = require("express-validator");

const claimValidation = [

    body("policyId")
        .isInt({ min: 1 })
        .withMessage("Valid Policy ID is required"),

    body("claimAmount")
        .isFloat({ min: 1 })
        .withMessage("Claim amount must be greater than 0"),

    body("reason")
        .trim()
        .notEmpty()
        .withMessage("Claim reason is required"),

    body("status")
        .isIn(["PENDING", "APPROVED", "REJECTED"])
        .withMessage("Invalid claim status")

];

module.exports = {
    claimValidation
};