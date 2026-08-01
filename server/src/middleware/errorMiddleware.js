const errorHandler = (err, req, res, next) => {

    console.error(err);

    // Prisma Unique Constraint Error
    if (err.code === "P2002") {

        return res.status(400).json({

            success: false,

            message: "Duplicate value already exists."

        });

    }

    // Prisma Record Not Found
    if (err.code === "P2025") {

        return res.status(404).json({

            success: false,

            message: "Record not found."

        });

    }

    const statusCode = err.status || 500;

    res.status(statusCode).json({

        success: false,

        message: err.message || "Internal Server Error"

    });

};

module.exports = errorHandler;