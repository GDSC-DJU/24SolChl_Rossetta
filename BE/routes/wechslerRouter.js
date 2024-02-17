const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const {deleteWechslerInfo,wechslerInfo,insertWechslerInfo,wechslerInfoUpdate} = require('../controllers/wechslerController');

const router = express.Router();
//웩슬러 정보 삭제 router
router.delete('/delete/:wechslernum',verifyToken,deleteWechslerInfo);

//웩슬러 정보 get router
router.get('/info/',verifyToken,wechslerInfo);

//웩슬러 정보 입력 router
router.post('/sign-up/wechsler',verifyToken,insertWechslerInfo);

//웩슬러 정보 수정 router
router.put('/update/:wechslerNum',verifyToken,wechslerInfoUpdate);

module.exports = router;