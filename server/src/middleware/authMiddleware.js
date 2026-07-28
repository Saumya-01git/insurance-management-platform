const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            const user = await prisma.user.findUnique({
    where: {
        id: decoded.id
    }
});

const { password, ...userWithoutPassword } = user;

req.user = userWithoutPassword;

            next();

        } catch (error) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }
};

const authorize = (...roles) => {

    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                message: "Access denied"
            });

        }

        next();

    };

};

module.exports = {
    protect,
    authorize
};