const { body } = require("express-validator");

// Register Validation
const registerValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    .withMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    ),

    body("role")
        .isIn(["ADMIN", "AGENT", "CUSTOMER"])
        .withMessage("Invalid role")

];

// Login Validation
const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")

];

module.exports = {
    registerValidation,
    loginValidation
};