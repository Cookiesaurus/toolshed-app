"use server";
// import db from "@/app/config/db.mjs";
import mysql from "mysql2/promise";
import { redirect } from "next/dist/server/api-utils";
export const createNewUser = async (formData) => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        database: process.env.DB,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    const neededKeys = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "username",
        "addressFirst",
        "addressSecond",
        "city",
        "state",
        "zipCode",
    ];

    // Prepare account addition query
    const query_First =
        "INSERT INTO Accounts (First_Name, Last_Name, Email, Phone_Number, Password, Address_Line1, Address_Line2, City, State, Postal_Code, Membership_Level ) VALUES ";

    var query_second = "( ";
    for (const [key, value] of Object.entries(formData)) {
        if (neededKeys.includes(key)) {
            if (key === "password" || key === "zipCode")
                query_second += 'AES_Encrypt("' + String(value) + '", "") , ';
            // Username not included - Delete code after username implementation in database
            else query_second += "'" + String(value) + "', ";
        }
    }
    query_second = query_second.substring(0, query_second.length - 2) + " ,1 )";
    // query_second += " )";
    const query = query_First + query_second;
    try {
        const result = await db.execute(query);
        console.log(result);
        redirect("/");
    } catch (error) {
        if (error.code == "ER_DUP_ENTRY") {
            console.log("Account already exists. Log in instead");
        } else {
            console.log(error);
        }
    }
};
