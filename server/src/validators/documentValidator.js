const { body } = require("express-validator");

const documentValidation = [

    body("customerId")
        .isInt({ min: 1 })
        .withMessage("Valid Customer ID is required")

];

module.exports = {
    documentValidation
};