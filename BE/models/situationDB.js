const {pool} = require('./db');


// 상황판단B---------------------------------------------------------------------

//상황 저장
exports.insertSituation = async (body,num)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {image,level,answer,question} = body;
        await conn.query(`INSERT INTO situation (num,level,image,answer,question) VALUES ("${num}","${level}","${image}","${answer}","${question}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//상황 정보 삭제
exports.deleteSituation = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM situation WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//상황 정보 업데이트
exports.updateSituation = async (body,num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const {image,question,level,answer} = body;
        await conn.query(`UPDATE situation SET image="${image}",answer="${answer}",level="${level}",question="${question}" WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//상황 정보 가져오기
exports.selectSituation = async (level)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM situation WHERE level="${level}"`);
        conn.release();
        return list[0];
    }catch(err){
        console.log(err);
    }
}

//상황 선택---------------------------------------------------------------------------

//상황 선택 저장
exports.insertSituationSelect = async (body,situation_num)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {firstNum,secondNum,thirdNum,fourthNum} = body;
        await conn.query(`INSERT INTO situation_select (situation_num,firstNum,secondNum,thirdNum,fourthNum) VALUES ("${situation_num}","${firstNum}","${secondNum}","${thirdNum}","${fourthNum}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//상황 선택 정보 삭제
exports.deleteSituationSelect = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM situation_select WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//상황 선택 정보 업데이트
exports.updateSituationSelect = async (body,num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const {image,question,level,answer} = body;
        await conn.query(`UPDATE situation_select SET image="${image}",answer="${answer}",level="${level}",question="${question}" WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//상황 선택 정보 가져오기
exports.selectSituationSelect = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM situation_select WHERE situation_num="${num}"`);
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}