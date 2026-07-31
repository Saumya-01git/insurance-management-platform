const express = require("express");

const router = express.Router();

const {
    uploadDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    getDocumentsByCustomer,
    getDocumentStatistics
} = require("../controllers/documentController");

const upload = require("../middleware/upload");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    documentValidation
} = require("../validators/documentValidator");

const validate = require("../middleware/validationMiddleware");

router.get(
    "/",
    protect,
    authorize("ADMIN", "AGENT"),
    getAllDocuments
);

router.get(
    "/dashboard/statistics",
    protect,
    authorize("ADMIN"),
    getDocumentStatistics
);

router.get(
    "/customer/:customerId",
    protect,
    authorize("ADMIN", "AGENT"),
    getDocumentsByCustomer
);

router.get(
    "/:id",
    protect,
    authorize("ADMIN", "AGENT"),
    getDocumentById
);

router.post(
    "/",
    protect,
    authorize("ADMIN"),
    upload.single("document"),
    documentValidation,
    validate,
    uploadDocument
);

router.put(
    "/:id",
    protect,
    authorize("ADMIN"),
    upload.single("document"),
    updateDocument
);

router.delete(
    "/:id",
    protect,
    authorize("ADMIN"),
    deleteDocument
);

module.exports = router;