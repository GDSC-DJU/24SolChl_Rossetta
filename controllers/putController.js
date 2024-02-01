const {updateParents,updateChild,updateWechsler} = require('../models/db');

//부모 정보 수정
exports.parentsInfoUpdate = async(req,res,next) => { 
    try{
        const info = req.body;
        await updateParents(info);
        res.status(201).json({
            code:201,
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
        const info = req.body;
        await updateChild(info);
        res.status(201).json({
            code:201,
            massage:'success Update',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Update',
        });
    }
}

//웩슬러 정보 수정
exports.wechslerInfoUpdate = async(req,res,next) => { 
    try{
        const info = req.body;
        await updateWechsler(info);
        res.status(201).json({
            code:201,
            massage:'success Update',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Update',
        });
    }
}