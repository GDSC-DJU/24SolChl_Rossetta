const {deleteParents,deleteChild,deleteWechsler} = require('../models/db');

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

