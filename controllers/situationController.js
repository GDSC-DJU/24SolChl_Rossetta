const {insertSituation,deleteSituation,updateSituation,selectSituation,insertSituationSelect,deleteSituationSelect,updateSituationSelect,selectSituationSelect} = require('../models/situationDB');


// 상황판단---------------------------------------------------------------------
//상황 저장
exports.insertSituationInfo = async(req,res,next) => { 
    try{
        const body = req.body;
        const num = Math.floor(Math.random() * 10000000000000000000000);
        const {situation,select} = body
        await insertSituation(situation,num);
        await insertSituationSelect(select,num);

        res.status(200).json({
            code:200,
            massage:'success Insert',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Insert',
        });
    }
}

//상황 삭제
exports.deleteSituationInfo = async(req,res,next) => { 
    try{
        const {situationNum} = req.params;
        await deleteSituation(situationNum);
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

//상황 업데이트
exports.situationInfoUpdate = async(req,res,next) => { 
    try{
        const {situationNum} = req.params;
        const info = req.body;
        await updateSituation(situationNum,info);
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

//상황 가져오기
exports.situationInfo = async(req,res,next) => { 
    const {level} = req.params;
    let situation = [];

    try{
        const info = await selectSituation(level);
        info.forEach(async(item,index) => {
            const select = await selectSituationSelect(item.num);
            situation.push({
                situationNum:item.num,
                index:select.num,
                image:item.image,
                question:item.question,
                choice:[select.firstNum,select.secondNum,select.thirdNum,select.fourthNum],
                answer:item.answer,
                level:item.level
            })
            if(info.length === index+1){
                res.status(200).json({
                    code:200,
                    massage:'success selecte',
                    response:situation.reverse()
                });
            }
        });
        
        
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed selecte',
        });
    }
}


//상황 선택---------------------------------------------------------------------------

//상황 선택 저장
exports.insertSituationSelectInfo = async(req,res,next) => { 
    try{
        const body = req.body;
        const num = Math.floor(Math.random() * 10000000000000000000000);

        await insertSituationSelect(body,num);
        
        res.status(200).json({
            code:200,
            massage:'success Insert',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed Insert',
        });
    }
}

//상황 선택 삭제
exports.deleteSituationSelectInfo = async(req,res,next) => { 
    try{
        const {situationSelectNum} = req.params;
        await deleteSituationSelect(situationSelectNum);
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

//상황 선택 업데이트
exports.situationSelectInfoUpdate = async(req,res,next) => { 
    try{
        const {situationSelectNum} = req.params;
        const info = req.body;
        await updateSituationSelect(info,situationSelectNum);
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

