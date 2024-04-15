"use server";
// import db from "@/app/config/db.mjs";
import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { createSquareCustomer } from "./squareActions";
import {UserSchema, giftCardEmails } from "@/components/FormComponents/newUserSchema";
import {transporter, EMAIL} from "@/app/config/nodemailer"
import { NextResponse } from "next/server";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });


  export const testAddNewUser = async (formData) =>{
    const date = new Date(formData.get("date-of-birth"))
    const first = formData.get("first-name");
    const last = formData.get("last-name");
    const email = formData.get("email");
    const number = formData.get("phone-number");
    const pass = formData.get("password");
    const confrimPass = formData.get("re-password");
    const addressOne = formData.get("address-first");
    const addressTwo = formData.get("address-second");
    const city = formData.get("address-city");
    const state = formData.get("state")
    const zip = formData.get("address-zipcode")
    const gender = formData.get("gender")
    const membership = formData.get("membership-level")
    const organization = formData.get("organization")

    let membershipCode;
    switch(membership){
        case "Tinkerer":
            membershipCode = 2
            break;
        case "MacGyver":
            membershipCode = 3
            break;
        case "Builder":
            membershipCode = 4
            break;
        case "Contractor":
            membershipCode = 5
            break;
    }

    let genderCode;
    switch(gender){
        case "Male":
            genderCode = 2
            break;
        case "Female":
            genderCode = 3
            break;
        case "Other":
            genderCode = 4
            break;
        case "Would Rather Not Specify":
            genderCode = 5
            break;
    }

    const query = `INSERT INTO Accounts (First_Name, Last_Name, Email, Phone_Number, 
        Password, Address_Line1, Address_Line2, City, State, 
        Postal_Code, Membership_Level, Gender_Code, DOB, Organization_Name) 
             VALUES (?, ?, ?, ?, AES_ENCRYPT(?, ''), ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    //parse specific values
    let parse = {firstName: first, lastName: last, email: email, phone: number,password: pass, confirmPassword: confrimPass,  
        addressFirst: addressOne, addressSecond: addressTwo,  city: city, 
        state: state, zipCode: zip, membership: membership, 
        gender: gender, DOB: date};
    parse = UserSchema.safeParse(parse);
    

    if(!parse.error){
        const data = [first, last, email, number, pass, addressOne, addressTwo, city, state, zip, membershipCode, genderCode, date, organization]
        const db = await pool.getConnection();
        try {
            const rows = await db.execute(query, data);
            console.log(rows)
            console.log('Account inserted successfully!');
            db.release();
          } catch (error) {
            console.error('Error inserting account:', error);
          }
    }else{
        console.log(parse.error)
        return {error: "There was an errpr"}
    }

  }

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
        "membership",
        "gender"
    ];

    // Prepare account addition query
    const query_First =
        "INSERT INTO Accounts (First_Name, Last_Name, Email, Phone_Number, Password, Address_Line1, Address_Line2, City, State, Postal_Code, Membership_Level, Gender_Code ) VALUES ";

    var query_second = "( ";
    for (const [key, value] of Object.entries(formData)) {
        if (neededKeys.includes(key)) {
            if (key === "password")
                query_second += 'AES_Encrypt("' + String(value) + '", "") , ';
            // Username not included - Delete code after username implementation in database
            else query_second += "'" + String(value) + "', ";
        }
    }
    query_second =
        query_second.substring(0, query_second.length - 2) + " ,1 ,1 )";
    // query_second += " )";
    const query = query_First + query_second;
    const result = await addToDB(query);
    const squareCustID =
        result != -1 ? await createSquareCustomer(formData, result) : null;
    if (result != -1) {
        console.log("Sign up part 1 successful");
        // redirect("/");
        // redirect("/subscription");
        redirect("/subscription?custid=" + squareCustID);
        // redirect("/subscription?custid=" + "JMHP57PQ596KNTFAYQCFKYDVEG");
        // console.log("Square customer ID : ", squareCustID);
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
            console.log("Could not add user to databse : ", error);
        }
    }
};

const createSignedUpEmail = async (email) =>{
    try {
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "Welcome to the SEAC Tool SHED",
            text: "This is a text string",
            html: "<h1>Test title </h1> <p>Some body text</p>"
        });
    } catch (error) {
        console.log(error)
    }
}

export const sendGiftCardEmail = async (formData) =>{
    const fromEmail = formData.get("sender-email")
    const fromLast = formData.get("sender-last-name")
    const fromFirst = formData.get("sender-first-name")
    const fromMessage = formData.get("message")

    const toEmail = formData.get("recipient-email")
    const toFirst = formData.get("recipient-last-name")
    const toLast = formData.get("recipient-last-name")

    let parse = {toEmail: toEmail, fromEmail: fromEmail}

    parse = giftCardEmails.safeParse(parse)
    if(!parse.error){
        try {
            await transporter.sendMail({
                bcc: EMAIL,
                from: fromEmail,
                to: toEmail,
                subject: "SEAC Tool SHED Gift Card",
                text: fromMessage,
                html: `<h1>Test title </h1> <p>${fromMessage}</p>`
            });
          } catch (error) {
            console.log(error)
          } 
    }else{
        console.log(parse.error.errors)
        return {error: "There was an error"}
    }
}
