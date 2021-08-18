const express = require('express');
const rateController = require('../../controllers/rate.controller');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');

const router = express.Router();

// router.route('/').get(rateController.getRates)

router.route('/:courseId').post(auth(), rateController.createRate);

module.exports = router;
