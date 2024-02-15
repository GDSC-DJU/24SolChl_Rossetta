const {pool} = require('./db');

//------------------------------------------ 부모 ----------------------------------------------------------------------
//유저 데이터 저장
exports.insertParents = async (body,joinDate)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {id,pw,gender,name,phoneNum,email} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO parents (id,pw,gender,name,phoneNum,email,joinDate) VALUES ("${id}","${pw}","${gender}","${name}",,"${phoneNum}","${email}","${joinDate}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//유저 정보 삭제
exports.deleteParents = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM parents WHERE id="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//유저 정보 업데이트
exports.updateParents = async (id,body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {pw,phoneNum} = body;
        await conn.query(`UPDATE parents SET pw="${pw}",phoneNum="${phoneNum}" WHERE id="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//유저 정보 가져오기
exports.selectParents = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM parents WHERE id="${id}"`);
        console.log(list)
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}

