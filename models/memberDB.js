const {pool} = require('./db');

//------------------------------------------ 부모 ----------------------------------------------------------------------
//부모 데이터 저장
exports.insertParents = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {id,pw,idNum,name,phoneNum,email,adress,joinDate} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO parents (id,pw,idNum,name,phoneNum,address,joinDate) VALUES ("${id}","${pw}","${idNum}","${name}",,"${phoneNum}","${email}","${adress}","${joinDate}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//부모 정보 삭제
exports.deleteParents = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM parents WHERE id="${id}"`);
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
        await conn.query(`UPDATE parents SET pw="${pw}",phoneNum="${phoneNum}",address="${adress}" WHERE id="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//부모 정보 가져오기
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

//------------------------------------------ 자식 ----------------------------------------------------------------------
//자식 데이터 저장
exports.insertChild = async (body)=> {
    try{
        console.log(body)
        const conn = await pool.getConnection(async(conn) => conn);
        const {idNum,name,parentsId} = body;
        // console.log(pwd)
        await conn.query(`INSERT INTO child (idNum,name,parentsId) VALUES ("${idNum}","${name}","${parentsId}")`);
        conn.release();

    }catch(err){
        console.log(err);
    }
}

//자식 정보 삭제
exports.deleteChild = async (id)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM child WHERE parentsId="${id}"`);
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
        await conn.query(`UPDATE child SET name="${name}" WHERE parentsId="${id}"`);
        conn.release();
    }catch(err){
        console.log(err);
    }
}

//부모 정보로 자식 정보 가져오기
exports.selectChild = async (parentsId)=> {
    try{
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM child WHERE parentsId="${parentsId}"`);
        conn.release();
        return list[0][0];
    }catch(err){
        console.log(err);
    }
}
