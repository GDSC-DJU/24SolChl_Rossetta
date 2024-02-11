const {deleteParents,deleteChild} = require('../models/memberDB');
const {selectParents,selectChild} = require('../models/memberDB');
const {insertParents,insertChild} = require('../models/memberDB');
const {updateParents,updateChild} = require('../models/memberDB');
const jwt = require('jsonwebtoken');

//delete-------------------------------------------------------------------------
//회원 탈퇴
exports.deleteParentsInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        await deleteParents(id);
        res.status(200).json({
            code:200,
            massage:'success Delete',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Delete',
        });
    }
}

//자식 정보 삭제
exports.deleteChildInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        await deleteChild(id);
        res.status(200).json({
            code:200,
            massage:'success Delete',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Delete',
        });
    }
}


//get-------------------------------------------------------------------------
//부모 정보 가져오기
exports.parentsInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        // console.log(user_info);
        const data =await selectParents(id);
        res.status(200).json({
            code:200,
            massage:'success selecte',
            response:data
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed selecte',
        });
    }
}

//자식 정보 가져오기
exports.childInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        const data = await selectChild(id);
        const date = new Date()
        data.age = date.getFullYear() - Number(20+data.idNum.substr(0,2)) + 1;
        console.log(data)
        res.status(200).json({
            code:200,
            massage:'success selecte',
            response:data
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed selecte',
        });
    }
}



//POST-------------------------------------------------------------------------

//회원가입 부모
exports.parentsSignUp = async(req,res,next) => { 
    try{
        const info = req.body;
        const date = new Date();
        const joinDate = date.getFullYear() + '.' +date.getMonth() + '.' + getgetDate();
        await insertParents(info,joinDate);
        res.status(200).json({
            code:200,
            massage:'success signUp',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed signUp',
        });
    }
}

//회원가입 자식
exports.childSignUp = async(req,res,next) => { 
    try{
        const info = req.body;
        await insertChild(info);
        res.status(200).json({
            code:200,
            massage:'success signUp',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed signUp',
        });
    }
}



//로그인
exports.signIn = async(req,res,next) => {
    try{
        const {id,pw} = req.body;
        const data = await selectParents(id);
        console.log(data)

        if(data.length !== 0 && data.pw === pw){
            token = jwt.sign(
                {
                type: "JWT",
                id: id,
                pw: pw,
                },
                process.env.JWT_SECRET,
                {
                expiresIn: "10000m", // 10000분후 만료
                issuer: "server",
                }
            );
            res.status(200).json({
                code:200,
                massage:'success signIn',
                token
            }); 
        }else{
            throw(err);
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
            code: 400,
            message: '토큰 발급 실패',
        });
    }
}



//put-------------------------------------------------------------------------

//부모 정보 수정
exports.parentsInfoUpdate = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        const info = req.body;
        await updateParents(id,info);
        res.status(200).json({
            code:200,
            massage:'success Update',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Update',
        });
    }
}

//자식 정보 수정
exports.childInfoUpdate = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        const info = req.body;
        await updateChild(id,info);
        res.status(200).json({
            code:200,
            massage:'success Update',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Update',
        });
    }
}

