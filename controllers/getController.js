const {selectParents, selectChild,selectWechsler} = require('../models/db');

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