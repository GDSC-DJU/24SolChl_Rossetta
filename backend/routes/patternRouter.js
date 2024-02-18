const express = require('express');
const {insertPatternData, getPatternData, deletePatternData, updatePatternData} = require('../controllers/patternController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

// pattern 테이블 관련 router

//pattern 테이블에 데이터를 삽입하는 router
router.post('/', verifyToken, insertPatternData);

// pattern 테이블에서 특정 id의 데이터를 조회하는 router 수정
router.get('/:level/:date', verifyToken, getPatternData);

// pattern 테이블에서 특정 num의 데이터를 삭제하는 router
router.delete('/:num', verifyToken, deletePatternData);

// pattern 테이블에서 특정 num의 데이터를 수정하는 router
router.put('/:num', verifyToken, updatePatternData);

module.exports = router;