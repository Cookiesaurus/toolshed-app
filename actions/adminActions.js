"use server"
import mysql from "mysql2/promise";
import {UserSchema} from "@/components/FormComponents/newUserSchema";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });


export const addNewUserFromAdmin = async (formData) =>{
    //primary info
    const date = new Date(formData.get("date-of-birth"))
    const first = formData.get("firstName");
    const last = formData.get("lastName");
    const email = formData.get("email");
    const number = formData.get("phone-number");
    const pass = formData.get("password");
    const confrimPass = formData.get("re-enter-password");
    const addressOne = formData.get("street-address");
    const addressTwo = formData.get("street-address-two");
    const city = formData.get("city");
    const state = formData.get("state");
    const zip = formData.get("zipCode");
    const gender = formData.get("gender");
    const membership = formData.get("membership-level");
    const organization = formData.get("organization");
    const privilege = formData.get("privilege");
    const accountNotes = formData.get('account-notes')

    //secondary user
    const secFirst = formData.get("secondary-first-name");
    const secLast = formData.get("secondary-last-name");
    const secEmail = formData.get("secondary-email");
    const secPhone = formData.get("secondary-number");

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

    let privilegeCode;
    switch(privilege){
        case "Customer":
            privilegeCode = 1
            break;
        case "Volunteer":
            privilegeCode = 2
            break;
        case "Employee":
            privilegeCode = 3
            break;
        case "Manager":
            privilegeCode = 4
            break;
        case "Admin":
            privilegeCode = 5
            break;
    }

    const membershipStatus = '1'
    const data = [first, last, date, genderCode, organization, email, pass, number, 
        addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
        secPhone, accountNotes, membershipCode, membershipStatus, privilegeCode]
    console.log(data)
    let parse = {firstName: first, lastName: last, email: email, phone: number,password: pass, confirmPassword: confrimPass,  
        addressFirst: addressOne, addressSecond: addressTwo,  city: city, 
        state: state, zipCode: zip, membership: membership, 
        gender: gender, DOB: date};
    parse = UserSchema.safeParse(parse);
 
    //need a query that also includes inserting secondary info and privilege levels
    const query = `INSERT INTO Accounts (First_Name, Last_Name, DOB, Gender_Code, Organization_Name, 
        Email, Password, Phone_Number, Address_Line1,
        Address_Line2, City, State, Postal_Code, Secondary_First_Name, Secondary_Last_Name,
        Secondary_Email, Secondary_Phone_Number, Account_Notes, Membership_Level, Membership_Status,
        Privilege_Level) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? ,? ,? ,? ,?, ? );`;

    if(!parse.error){
        const data = [first, last, date, genderCode, organization, email, pass, number, 
            addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
            secPhone, accountNotes, membershipCode, membershipStatus, privilegeCode]
        try {
            const db = await pool.getConnection()
            const rows = await db.execute(query, data);
            console.log(rows)
            console.log('Account inserted successfully!');
            db.release();
            return {status: 'success'}
          } catch (error) {
            console.error('Error inserting account:', error);
            return {status: 'success'}
          }
    }else{
        console.log(parse.error)
        return {status: "error"}
    }
}

