"use server";
// import db from "@/app/config/db.mjs";
import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { Client } from "square";
export const createNewUser = async (formData) => {
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
            if (key === "password")
                query_second += 'AES_Encrypt("' + String(value) + '", "") , ';
            // Username not included - Delete code after username implementation in database
            else query_second += "'" + String(value) + "', ";
        }
    }
    query_second = query_second.substring(0, query_second.length - 2) + " ,1 )";
    // query_second += " )";
    const query = query_First + query_second;
    const result = await addToDB(query);
    result != -1 ? createSquareCustomer(formData, result) : null;
    if (result != -1) {
        console.log("Sign up successful");
        redirect("/");
    }
};

const addToDB = async (query) => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        database: process.env.DB,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    let userIdDb;
    try {
        const result = await db.execute(query);
        console.log("user added ID: ", result[0].insertId);
        userIdDb = result[0].insertId;
        return result[0].serverStatus == 2 ? userIdDb : -1;
    } catch (error) {
        if (error.code == "ER_DUP_ENTRY") {
            console.log("Account already exists. Log in instead");
        } else {
            console.log(error);
        }
    }
};

const { customersApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: "sandbox",
});

export const createSquareCustomer = async (userInfo, customerId) => {
    try {
        const response = await customersApi.createCustomer({
            givenName: userInfo.firstName,
            familyName: userInfo.lastName,
            emailAddress: userInfo.email,
            address: {
                addressLine1: userInfo.addressFirst,
                addressLine2: userInfo.addressSecond
                    ? userInfo.addressSecond
                    : null,
                administrativeDistrictLevel1: userInfo.state,
                postalCode: userInfo.zipCode,
                country: "US",
            },
            referenceId: String(customerId),
            note: "New Customer added.",
        });
        console.log("Created square customer : ", response.result);
    } catch (error) {
        console.log(error);
    }
};
