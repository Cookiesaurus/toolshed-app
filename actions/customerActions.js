"use server";
// import db from "@/app/config/db.mjs";
import mysql from "mysql2/promise";
import {transporter, EMAIL} from "@/app/config/nodemailer"
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

export async function pickUpTool(toolID, accountID, email, status){
    if(status === 'Disabled' || status === 'Maintence' || status === 'Checked Out'){
        return {status: 'This tool is not able to be reserved at this time'}
    }else{
        //check the users membership and get the max number of tools they can check out
    const maxToolsQuery = `SELECT Accounts.Account_ID, Membership_Levels.Max_Tool_Checkout FROM Accounts
    INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level
    WHERE Accounts.Membership_Status = 1 AND Accounts.Account_ID = ${accountID};`;
    const maxToolOptions = {sql: maxToolsQuery, rowsAsArray: true}

    //check the current amount of tools they have checked out
    const currentToolsQuery = `SELECT COUNT(*) FROM Transactions
    WHERE Account_ID = ${accountID} AND Transaction_Type = 5 AND Transaction_Status = "Open";`
    const currentToolOptions = {sql: currentToolsQuery, rowsAsArray: true}

    //add a transaction to the transaction table
     //set the account ID, toolID, transaction status, current data, transaction type
    const addTransactionQuery = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type) 
    VALUES (${accountID}, ${toolID}, "Open", curdate(), 5);`

    //update the status of the tool to check out
    const toolStatusUpdateQuery = `UPDATE Tools
    SET Tools.Tool_Status = 2 WHERE Tools.Tool_ID = ${toolID};`

    //send email on completion
    try {
        const db = await pool.getConnection();
        let maxTools = await db.query(maxToolOptions)
        let numToolsForAccount = maxTools[0][0][1];
        
        let currentTools = await db.query(currentToolOptions)
        let currentToolsOnAccount = currentTools[0][0][0]
         //if the number of tools checked out equals the amount alloted then they cant check out
        //else they can check out
        if(currentToolsOnAccount === numToolsForAccount){
            return {status: 'too many'}
        }

        await db.execute(addTransactionQuery)

        await db.query(toolStatusUpdateQuery)
        
        //await createTransactionEmail(email)
        
        db.release();
        return {status: 'success'}
    } catch (error) {
        console.log(error)
        return {status: 'error'}
    }
    }
}


const createTransactionEmail = async (email) =>{
    try {
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "Tool Reserved For Pickup",
            text: "You've reserved a tool at the tool shed!",
            html: "<h1>Yay! </h1> <p>You've reserved a tool at the tool shed!</p>"
        });
    } catch (error) {
        console.log(error)
    }
}
