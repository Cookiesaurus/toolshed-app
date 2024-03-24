import mysql from "mysql2/promise";
const db = await mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const helperFunctions= {

    async selectFromDB(query){
        const [data] = await db.execute(query);
        return data;
    }
}

Object.assign(db, helperFunctions)


export default db;
