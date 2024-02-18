const {
    insertPronunciation,
    deletePronunciation,
    updatePronunciation,
    selectPronunciation,
    insertPronunciationScore,
    deletePronunciationScore,
    selectPronunciationScore
} = require('../models/pronunciationDB');

//발음평가 정보 삭제
exports.deletePronuncitaionInfo = async(req,res,next) => { 
    try{
        const {pronunciationNum} = req.params;
        await deletePronunciation(pronunciationNum);
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

//발음평가 정보 가져오기
exports.pronunciationInfo = async(req,res,next) => { 
    try{
        // const {id} = req.decoded;
        const {level} = req.params;
        const data = await selectPronunciation(level);
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

//발음평가 정보 저장
exports.insertPronunciationInfo = async(req,res,next) => { 
    try{
        const info = req.body;
        await insertPronunciation(info);
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

//발음평가 점수 정보 삭제
exports.deletePronuncitaionScoreInfo = async(req,res,next) => { 
    try{
        const {pronunciationScoreNum} = req.params;
        await deletePronunciationScore(pronunciationScoreNum);
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

//발음평가 점수 정보 가져오기
exports.pronunciationScoreInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        const {date,level} = req.params;
        const data = await selectPronunciationScore(id,date,level);
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

//발음평가 점수 정보 저장
exports.insertPronunciationScoreInfo = async(req,res,next) => { 
    try{
        const {id} = req.decoded;
        const info = req.body;
        const date = new Date();
        console.log(info)

        const practiceDate = date.getFullYear() + '-' +date.getMonth() + '-' + date.getDate();
        await insertPronunciationScore(info,id,practiceDate);
        res.status(200).json({
            code:200,
            massage:'success insert',
        });
    }catch(err){
        res.status(400).json({
            code:400,
            massage:'failed insert',
        });
    }
}