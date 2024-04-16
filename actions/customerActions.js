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

export async function pickUpTool(toolID, accountID, email, status, toolName, pickupLoc){
    if(status === 'Disabled' || status === 'Maintenance' || status === 'Checked Out'){
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
        
        await createTransactionEmail(email, pickupLoc, toolName)
        
        db.release();
        return {status: 'success'}
    } catch (error) {
        console.log(error)
        return {status: 'error'}
    }
    }
}


const createTransactionEmail = async (email, pickupLoc, toolName) =>{
    try {
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "SEAC Tool SHED: Tool Reservation Confirmation",
            text: `We're writing to confirm your reservation for the following tool pickup at the SEAC Tool SHED:
            Tool: ${toolName}
            Pickup Location: ${pickupLoc}
            Please make sure to pick up your reserved tool at the specified location on the designated date. Our team will have the tool ready for you and will be happy to assist you with any questions you may have.
            If you have any changes to your reservation or need assistance, please contact us at  toolshed@seacrochester.org or 585-271-8665. as soon as possible.
            Thank you for choosing the SEAC Tool SHED. We look forward to serving you!
            `,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Tool Reservation Confirmation</title>
            </head>
            <body>
              <h1>Tool Reservation Confirmation</h1>
              <p>We're writing to confirm your reservation for the following tool pickup at <strong>the SEAC Tool SHED</strong>:</p>
              <ul>
                <li><strong>Tool:</strong> ${toolName}</li>
                <li><strong>Pickup Location:</strong>${pickupLoc}</li>
              </ul>
              <p>Please make sure to pick up your reserved tool at the specified location on the designated date. Our team will have the tool ready for you and will be happy to assist you with any questions you may have.</p>
              <p>If you have any changes to your reservation or need assistance, please contact us at <strong> toolshed@seacrochester.org or 585-271-8665</strong> as soon as possible.</p>
            </body>
            </html>`
        });
    } catch (error) {
        console.log(error)
    }
}
