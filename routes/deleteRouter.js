const express = require('express');
const {deleteParentsInfo,deleteChildInfo,deleteWechslerInfo} = require('../controllers/deleteController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

//자식 정보 삭제 router
router.delete('/child',verifyToken,deleteChildInfo);

//부모 정보 삭제 router
router.delete('/parents',verifyToken,deleteParentsInfo);

//웩슬러 정보 삭제 router
router.delete('/wechsler',verifyToken,deleteWechslerInfo);
module.exports = router;