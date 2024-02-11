const express = require('express');
const {deleteParentsInfo,deleteChildInfo} = require('../controllers/memberController');
const {parentsInfo,childInfo} = require('../controllers/memberController');
const {parentsSignUp,childSignUp,signIn} = require('../controllers/memberController');
const {parentsInfoUpdate,childInfoUpdate} = require('../controllers/memberController');
const {verifyToken} = require('../middlewares/jwt');

const router = express.Router();

//delete--------------------------------------------------------------------------

//자식 정보 삭제 router
router.delete('/child/delete',verifyToken,deleteChildInfo);

//부모 정보 삭제 router
router.delete('/parents/delete',verifyToken,deleteParentsInfo);



//get--------------------------------------------------------------------------

//자식 정보 get router
router.get('/child/info',verifyToken,childInfo);

//부모 정보 get router
router.get('/parents/info',verifyToken,parentsInfo);




//post--------------------------------------------------------------------------

//자식 가입 router
router.post('/sign-up/child',childSignUp);

//부모 가입 router
router.post('/sign-up/parents',parentsSignUp);

//로그인
router.post('/sign-in',signIn);




//put--------------------------------------------------------------------------

//자식 정보 수정 router
router.put('/child/update',verifyToken,childInfoUpdate);

//부모 정보 수정 router
router.put('/parents/update',verifyToken,parentsInfoUpdate);



module.exports = router;