const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const {insertSituationInfo,deleteSituationInfo,situationInfoUpdate,situationInfo} = require('../controllers/situationController');
const {insertSituationSelectInfo,deleteSituationSelectInfo,situationSelectInfoUpdate} = require('../controllers/situationController');

const router = express.Router();

//상황판단 정보 삭제 router
router.delete('/delete/:situationNum',verifyToken,deleteSituationInfo);

//상황판단 정보 get router
router.get('/info/:level',verifyToken,situationInfo);

//상황판단 정보 입력 router
router.post('/post',verifyToken,insertSituationInfo);

//상황판단 정보 수정 router
router.put('/update/:situationNum',verifyToken,situationInfoUpdate);

//상황판단 선택 정보 삭제 router
router.delete('/delete/:situationSelectNum',verifyToken,deleteSituationSelectInfo);

//상황판단 선택 정보 입력 router
router.post('/post/select',verifyToken,insertSituationSelectInfo);

//상황판단 선택 정보 수정 router
router.put('/update/:situationSelectNum',verifyToken,situationSelectInfoUpdate);

module.exports = router;