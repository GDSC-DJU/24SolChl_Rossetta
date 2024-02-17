const {insertMyPicPaint, selectMyPicPaint, deleteMyPicPaint} = require('../models/paintDB');
const {insertPaintEx, selectPaintEx, deletePaintEx} = require('../models/paintDB');
const fs = require('fs')
const path = require('path');
// myPicPaint 테이블 관련 함수

//myPicPaint 테이블에 데이터를 삽입
exports.insertPaint = async(req, res, next) => {
    try {
        console.log("asdfasdf")
        const body = req.body;
        const {id} = req.decoded;
        let {img,name,fileName} = body;
        const url = path.join(__dirname, `../`,`img/${fileName}.jpeg`);
        const saveUrl = `http://localhost:8000/${fileName}.jpeg`;
        fs.writeFile(url, img, 'base64', function(err) {
            console.log(err)
            if(err) {
                console.log(err);
            } else {
                console.log("success");
            }
        });
        console.log("adsf")
        
        await insertMyPicPaint(body,id,saveUrl);
        res.status(200).json({
            code: 200,
            message: 'success insert'
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({
            code: 400,
            message: 'failed insert'
        });
    }
}

//myPicPaint 테이블에서 특정 id의 데이터를 조회 수정
exports.getPaint = async(req, res, next) => {
    try {
        const {id} = req.decoded;

        const data = await selectMyPicPaint(id);
        res.status(200).json({
            code: 200,
            message: 'success get',
            response: data
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed get'
        });
    }

}

//myPicPaint 테이블에서 특정 num의 데이터를 삭제
exports.deletePaint = async(req, res, next) => {
    try {
        const num = req.params.num;
        await deleteMyPicPaint(num);
        res.status(200).json({
            code: 200,
            message: 'success delete'
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed delete'
        });
    }
}

// paintEx 테이블 관련 함수

//paintEx 테이블에 데이터를 삽입
exports.insertExample = async(req, res, next) => {
    try {
        const body = req.body;
        await insertPaintEx(body);
        res.status(200).json({
            code: 200,
            message: 'success insert'
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed insert'
        });
    }
}

//paintEx 테이블에서 특정 level의 데이터를 조회
exports.getExample = async(req, res, next) => {
    try {
        const level = req.params.level;
        const data = await selectPaintEx(level);
        res.status(200).json({
            code: 200,
            message: 'success get',
            response: data
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed get'
        });
    }
}

//paintEx 테이블에서 특정 num의 데이터를 삭제
exports.deleteExample = async(req, res, next) => {
    try {
        const num = req.params.num;
        await deletePaintEx(num);
        res.status(200).json({
            code: 200,
            message: 'success delete'
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed delete'
        });
    }
}

