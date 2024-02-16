const express = require('express');
const {insertPaint, getPaint, deletePaint} = require('../controllers/paintController');
const {insertExample, getExample, deleteExample} = require('../controllers/paintController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

// myPicPaint 테이블 관련 router

//myPicPaint 테이블에 데이터를 삽입하는 router
router.post('/mypicpaint', verifyToken, insertPaint);

// myPicPaint 테이블에서 특정 id의 데이터를 조회하는 router
router.get('/mypicpaint', verifyToken, getPaint);

// myPicPaint 테이블에서 특정 num의 데이터를 삭제하는 router
router.delete('/mypicpaint/:num', verifyToken, deletePaint);

// paintEx 테이블 관련 router

// paintEx 테이블에 데이터를 삽입하는 router
router.post('/paintex', verifyToken, insertExample);

// paintEx 테이블에서 특정 level의 데이터를 조회하는 router
router.get('/paintex/:level', verifyToken, getExample);

// paintEx 테이블에서 특정 num의 데이터를 삭제하는 router
router.delete('/paintex/:num', verifyToken, deleteExample);

module.exports = router;