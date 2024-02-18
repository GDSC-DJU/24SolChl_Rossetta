const {pool} = require('./db');



//발음평가 데이터 저장
exports.insertPronunciation = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {sentence,level} = body;
        await conn.query(`INSERT INTO pronunciation (sentence,level) VALUES ("${sentence}","${level}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//발음평가 정보 삭제
exports.deletePronunciation = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM pronunciation WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//발음평가 정보 업데이트
exports.updatePronunciation = async (num,body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {sentence,level} = body;
        await conn.query(`UPDATE pronunciation SET sentence="${sentence}",level="${level}"" WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//발음평가 정보 가져오기
exports.selectPronunciation = async (level)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM pronunciation WHERE level="${level}"`);
        conn.release();
        return list[0];
    }catch(err){
        console.log(err);
    }
}



//발음평가 점수 데이터 저장
exports.insertPronunciationScore = async (body,id,date)=> {
    try{
        console.log(body)

        const conn = await pool.getConnection(async(conn) => conn);
        const {sentence,level,score} = body;
        await conn.query(`INSERT INTO pronunciation_score (id,sentence,level,score,date) VALUES ("${id}","${sentence}","${level}","${score}","${date}")`);

        conn.release();

    }catch(err){
        console.log(err);
    }
}

//발음평가 점수 정보 삭제
exports.deletePronunciationScore = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM pronunciation_score WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//발음평가 점수 정보 가져오기
exports.selectPronunciationScore = async (id,date,level)=> {
    
    try{
        let list;
        const conn = await pool.getConnection(async(conn) => conn);
        if(date != 1){
            list = await conn.query(`SELECT * FROM pronunciation_score WHERE id="${id}" AND date="${date}" AND level="${level}" ORDER BY date DESC`);
        }else{
            list = await conn.query(`SELECT * FROM pronunciation_score WHERE id="${id}" AND level="${level}" ORDER BY date DESC`);
        }
        console.log(list)
        conn.release();
        return list[0];
    }catch(err){
        console.log(err);
    }
}