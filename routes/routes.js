const express = require('express');
const router = express.Router();
const controller = require('../controller/blockchain');
//const common = require()


router.post('/addBank',controller.addBank);
router.post('/addUsers',controller.addUsers);
router.post('/addMoneyIntoWallet',controller.addMoneyIntoWallet);
router.post('/addMoneyIntoBank',controller.addMoneyIntoBank);
router.post('/transfer',controller.transfer);
router.get('/bankDetail/:bankAddress',controller.bankDetail);
router.get('/userDetail/:userAddress',controller.userDetail);
router.get('/bankDetailOfUser/:userAddress/:bankAddress',controller.bankDetailOfUser);


module.exports = router;
