const {deleteWechsler,selectWechsler,insertWechsler,updateWechsler} = require('../models/wechslerDB');

//웩슬러 정보 삭제
exports.deleteWechslerInfo = async(req,res,next) => { 
    try{
        const {wechslernum} = req.params;
        await deleteWechsler(wechslernum);
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

//웩슬러 정보 가져오기
exports.wechslerInfo = async(req,res,next) => { 
    try{
        // const {id} = req.decoded;
        const {childNum} = req.params;
        console.log("asdf")
        const data = await selectWechsler(childNum);
        console.log(data);
        res.status(200).json({
            code:200,
            massage:'success selecte',
            response:data
        });
    }catch(err){
        console.log("asdf")
        res.status(400).json({
            code:400,
            massage:'failed selecte',
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

//웩슬러 정보 수정
exports.wechslerInfoUpdate = async(req,res,next) => { 
    try{
        const {wechslerNum} = req.params
        const info = req.body;
        await updateWechsler(wechslerNum,info);
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