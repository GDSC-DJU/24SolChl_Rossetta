const express = require('express');
const {parentsSignUp,childSignUp,insertWechslerInfo,signIn} = require('../controllers/postController');
const {verifyToken} = require('../middlewares/jwt');
const router = express.Router();

//자식 가입 router
router.post('/sign-up/child',childSignUp);

//부모 가입 router
router.post('/sign-up/parents',parentsSignUp);

//로그인
router.post('/sign-in',signIn);

//웩슬러 정보 입력 router
router.post('/sign-up/wechsler',verifyToken,insertWechslerInfo);
module.exports = router;