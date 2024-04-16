"use server";
// import db from "@/app/config/db.mjs";
import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { createSquareCustomer } from "./squareActions";
import {
    UserSchema,
    giftCardEmails,
} from "@/components/FormComponents/newUserSchema";
import { transporter, EMAIL } from "@/app/config/nodemailer";
import { NextResponse } from "next/server";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const testAddNewUser = async (formData) => {
    const date = new Date(formData.get("date-of-birth"));
    const first = formData.get("first-name");
    const last = formData.get("last-name");
    const email = formData.get("email");
    const number = formData.get("phone-number");
    const pass = formData.get("password");
    const confrimPass = formData.get("re-password");
    const addressOne = formData.get("address-first");
    const addressTwo = formData.get("address-second");
    const city = formData.get("address-city");
    const state = formData.get("state");
    const zip = formData.get("address-zipcode");
    const gender = formData.get("gender");
    const membership = formData.get("membership-level");
    const organization = formData.get("organization");

    let membershipCode;
    switch (membership) {
        case "Tinkerer":
            membershipCode = 1;
            break;
        case "MacGyver":
            membershipCode = 2;
            break;
        case "Builder":
            membershipCode = 3;
            break;
        case "Contractor":
            membershipCode = 4;
            break;
    }

    let genderCode;
    switch (gender) {
        case "Male":
            genderCode = 1;
            break;
        case "Female":
            genderCode = 2;
            break;
        case "Other":
            genderCode = 3;
            break;
        case "Would Rather Not Specify":
            genderCode = 4;
            break;
    }

    const query = `INSERT INTO Accounts (First_Name, Last_Name, Email, Phone_Number, 
        Password, Address_Line1, Address_Line2, City, State, 
        Postal_Code, Membership_Level, Gender_Code, DOB, Organization_Name) 
             VALUES (?, ?, ?, ?, AES_ENCRYPT(?, ''), ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    //parse specific values
    let parse = {
        firstName: first,
        lastName: last,
        email: email,
        phone: number,
        password: pass,
        confirmPassword: confrimPass,
        addressFirst: addressOne,
        addressSecond: addressTwo,
        city: city,
        state: state,
        zipCode: zip,
        membership: membership,
        gender: gender,
        DOB: date,
    };
    parse = UserSchema.safeParse(parse);

    if (!parse.error) {
        const data = [
            first,
            last,
            email,
            number,
            pass,
            addressOne,
            addressTwo,
            city,
            state,
            zip,
            membershipCode,
            genderCode,
            date,
            organization,
        ];
        const db = await pool.getConnection();
        console.log(data);
        let cust_id;
        try {
            const rows = await db.execute(query, data);
            const acc_id = rows[0].insertId;
            console.log("ID Created", acc_id)
            console.log(rows);
            console.log("Account inserted successfully!");
            let squareInfo = { firstName: first, lastName: last, email: email };
            cust_id = await createSquareCustomer(squareInfo, acc_id);
            await createSignedUpEmail(email).then(()=>{
                console.log('email sent')
            })
            db.release();
            return cust_id;
        } catch (error) {
            console.error("Error inserting account:", error);
        } finally {
            db.release();
        }
    } else {
        console.log(parse.error);
        return { status: "error" };
    }
};

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
        "gender",
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

const createSignedUpEmail = async (email) => {
    try {
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "Welcome to the SEAC Tool SHED!",
            text: `Welcome to the South East Area Coalition Tool SHED! 
            Welcome to the South East Area Coalition Tool SHED! We're thrilled to have you as a new member of our community.
            As a member, you now have access to a wide range of tools and equipment to help you with your projects and DIY endeavors. Whether you're a seasoned handyman or just starting out, we're here to support you every step of the way.
            We're here to help you make your projects a success. If you have any questions or need assistance, feel free to contact us at toolshed@seacrochester.org or 585-271-8665.
            Once again, welcome to the SEAC Tool SHED community! We look forward to serving you and seeing the amazing projects you create.`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to the South East Area Coalition Tool SHED!</title>
            </head>
            <body>
              <h1>Welcome to the South East Area Coalition Tool SHED!</h1>
              <p>Welcome to the South East Area Coalition Tool SHED! We're thrilled to have you as a new member of our community.</p>
              <p>As a member, you now have access to a wide range of tools and equipment to help you with your projects and DIY endeavors. Whether you're a seasoned handyman or just starting out, we're here to support you every step of the way.</p>
              <p>We're here to help you make your projects a success. If you have any questions or need assistance, feel free to contact us at toolshed@seacrochester.org or 585-271-8665.</p>
              <p>Once again, welcome to the SEAC Tool SHED community! We look forward to serving you and seeing the amazing projects you create.</p>
            </body>
            </html>
            `,
        });
    } catch (error) {
        console.log(error);
    }
};

export const sendGiftCardEmail = async (formData) => {
    const fromEmail = formData.get("sender-email");
    const fromLast = formData.get("sender-last-name");
    const fromFirst = formData.get("sender-first-name");
    const fromMessage = formData.get("message");

    const toEmail = formData.get("recipient-email");
    const toFirst = formData.get("recipient-last-name");
    const toLast = formData.get("recipient-last-name");

    let parse = { toEmail: toEmail, fromEmail: fromEmail };

    parse = giftCardEmails.safeParse(parse);
    if (!parse.error) {
        try {
            await transporter.sendMail({
                bcc: EMAIL,
                from: fromEmail,
                to: toEmail,
                subject: "SEAC Tool SHED Gift Card",
                text: fromMessage,
                html: `<h1>Test title </h1> <p>${fromMessage}</p>`,
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log(parse.error.errors);
        return { error: "There was an error" };
    }
};
