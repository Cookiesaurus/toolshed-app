"use server";
import mysql from "mysql2/promise";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "@/app/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    addSubscription,
    retrieveCustomer,
    getCards,
    createTransOrder,
    makeLateFeePayment,
} from "./squareActions";
import { updateUserProfileSchema } from "@/components/FormComponents/newUserSchema";

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions);

    if (!session.isLoggedIn) {
        session.isLoggedIn = false;
    }

    return session;
};
export const login = async (formData) => {
    let user = null;
    let dbPass = null;
    const session = await getIronSession(cookies(), sessionOptions);
    console.log("Login details recieved. ");
    const db = await pool.getConnection();
    const query =
        "SELECT *, AES_Decrypt(Password ,'') as pwd FROM Accounts WHERE Email='" +
        formData.get("email") +
        "'";
    const result = await db.execute(query).then((res) => {
        user = res[0][0];
        dbPass = res[0][0] ? res[0][0].pwd.toString() : null;
    });
    if (!dbPass || formData.get("password") != dbPass) {
        console.log("Wrong credentials!");
        return { error: "Wrong credentials! " };
    }
    console.log("User authenticated.");
    db.release();
    session.user = user;
    session.isLoggedIn = true;
    await session.save().then(() => {
        console.log("User logged in.");
        let auth = user.Privilege_Level;
        if (auth == 4 || auth == 5) {
            redirect("/admin/dashboard");
        } else {
            redirect("/");
        }
    });
    // const db_pass = result[0][0] ? result[0][0].pwd : undefined;
};
export const logout = async () => {
    const session = await getSession();
    console.log("Logging out.");
    session.destroy();
    redirect("/login");
};

export const addSubscriptionAction = async (formData) => {
    const result = await addSubscription(formData.get("plan"));
};

export const changePassword = async (formData) => {
    let email = formData.get("email");
    let newPass = formData.get("new-password");

    try {
        const connection = await pool.getConnection();
        const sql =
            'UPDATE Accounts SET Password = AES_ENCRYPT(?, "") WHERE Email = ?';

        const [rows, fields] = await connection.execute(sql, [newPass, email]);

        connection.release();
        if (rows.changedRows > 0) {
            return { success: "Password updated successfully!" };
        } else {
            return {
                error: "There was an error when trying to update your password.",
            };
        }
    } catch (error) {
        return {
            error: "There was an error when trying to update your password.",
        };
    }
};

export const updateMembership = async (planName, customerId) => {
    // Get customer from customer ID
    const customer = await retrieveCustomer(customerId);
    const cust_email = customer.customer.emailAddress;
    // Use email or reference ID (email)
    const db = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        database: process.env.DB,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    let query = "UPDATE Accounts SET Membership_Level = ";
    // Get membership level according to name
    let amt;
    if (planName == "tinker") amt = 1;
    else if (planName == "macgyver") amt = 2;
    else if (planName == "builder") amt = 3;
    else if (planName == "contractor") amt = 4;

    query += String(amt) + " WHERE Email = '" + cust_email + "';";
    // Get account from email
    // console.log(query);
    // Update membership
    const acc = await db.execute(query);
    // Save and close
    await db.commit();
    console.log("Membership added.");
    await db.end();
};

export const updateUserProfile = async (accountID, formData) => {
    const primaryFirstName = formData.get("first-name");
    const primaryLastName = formData.get("last-name");
    const primaryEmail = formData.get("email");
    const primaryPhone = formData.get("phone");
    const organization = formData.get("organization");

    const secFirstName = formData.get("secondary-first-name");
    const secLastName = formData.get("secondary-last-name");
    const secPhone = formData.get("secondary-phone");
    const secEmail = formData.get("secondary-email");

    const addressOne = formData.get("address_line1");
    const addressTwo = formData.get("address_line2");
    const city = formData.get("city");
    const zip = formData.get("postal_code");
    const state = formData.get("state");

    let parse = {
        firstName: primaryFirstName,
        lastName: primaryLastName,
        email: primaryEmail,
        phone: primaryPhone,
        addressFirst: addressOne,
        addressSecond: addressTwo,
        city: city,
        state: state,
        zipCode: zip,
    };
    parse = updateUserProfileSchema.safeParse(parse);

    const query = ` UPDATE Accounts SET First_Name = ?,Last_Name = ?,Organization_Name = ?,
                Email = ?, Phone_Number = ?,Address_Line1 = ?,Address_Line2 = ?,City = ?, State = ?,
                Postal_Code = ?, Secondary_First_Name = ?, Secondary_Last_Name = ?, Secondary_Email = ?,
                Secondary_Phone_Number = ? WHERE Account_ID = ${accountID}`;

    console.log(query);
    if (!parse.error) {
        const data = [
            primaryFirstName,
            primaryLastName,
            organization,
            primaryEmail,
            primaryPhone,
            addressOne,
            addressTwo,
            city,
            state,
            zip,
            secFirstName,
            secLastName,
            secEmail,
            secPhone,
        ];
        const db = await pool.getConnection();
        try {
            const rows = await db.execute(query, data);
            console.log(rows);
            console.log("Account updated successfully!");
        } catch (error) {
            console.error("Error inserting account:", error);
        } finally {
            db.release();
        }
    } else {
        console.log(parse.error);
        return { error: "There was an errpr" };
    }
};

// Function to get tools for user
export const lateToolPayment = async (custId) => {
    // NEED SQL QUERY
    // Select all transactions with type tool checkout and status OPEN
    //     const query =
    //         `SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
    // Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
    // INNER JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    // INNER JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
    // INNER JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
    // WHERE Transaction_Types.Transaction_Details = "Tool Check Out" AND Transactions.Transaction_Status = "Open" AND Accounts.Customer_ID = "` +
    //         userId +
    //         `"`;
    const query2 =
        `SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Tools.Default_Late_Fee, Tools.Tool_Loan_Fee, Tools.Tool_Replacement_Cost, Transactions.Transaction_Status, Transactions.Transaction_Date,
Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
INNER JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
INNER JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
INNER JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
WHERE Transaction_Types.Transaction_Details = "Tool Check Out" AND Transactions.Transaction_Status = "Open" AND Accounts.Customer_ID = "` +
        custId +
        `"`;
    const db = await pool.getConnection();
    try {
        const result = await db.execute(query2);
        const transactions = result[0]; // All the transactions - this should be a list of transactions
        // console.log(transactions);
        // let card = await getCards(custId);
        // card = JSON.parse(card).cards[0];
        transactions.map((transaction) => {
            let endDate = transaction.End_Date;
            let date = new Date();
            let late = endDate - date < 0;
            let lateFee = transaction.Default_Late_Fee;
            // Calculate date, and if it is overdue, take payment
            if (late) {
                // Make late fee payment for customer
                const result = makeLateFeePayment(
                    custId,
                    lateFee,
                    transaction.Transaction_ID
                );
                return result;
            }
            // Send customer email that the card got charged
        });
    } catch (error) {
        console.error("Error getting late tools.", error);
    } finally {
        db.release();
    }
    // Select Tool IDs from each
    // Get end date for each
    // If end date has been passed, return Tool ID, status (late), fee
    let condition;
    let Tool_ID;
    let status;
    let fee;
    let tools = [];
    // For each transaction/ tool returned
    if (condition) {
        tools.push(
            JSON.stringify({ Tool_ID: Tool_ID, status: status, fee: fee })
        );
    }
    return tools;
};
