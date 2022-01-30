const authorization = require('../middleware/authorization');
const express = require("express")
const router = express.Router()

router.get("/add", authorization([]), (req, res, next) => {
    res.send("This is the homepage request")
})

router.get("/getfoodEntry", authorization(['admin', 'user']), (req, res, next) => {
    res.send("This is the homepage request")
})

module.exports = router