"use server"
import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

export const updateUserFromAdmin = async (formData) =>{
    //primary info
    const date = new Date(formData.get("date-of-birth"))
    const first = formData.get("firstName");
    const last = formData.get("lastName");
    const email = formData.get("email");
    const number = formData.get("phoneNumber");
    const pass = formData.get("password");
    const confrimPass = formData.get("re-enter-password");
    const addressOne = formData.get("street-address");
    const addressTwo = formData.get("street-address-two");
    const city = formData.get("city");
    const state = formData.get("state");
    const zip = formData.get("zipCode");
    const gender = formData.get("gender");
    const membership = formData.get("membership");
    const organization = formData.get("organization");
    const privilege = formData.get("privilege");

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

    const data = [first, last, date, genderCode, organization, email, pass, number, 
                addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
                secPhone, membershipCode, privilegeCode]
    console.log(data)

    try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the update statement
        const updateQuery = ``;
    
        // Execute the prepared statement
        await connection.query(updateQuery, data);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Account updated successfully');
      } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        connection.release();
        console.error('Error updating account:', error);
      }
}


export const deleteUser = async (id) =>{
     
     console.log(id)

     try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the delete statement
        const deleteQuery = ``;
    
        // Execute the prepared statement
        await connection.query(deleteQuery, [accountId]);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Account deleted successfully');
      } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        connection.release();
        console.error('Error deleting account:', error);
      }
}

export const addNewItem = async (formData) =>{

    //these are array values : use toString() method to convert to strings if needed 
    const status = formData.getAll("status")
    const categories = formData.getAll("category")
    const brand = formData.getAll("brand-name")
    const type = formData.getAll("type")

    //these are File objects
    const toolImage = formData.get("image")
    const toolManual = formData.get("additionalFile")

    const itemName = formData.get("itemName")
    const loanFee = formData.get("loanFee")
    const lateFee = formData.get("lateFee")
    const loanLength = formData.get("loanLength")
    const renewal = formData.get("loanRenew")
    const replacementCost = formData.get("replaceCost")
    const dropOffLocation = formData.get("dropOffLoc")
    const featured = formData.get("featured")
    const homeLocation = formData.get("homeLoc")
    const weight = formData.get("weight")
    const size = formData.get("size")

    const data = [itemName, status, categories, brand, type, toolImage, toolManual, loanFee, lateFee, loanLength, renewal, replacementCost,
        dropOffLocation, featured, homeLocation, weight, size
    ]

    console.log(data)
}

export const deleteItem = async (id) =>{
    console.log(id)

    try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the delete statement
        const deleteQuery = ``;
    
        // Execute the prepared statement
        await connection.query(deleteQuery, [accountId]);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Item deleted successfully');
      } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        connection.release();
        console.error('Error deleting item:', error);
      }
} 


export const updateItem = async (formData)=>{
    //these are array values : use toString() method to convert to strings if needed 
    const status = formData.getAll("status")
    const categories = formData.getAll("category")
    const brand = formData.getAll("brand-name")
    const type = formData.getAll("type")

    //these are File objects
    const toolImage = formData.get("image")
    const toolManual = formData.get("additionalFile")

    const itemName = formData.get("itemName")
    const loanFee = formData.get("loanFee")
    const lateFee = formData.get("lateFee")
    const loanLength = formData.get("loanLength")
    const renewal = formData.get("loanRenew")
    const replacementCost = formData.get("replaceCost")
    const dropOffLocation = formData.get("dropOffLoc")
    const featured = formData.get("featured")
    const homeLocation = formData.get("homeLoc")
    const weight = formData.get("weight")
    const size = formData.get("size")

    const data = [itemName, status, categories, brand, type, toolImage, toolManual, loanFee, lateFee, loanLength, renewal, replacementCost,
        dropOffLocation, featured, homeLocation, weight, size
    ]

    console.log(data)


    try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the update statement
        const updateQuery = ``;
    
        // Execute the prepared statement
        await connection.query(updateQuery, data);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Account updated successfully');
      } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        connection.release();
        console.error('Error updating account:', error);
      }
}