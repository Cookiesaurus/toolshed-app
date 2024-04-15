import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
const db = await pool.getConnection();

const helperFunctions= {

    async selectFromDB(query){
        const [data] = await db.execute(query);
        db.release();
        return data;
    }
}

Object.assign(db, helperFunctions)


export default db;
