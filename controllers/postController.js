const {insertParents,insertChild,insertWechsler,selectParents} = require('../models/db');
const jwt = require('jsonwebtoken');
//회원가입 부모
exports.parentsSignUp = async(req,res,next) => { 
    try{
        const info = req.body;
        await insertParents(info);
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

//웩슬러 정보 저장
exports.insertWechslerInfo = async(req,res,next) => { 
    try{
        const info = req.body;
        await insertWechsler(info);
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

        if(data.length !== 0 && data.PW === pw){
            token = jwt.sign(
                {
                type: "JWT",
                id: id,
                pw: pw,
                },
                process.env.JWT_SECRET,
                {
                expiresIn: "10000m", // 100분후 만료
                issuer: "server",
                }
            );
            res.status(200).json({
                code:200,
                massage:'success signIn',
                token
            }); 
        }else{
            return res.status(500).json({
                code: 400,
                message: '토큰 발급 실패',
            });
        }
    } catch(err){
        console.error(err);
        return res.status(500).json({
            code: 400,
            message: '토큰 발급 실패',
        });
    }
}