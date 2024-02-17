const express = require('express');
const {verifyToken} = require('../middlewares/jwt');
const {
    deletePronuncitaionInfo,
    pronunciationInfo,
    insertPronunciationInfo,
    deletePronuncitaionScoreInfo,
    pronunciationScoreInfo,
    insertPronunciationScoreInfo,
} = require('../controllers/pronunciationController');
const router = express.Router();

//발음평가 정보 삭제 router
router.delete('/delete/:pronunciationNum',verifyToken,deletePronuncitaionInfo);

//발음평가 정보 get router
router.get('/info/:level',verifyToken,pronunciationInfo);

//발음평가 정보 입력 router
router.post('/insert',verifyToken,insertPronunciationInfo);

//발음평가 점수 정보 삭제 router
router.delete('/delete/:pronunciationScoreNum',verifyToken,deletePronuncitaionScoreInfo);

//발음평가 점수 정보 get router
router.get('/info/score/:date/:level',verifyToken,pronunciationScoreInfo);

//발음평가 점수 정보 입력 router
router.post('/insert/score',verifyToken,insertPronunciationScoreInfo);

module.exports = router;