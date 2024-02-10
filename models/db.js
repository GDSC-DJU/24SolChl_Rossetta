const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_SECRET,
    database: 'rossetta',
    port:'3306',
    // connectionLimit : 30,
})

//------------------------------------------ 부모 ----------------------------------------------------------------------
//부모 데이터 저장
exports.insertParents = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {id,pw,idNum,name,phoneNum,email,adress,joinDate} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO parents (ID,PW,IDNUM,NAME,PHONENUM,EMAIL,ADRESS,JOINDATE) VALUES ("${id}","${pw}","${idNum}","${name}",,"${phoneNum}","${email}","${adress}","${joinDate}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//부모 정보 삭제
exports.deleteParents = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM parents WHERE ID="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//부모 정보 업데이트
exports.updateParents = async (id,body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {pw,phoneNum,adress} = body;
        await conn.query(`UPDATE parents SET PW="${pw}",PHONENUM="${phoneNum}",ADRESS="${adress}" WHERE ID="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//부모 정보 가져오기
exports.selectParents = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM parents WHERE ID="${id}"`);
        console.log(list)
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}

//------------------------------------------ 자식 ----------------------------------------------------------------------
//자식 데이터 저장
exports.insertChild = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {idNum,name,parentsId} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO child (IDNUM,NAME,PARENTSID) VALUES ("${idNum}","${name}","${parentsId}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//자식 정보 삭제
exports.deleteChild = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM child WHERE PARENTSID="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//자식 정보 업데이트
exports.updateChild = async (id,body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {parentsId,name} = body;
        await conn.query(`UPDATE child SET NAME="${name}" WHERE ID="${parentsId}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//부모 정보로 자식 정보 가져오기
exports.selectChild = async (parentsId)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM child WHERE PARENTSID="${parentsId}"`);
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}


//------------------------------------------ 웩슬러 ----------------------------------------------------------------------


//웩슬러 데이터 저장
exports.insertWechsler = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {chilIddNum,lang,pr,wm,ps,iq} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO wechsler (CHILDIDNUM,LANG,PR,WM,PS,IQ) VALUES ("${chilIddNum}","${lang}","${pr}","${wm}","${ps}","${iq}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//웩슬러 정보 삭제
exports.deleteWechsler = async (num)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM wechsler WHERE ID="${num}"`);
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
        await conn.query(`UPDATE wechsler SET LANG="${lang}",PR="${pr}",WM="${wm}",PS="${ps}",IQ="${iq}" WHERE NUM="${num}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//웩슬러 정보 가져오기
exports.selectWechsler = async (childIdNum)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM wechsler WHERE CHILDIDNUM="${childIdNum}"`);
        conn.release();
        return list[0];
    }catch(err){
        console.log(err);
    }
}