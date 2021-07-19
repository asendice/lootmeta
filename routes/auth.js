const express = require("express");
const router = express.Router();


const {
    getToken,
} = require("../controllers/auth");

router.get("/getToken", getToken);

module.exports = router;