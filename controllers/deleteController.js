const {deleteParents,deleteChild,deleteWechsler} = require('../models/db');

//회원 탈퇴
exports.deleteParentsInfo = async(req,res,next) => { 
    try{
        const {id} = req.body;
        await deleteParents(id);
        res.status(201).json({
            code:201,
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
        const {idNum} = req.body;
        await deleteChild(idNum);
        res.status(201).json({
            code:201,
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
        const {num} = req.body;
        await deleteWechsler(num);
        res.status(201).json({
            code:201,
            massage:'success Delete',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Delete',
        });
    }
}

