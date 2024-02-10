const express = require('express');
const {parentsInfo,childInfo,wechslerInfo} = require('../controllers/getController');
const {verifyToken} = require('../middlewares/jwt');
const router = express.Router();

//자식 정보 get router
router.get('/info/child',verifyToken,childInfo);

//부모 정보 get router
router.get('/info/parents',verifyToken,parentsInfo);

//웩슬러 정보 get router
router.get('/info/wechsler/:childNum',verifyToken,wechslerInfo);

module.exports = router;