const {insertPattern, selectPattern, deletePattern, updatePattern} = require('../models/patternDB');

// pattern 테이블 관련 함수

//pattern 테이블에 데이터를 삽입
exports.insertPatternData = async(req, res, next) => {
    try {
        const body = req.body;
        const {id} = req.decoded;
        await insertPattern(body,id);
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

//pattern 테이블에서 특정 id의 데이터를 조회 수정
exports.getPatternData = async(req, res, next) => {
    try {
        const {id} = req.decoded;
        const level = req.params.level;
        const date = req.params.date;

        //파라미터로 level를 가져오기
        const data = await selectPattern(level, id, date);
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

//pattern 테이블에서 특정 num의 데이터를 삭제
exports.deletePatternData = async(req, res, next) => {
    try {
        const num = req.params.num;
        await deletePattern(num);
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

//pattern 테이블에서 특정 num의 데이터를 수정
exports.updatePatternData = async(req, res, next) => {
    try {
        const num = req.params.num;
        const body = req.body;
        await updatePattern(num, body);
        res.status(200).json({
            code: 200,
            message: 'success update'
        });
    } catch(err) {
        res.status(400).json({
            code: 400,
            message: 'failed update'
        });
    }
}
