const express = require("express")
const router = express.Router();
const authorization = require('../middleware/authorization');
const reportService = require('../service/report');

router.get("/getuserReport", authorization(['admin', 'user']), async (req, res, next) => {
    const userId = req.ctx.user['_id'];
    try {
        const report = await reportService.getuserReport(userId);
        return res.status(200).send(report);
    } catch (e) {
        logger.error('getuserReport: Something went wrong', e);
        res.status(404).send('Bad request!');
        return;
    }
});


router.get("/getAdminReport", authorization(['admin']), async (req, res, next) => {
    try {
        const response = await reportService.getAdminReport();
        res.status(200).send(response);
        return;
    } catch (e) {
        logger.error('getfoodEntry: Something went wrong', e);
        res.status(404).send('Bad request!');
        return;
    }
});


module.exports = router