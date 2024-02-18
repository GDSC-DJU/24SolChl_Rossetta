const {pool} = require('./db');

// myPicPaint 테이블 관련 함수

// myPicPaint 테이블에 데이터를 삽입
exports.insertMyPicPaint = async (body,id,img) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const {Picname} = body;
        await conn.query(`INSERT INTO myPicPaint (id, Picname, image) VALUES ("${id}", "${Picname}", "${img}")`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}

//myPicPaint 테이블에서 특정 id의 데이터를 조회
exports.selectMyPicPaint = async (id) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM myPicPaint WHERE id="${id}"`);
        conn.release();
        return list[0];
    } catch(err) {
        console.log(err);
    }
}

//myPicPaint 테이블에서 특정 num의 데이터를 삭제
exports.deleteMyPicPaint = async (num) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM myPicPaint WHERE num=${num}`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}


// paintEx 테이블 관련 함수

//paintEx 테이블에 데이터를 삽입
exports.insertPaintEx = async (body) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const {image, Picname, level} = body;
        await conn.query(`INSERT INTO paintEx (image, Picname, level) VALUES ("${image}", "${Picname}", ${level})`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}

//paintEx 테이블에서 특정 level의 데이터를 조회
exports.selectPaintEx = async (level) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM paintEx WHERE level=${level}`);
        conn.release();
        return list[0];
    } catch(err) {
        console.log(err);
    }
}

//paintEx 테이블에서 특정 num의 데이터를 삭제
exports.deletePaintEx = async (num) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM paintEx WHERE num=${num}`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}