export const updateUserFromAdmin = async (accountID, formData) =>{
    //primary info
    const date = new Date(formData.get("date-of-birth"))
    const first = formData.get("firstName");
    const last = formData.get("lastName");
    const email = formData.get("email");
    const number = formData.get("phoneNumber");
    const addressOne = formData.get("street-address");
    const addressTwo = formData.get("street-address-two");
    const city = formData.get("city");
    const state = formData.get("state");
    const zip = formData.get("zipCode");
    const gender = formData.get("gender");
    const membership = formData.get("membership-level");
    const organization = formData.get("organization");
    const privilege = formData.get("privilege");
    const accountNotes = formData.get('account-notes')

    //secondary user
    const secFirst = formData.get("secondary-first-name");
    const secLast = formData.get("secondary-last-name");
    const secEmail = formData.get("secondary-email");
    const secPhone = formData.get("secondary-number");

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

    let privilegeCode;
    switch(privilege){
        case "Customer":
            privilegeCode = 1
            break;
        case "Volunteer":
            privilegeCode = 2
            break;
        case "Employee":
            privilegeCode = 3
            break;
        case "Manager":
            privilegeCode = 4
            break;
        case "Admin":
            privilegeCode = 5
            break;
    }

    const data = [first, last, date, genderCode, organization, email, number, 
                addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
                secPhone, accountNotes, membershipCode, privilegeCode]
    console.log(data)

    const query = ` UPDATE Accounts SET  First_Name = ?, Last_Name = ?, DOB = ?, Gender_Code = ?, 
                    Organization_Name = ?, Email = ?, Password = ?, Phone_Number = ?, Address_Line1 = ?, 
                    Address_Line2 = ?, City = ?, State = ?, Postal_Code = ?, Secondary_First_Name = ?, 
                    Secondary_Last_Name = ?, Secondary_Email = ?, Secondary_Phone_Number = ?, Account_Notes = ?, 
                    Membership_Level = ?, Membership_Status = ?, Membership_Auto_Renewal = ?, 
                    Membership_Creation_Date = ?, Membership_Expiration_Date = ?, Privilege_Level = ?
    WHERE Account_ID = ${accountID}
  `;

    try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Execute the prepared statement
        await connection.query(query, data);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
        
        console.log('Account updated successfully');
        return {status: 'success'}
    } catch (error) {
        // Rollback the transaction in case of an error
        console.error('Error updating account:', error);
        return {status: 'error'}
      }
}


export const deleteUser = async (id) =>{

     try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the delete statement
        const deleteQuery = `UPDATE Accounts
        SET Membership_Level = 5, Membership_Status = 2, Membership_Auto_Renewal = 0, Membership_Creation_Date = CURDATE(), 
        Membership_Expiration_Date = CURDATE()
        WHERE Account_ID = ${id}`;
    
        // Execute the prepared statement
        await connection.query(deleteQuery);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Account deleted successfully');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
}

export const processCheckOut = async (transactionID, formData) =>{
    const returnDate = new Date(formData.get('returnDate'));
    console.log(isNaN(returnDate.getTime()))
    const loanFee = formData.get('loanFee');
    const loanLength = formData.get('loanLength');

    if(isNaN(returnDate.getTime())){
        return {status: 'date error'}
    }else{
        const updateTransaction = `UPDATE Transactions SET End_Date = ? WHERE Transaction_ID = ${transactionID};`
        const transactionData = [returnDate]
        try {
            const db = await pool.getConnection();
            await db.query(updateTransaction, transactionData);

            if(loanFee > 0){
                //process a payment 
            }
            return {status: 'success'}
        } catch (error) {
            console.error(error)
            return {status: 'error'}
        }
    }
}

export const cancelReservation = async (toolID, transaction) =>{

    const deleteFromTransactionsTable = `DELETE FROM Transactions WHERE Transactions.Transaction_ID = ${transaction} ;`
    const updateToolsTable = `UPDATE Tools SET Tools.Tool_Status = 1 WHERE Tools.Tool_ID = ${toolID};`
    try {
        const db = await pool.getConnection();
        await db.execute(deleteFromTransactionsTable)
        await db.execute(updateToolsTable)
        return {status: 'success'}
    } catch (error) {
        console.error(error)
        return {status: 'error'}
    }

}

