const {pool} = require('./db');



//웩슬러 데이터 저장
exports.insertWechsler = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {chilIddNum,lang,pr,wm,ps,iq} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO wechsler (childIdNum,lang,pr,wm,ps,iq) VALUES ("${chilIddNum}","${lang}","${pr}","${wm}","${ps}","${iq}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//웩슬러 정보 삭제
exports.deleteWechsler = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM wechsler WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//웩슬러 정보 업데이트
exports.updateWechsler = async (num,body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {lang,pr,wm,ps,iq} = body;
        await conn.query(`UPDATE wechsler SET lang="${lang}",pr="${pr}",wm="${wm}",ps="${ps}",iq="${iq}" WHERE num="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//웩슬러 정보 가져오기
exports.selectWechsler = async (childIdNum)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM wechsler WHERE childIdNum="${childIdNum}"`);
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}