const express = require('express');
const {deleteParentsInfo} = require('../controllers/memberController');
const {parentsInfo} = require('../controllers/memberController');
const {parentsSignUp,signIn} = require('../controllers/memberController');
const {parentsInfoUpdate} = require('../controllers/memberController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

//delete--------------------------------------------------------------------------



//부모 정보 삭제 router
router.delete('/parents/delete',verifyToken,deleteParentsInfo);



//get--------------------------------------------------------------------------


//부모 정보 get router
router.get('/parents/info',verifyToken,parentsInfo);




//post--------------------------------------------------------------------------


//부모 가입 router
router.post('/sign-up/parents',parentsSignUp);

//로그인
router.post('/sign-in',signIn);




//put--------------------------------------------------------------------------


//부모 정보 수정 router
router.put('/parents/update',verifyToken,parentsInfoUpdate);



module.exports = router;