export const processCheckIn = async (accountID, transactionID, toolID, floatingStatus, formData) =>{
    const returnLoc = formData.get('returnLoc')
    const dropOffLoc = formData.get('curLoc')
    const replacementFee = formData.get('replaceFee');
    console.log(replacementFee)
    const cleanFee = formData.get('cleanFee'); //null values
    const toolStatus = formData.get('tool-status')

    let curLocationCode;
    console.log(dropOffLoc)
    switch(dropOffLoc){
        case "Main Location":
            curLocationCode = 1
            break;
        case "Mobile Unit - Thomas P. Ryan Center (Monday)":
            curLocationCode = 2
            break;
        case "Mobile Unit - Edgerton Recreation Center (Tuesday)":
            curLocationCode = 3
            break;
        case "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)":
            curLocationCode = 4
            break;
        case "Mobile Unit - David F. Gantt Reacreation Center (Thursday)":
            curLocationCode = 5
            break;
    }

    let statusCode;
    switch(toolStatus){
        case "Available":
            statusCode = 1
            break;
        case "Checked Out":
            statusCode = 2
            break;
        case "Maintenance":
            statusCode = 3
            break;
        case "Disabled":
            statusCode = 4
            break;
    }

    try {
        const db = await pool.getConnection();
        console.log("locations", returnLoc, dropOffLoc)
        if((returnLoc === dropOffLoc && !floatingStatus) || floatingStatus){
            const updateCheckOut = `UPDATE Transactions SET Transaction_Status = "Closed" WHERE Transactions.Transaction_ID = ${transactionID};`
            await db.execute(updateCheckOut).then((response)=>{
                console.log('transactions table updated')
            })

            const insertCheckIn = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type) 
            VALUES (?, ?, "Closed", curdate(), 6);`
            const checkInData = [accountID, toolID]

            await db.query(insertCheckIn, checkInData).then((response)=>{
                console.log('transactions table values inserted')
            })

            const updateToolStatus = `Update Tools SET Tool_Status = ${statusCode} WHERE Tool_ID = ${toolID};`
            await db.execute(updateToolStatus).then((response)=>{
                console.log('One : tools table values updated')
            })

            const updateToolLocation = `Update Tools SET Tools.Current_Location = ${curLocationCode} WHERE Tools.Tool_ID = ${toolID};`
            await db.execute(updateToolLocation).then((response)=>{
                console.log('Two : transactions table values inserted')
            })

            db.release()
            
            //check the fee values 
            if((cleanFee ?? null) && (replacementFee ?? null)){
                console.log('apply both fees')
                
                const cleanFeeQuery = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, Payment_Amount)
                VALUES (?, ?, "Closed", curdate(), 12, 5);`
                const cleanFeeData = [accountID, toolID]

                await db.execute(cleanFeeQuery, cleanFeeData).then((response)=>{
                    console.log('One : Cleaning Fee')
                })

                const replaceFeeQuery = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, Payment_Amount)
                VALUES (?, ?, "Closed", curdate(), 11, ?);`
                const replaceFeeData = [accountID, toolID, replacementFee]

                await db.execute(replaceFeeQuery, replaceFeeData).then((response)=>{
                    console.log('One : replacement fee')
                })
                db.release()
                return {status: 'success both fees applied'}
            }
            else if(cleanFee ?? null){
                const cleanFeeQuery = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, Payment_Amount)
                VALUES (?, ?, "Closed", curdate(), 12, 5);`
                const cleanFeeData = [accountID, toolID]

                await db.execute(cleanFeeQuery, cleanFeeData).then((response)=>{
                    console.log('Two : Cleaning Fee')
                })
                db.release()
                return {status: 'success clean fees applied'}
            }else if(replacementFee ?? null){
                const replaceFeeQuery = `INSERT INTO Transactions (Account_ID, Tool_ID, Transaction_Status, Transaction_Date, Transaction_Type, Payment_Amount)
                VALUES (?, ?, "Closed", curdate(), 11, ?);`
                const replaceFeeData = [accountID, toolID, replacementFee]

                await db.execute(replaceFeeQuery, replaceFeeData).then((response)=>{
                    console.log('Two : replacement fee')
                })
                db.release()
                return {status: 'success replacement fees applied'}
            }
            db.release()
        }else{
            db.release()
            return {status: `location`}
        }

    } catch (error) {
        console.error(error)
        return {status: 'error'}
    }
    return {status: 'success'}
}
