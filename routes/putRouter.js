const express = require('express');
const {parentsInfoUpdate,childInfoUpdate,wechslerInfoUpdate} = require('../controllers/putController');
const {verifyToken} = require('../middlewares/jwt');
const router = express.Router();

//자식 정보 수정 router
router.put('/child',verifyToken,childInfoUpdate);

//부모 정보 수정 router
router.put('/parents',verifyToken,parentsInfoUpdate);

//웩슬러 정보 수정 router
router.put('/wechsler',verifyToken,wechslerInfoUpdate);
module.exports = router;