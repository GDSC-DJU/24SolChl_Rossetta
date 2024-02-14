const {pool} = require('./db');

// pattern 테이블 관련 함수

//pattern 테이블에 데이터를 삽입
exports.insertPattern = async (body) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const {id, level, time, date} = body;
        await conn.query(`INSERT INTO pattern (id, level, time, date) VALUES ("${id}", ${level}, "${time}", "${date}")`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}

//pattern 테이블에서 특정 id의 데이터를 조회하는 함수
exports.selectPattern = async (id) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const list = await conn.query(`SELECT * FROM pattern WHERE id="${id}"`);
        conn.release();
        return list[0];
    } catch(err) {
        console.log(err);
    }
}

//pattern 테이블에서 특정 num의 데이터를 삭제하는 함수
exports.deletePattern = async (num) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        await conn.query(`DELETE FROM pattern WHERE num=${num}`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}

//pattern 테이블에서 특정 num의 데이터를 수정
exports.updatePattern = async (num, body) => {
    try {
        const conn = await pool.getConnection(async(conn) => conn);
        const {level, time, date} = body;
        await conn.query(`UPDATE pattern SET level=${level}, time="${time}", date="${date}" WHERE num=${num}`);
        conn.release();
    } catch(err) {
        console.log(err);
    }
}
