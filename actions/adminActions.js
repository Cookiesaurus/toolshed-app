"use server"
import mysql from "mysql2/promise";
import UserSchema from "@/components/FormComponents/newUserSchema";
import {S3, PutObjectCommand} from "@aws-sdk/client-s3";
const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  const ACCESSKEYID = process.env.TOOLSHEDS3_ACCCESS_KEY;
  const S3SECRETKEY = process.env.TOOLSHEDS3_USER_SECRET_KEY;

export const addNewUserFromAdmin = async (formData) =>{
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

    let parse = {firstName: first, lastName: last, email: email, phone: number,password: pass, confirmPassword: confrimPass,  
        addressFirst: addressOne, addressSecond: addressTwo,  city: city, 
        state: state, zipCode: zip, membership: membership, 
        gender: gender, DOB: date};
    parse = UserSchema.safeParse(parse);

    //need a query that also includes inserting secondary info and privilege levels
    const query = ``;

    if(!parse.error){
        const data = [first, last, date, genderCode, organization, email, pass, number, 
            addressOne, addressTwo, city, state, zip, secFirst, secLast, secEmail, 
            secPhone, membershipCode, privilegeCode]
        try {
            const db = await pool.getConnection()
            const rows = await db.execute(query, data);
            console.log(rows)
            console.log('Account inserted successfully!');
          } catch (error) {
            console.error('Error inserting account:', error);
          } finally {
            db.release();
          }
    }else{
        console.log(parse.error)
        return {error: "There was an errpr"}
    }
}

export const updateUserFromAdmin = async (accountID, formData) =>{
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


    imageToS3Bucket(toolImage).then((response)=>{
        console.log(response.status)
    })

    //check if the string value for manual is set 
    if(toolManual){
        fileToS3Bucket(toolManual).then((response)=>{
            console.log(response.status)
        })
    }

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

    //console.log(data)
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

const fileToS3Bucket = async (file) =>{
    let fileName = file?.name;
    let fileType = file?.type;

    const binaryfile= await file.arrayBuffer();
    const fileBuffer = Buffer.from(binaryfile);

    const s3 = new S3({
        region: 'us-east-2',
        credentials: {
            accessKeyId: ACCESSKEYID,
            secretAccessKey: S3SECRETKEY
        }
    })

    const params = {
        Bucket: 'seachtoolshedimages',
        Key: fileName,
        Body: fileBuffer,
        ContentType: fileType
    }

    try{
        const upload = await s3.send(new PutObjectCommand(params))
        return {status: 'success'}
    }catch(error){
        console.log(error);
        return {status: 'error', message: error}
    }
}

const imageToS3Bucket = async (image)=>{
    let imageName = image?.name;
    let imageType = image?.type;

    const binaryImage = await image.arrayBuffer();
    const imageBuffer = Buffer.from(binaryImage);

    const s3 = new S3({
        region: 'us-east-2',
        credentials: {
            accessKeyId: ACCESSKEYID,
            secretAccessKey: S3SECRETKEY
        }
    })

    const params = {
        Bucket: 'seachtoolshedimages',
        Key: imageName,
        Body: imageBuffer,
        ContentType: imageType
    }

    try{
        const upload = await s3.send(new PutObjectCommand(params))
        return {status: 'success'}
    }catch(error){
        console.log(error);
        return {status: 'error', message: error}
    }
}