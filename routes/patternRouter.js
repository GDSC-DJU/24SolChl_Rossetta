const express = require('express');
const {insertPatternData, getPatternData, deletePatternData, updatePatternData} = require('../controllers/patternController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

// pattern 테이블 관련 router

//pattern 테이블에 데이터를 삽입하는 router
router.post('/pattern', verifyToken, insertPatternData);

// pattern 테이블에서 특정 id의 데이터를 조회하는 router
router.get('/pattern/:id', verifyToken, getPatternData);

// pattern 테이블에서 특정 num의 데이터를 삭제하는 router
router.delete('/pattern/:num', verifyToken, deletePatternData);

// pattern 테이블에서 특정 num의 데이터를 수정하는 router
router.put('/pattern/:num', verifyToken, updatePatternData);

module.exports = router;