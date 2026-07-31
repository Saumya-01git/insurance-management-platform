const { body } = require("express-validator");

const customerValidation = [

    body("userId")
        .isInt({ min: 1 })
        .withMessage("Valid User ID is required"),

    body("dob")
        .isISO8601()
        .withMessage("Please enter a valid date"),

    body("phone")
        .matches(/^[6-9]\d{9}$/)
        .withMessage("Please enter a valid 10-digit mobile number"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")

];

module.exports = {
    customerValidation
};