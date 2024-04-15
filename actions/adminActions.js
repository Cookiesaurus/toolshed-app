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
        VALUES (?, ?, ?, ?, ?, ?, AES_ENCRYPT(?, ""), ?, ?, ?, ?, ?, ?, ?, ? , ? ,? ,? ,? ,?, ? );`;

    if(!parse.error){
        const data = [first, last, date, genderCode, organization, email, pass, number, 
            addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
            secPhone, accountNotes, membershipCode, membershipStatus, privilegeCode]
        try {
            const db = await pool.getConnection()
            const rows = await db.execute(query, data);
            console.log(rows)
            console.log('Account inserted successfully!');
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
     
     console.log(id)

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
