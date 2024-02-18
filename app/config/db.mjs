import mysql from 'mysql2/promise';
const db = await mysql.createConnection({
	host: "ls-30d09da39dca6fcd96da0461a42f33aca4c5b07e.c3i8ssyyouhq.us-east-2.rds.amazonaws.com",
	database: "dbmaster",
	port: 3306,
	user: "dbmasteruser",
	password: "-M-MQ,Z.2lBNOHQQPx4gd%Zwt>,[P):r"
});

export default db;
