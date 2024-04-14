"use server"
import mysql from "mysql2/promise";
import {newToolDigitsSchema, newToolSchema} from "@/components/FormComponents/newUserSchema";
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

export const addNewItem = async (formData) =>{

    //these are array values : use toString() method to convert to strings if needed 
    const status = formData.get("status")
    const categories = formData.getAll("category")
    const brand = formData.getAll("brand-name")
    const type = formData.getAll("type")

    //these are File objects
    const toolImage = formData.get("image")
    const toolManual = formData.get("additionalFile")

    let imageLink = ''
    if(toolImage?.size > 0){
        imageToS3Bucket(toolImage).then((response)=>{
        console.log(response.status)
    })
        imageLink = `https://seachtoolshedimages.s3.us-east-2.amazonaws.com/` + toolImage?.name;
    }else{
        imageLink = `https://seachtoolshedimages.s3.us-east-2.amazonaws.com/toolshed_logo.png`;
    }

    let manualLink = '';
    if(toolManual?.size > 0){
        fileToS3Bucket(toolManual).then((response)=>{
            console.log(response.status)
        })
        manualLink = `https://seachtoolshedimages.s3.us-east-2.amazonaws.com/` + toolManual?.name;
    }

    const itemName = formData.get("itemName")
    const loanFee = parseFloat(formData.get("loanFee"))
    const lateFee = parseFloat(formData.get("lateFee"))
    const loanLength = parseFloat(formData.get("loanLength"))
    const renewal = parseFloat(formData.get("loanRenew"))
    const replacementCost = parseFloat(formData.get("replaceCost"))
    const dropOffLocation = formData.get("dropOffLoc")
    const featured = formData.get("featured")
    const homeLocation = formData.get("homeLoc")
    const currentLocation = formData.get("curLoc")
    const weight = parseFloat(formData.get("weight"))
    const size = parseFloat(formData.get("size"))
    const locationCode = formData.get("locDesc")
    const itemDesc = formData.get("itemDesc")

    let homeLocationCode;
    switch(homeLocation){
        case "Main Location":
            homeLocationCode = 1
            break;
        case "Mobile Unit - Thomas P. Ryan Center (Monday)":
            homeLocationCode = 2
            break;
        case "Mobile Unit - Edgerton Recreation Center (Tuesday)":
            homeLocationCode = 3
            break;
        case "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)":
            homeLocationCode = 4
            break;
        case "Mobile Unit - David F. Gantt Reacreation Center (Thursday)":
            homeLocationCode = 5
            break;
    }

    let curLocationCode;
    switch(currentLocation){
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
    switch(status){
        case "available":
            statusCode = 1
            break;
        case "maintenance":
            statusCode = 3
            break;
        case "disabled":
            statusCode = 4
            break;
    }

    const toolData = [itemName, brand.toString(), weight, size, homeLocationCode, curLocationCode, 
                    locationCode, itemDesc, statusCode, imageLink, manualLink, loanFee,
                    lateFee, loanLength, renewal, replacementCost, dropOffLocation, 
                    featured ];

    const toolQuery = `INSERT INTO Tools (Tool_Name, Brand_Name, Tool_Weight, Tool_Size, Home_Location, 
        Current_Location, Location_Code, Tool_Description, Tool_Status, Tool_Link, Tool_Manual, 
        Tool_Loan_Fee, Default_Late_Fee, Default_Loan_Length, Renewal_Amount, Tool_Replacement_Cost, 
        Is_Floating, Is_Featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    
    //check if the category and type values are there
    let catTypeParse = {category: categories.toString(), type: type.toString()}
    catTypeParse = newToolSchema.safeParse(catTypeParse);
    
    //check if the float values are at lease greater then 0
    let toolParse = {weight: weight, size: size, loanFee: loanFee,  
        loanLength: loanLength, renewal: renewal, replacementCost: replacementCost}
    
    toolParse = newToolDigitsSchema.safeParse(toolParse)
    if(!toolParse.error && !catTypeParse.error){
        try {
            const db = await pool.getConnection();
            //insert the tool first
            const rows = await db.execute(toolQuery, toolData);
            const toolID = rows[0].insertId;

            categories?.forEach(async (cat)=>{
                const catQuery = `INSERT INTO Tool_Categories (Tool_ID, Category_ID) 
                VALUES (${toolID}, ${cat});`;
                await db.execute(catQuery)
            });

            type?.forEach(async (tp)=>{
                const typeQuery = `INSERT INTO Tool_Types (Tool_ID, Type_ID) VALUES (${toolID}, ${tp});`
                await db.execute(typeQuery)
            });

            console.log(rows)
          } catch (error) {
            console.error('Error inserting tool:', error);
          }
    }else{
        console.log(toolParse.error)
        console.log(catTypeParse.error)
        return {error: "There was an error"}
    }
}

export const deleteItem = async (id) =>{
    console.log(id)

    try {
        // Start a new transaction
        const connection = await pool.getConnection();
        await connection.beginTransaction();
    
        // Prepare the delete statement
        const deleteQuery = `DELETE FROM Tools WHERE Tool_ID = ${id};`;
    
        // Execute the prepared statement
        await connection.query(deleteQuery);
    
        // Commit the transaction
        await connection.commit();
        connection.release();
    
        console.log('Item deleted successfully');
      } catch (error) {
        console.error('Error deleting item:', error);
      }
} 


export const updateItem = async (id, formData)=>{
    //these are array values : use toString() method to convert to strings if needed 
    const status = formData.get("status")
    const categories = formData.getAll("category")
    const brand = formData.getAll("brand-name")
    const types = formData.getAll("type")

    let selectedCat = categories;
    let selectedType = types

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
    const locationCode = formData.get("locDesc")
    const itemDesc = formData.get("itemDesc")
    const currentLocation = formData.get("curLoc")

    let homeLocationCode;
    switch(homeLocation){
        case "Main Location":
            homeLocationCode = 1
            break;
        case "Mobile Unit - Thomas P. Ryan Center (Monday)":
            homeLocationCode = 2
            break;
        case "Mobile Unit - Edgerton Recreation Center (Tuesday)":
            homeLocationCode = 3
            break;
        case "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)":
            homeLocationCode = 4
            break;
        case "Mobile Unit - David F. Gantt Reacreation Center (Thursday)":
            homeLocationCode = 5
            break;
    }

    let curLocationCode;
    switch(currentLocation){
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
    switch(status){
        case "Available":
            statusCode = 1
            break;
        case "Maintenance":
            statusCode = 3
            break;
        case "Disabled":
            statusCode = 4
            break;
    }

    let useImage = false;
    let imageLink
    if(toolImage?.size > 0){
    //     imageToS3Bucket(toolImage).then((response)=>{
    //     console.log(response.status)
    // })
        imageLink = `https://seachtoolshedimages.s3.us-east-2.amazonaws.com/` + toolImage?.name;
    }else{
        useImage = true
    }

    let useManual = false;
    let manualLink = '';
    if(toolManual?.size > 0){
        // fileToS3Bucket(toolManual).then((response)=>{
        //     console.log(response.status)
        // })
        manualLink = `https://seachtoolshedimages.s3.us-east-2.amazonaws.com/` + toolManual?.name;
    }else{
        useManual = true
    }

    let toolData = []
    let updateQuery = ``;
    if(!useImage && !useManual){
        toolData = [itemName, brand.toString(), weight, size, homeLocationCode, curLocationCode, 
            locationCode, itemDesc, statusCode, imageLink, manualLink, loanFee,
            lateFee, loanLength, renewal, replacementCost, dropOffLocation, 
            featured ];
            updateQuery = `UPDATE Tools SET Tool_Name = ? , Brand_Name = ?, Tool_Weight = ?, Tool_Size = ?,
            Home_Location = ?, Current_Location = ?, Location_Code = ?, 
            Tool_Description = ?, Tool_Status = ?, Tool_Link = ?, Tool_Manual = ?, 
            Tool_Loan_Fee = ?, Default_Late_Fee = ?, Default_Loan_Length = ?, 
            Renewal_Amount = ?, Tool_Replacement_Cost = ?, Is_Floating =?, 
            Is_Featured = ? WHERE Tool_ID = ${id};`;
    }else if(!useImage && useManual){
        toolData = [itemName, brand.toString(), weight, size, homeLocationCode, curLocationCode, 
            locationCode, itemDesc, statusCode, imageLink, loanFee,
            lateFee, loanLength, renewal, replacementCost, dropOffLocation, 
            featured ];
            updateQuery = `UPDATE Tools SET Tool_Name = ?, Brand_Name = ?, Tool_Weight = ?, Tool_Size =?,
            Home_Location = ?, Current_Location = ?, Location_Code = ?, 
            Tool_Description = ?, Tool_Status = ?, Tool_Link = ?, 
            Tool_Loan_Fee = ?, Default_Late_Fee = ?, Default_Loan_Length = ?, 
            Renewal_Amount = ?, Tool_Replacement_Cost = ? , Is_Floating = ?, 
            Is_Featured = ? WHERE Tool_ID = ${id};`;
    }else if(!useManual && useImage){
        toolData = [itemName, brand.toString(), weight, size, homeLocationCode, curLocationCode, 
            locationCode, itemDesc, statusCode, manualLink, loanFee,
            lateFee, loanLength, renewal, replacementCost, dropOffLocation, 
            featured ];
            updateQuery = `UPDATE Tools SET Tool_Name = ?, Brand_Name = ?, Tool_Weight = ?, Tool_Size = ?,
            Home_Location = ?, Current_Location = ?, Location_Code = ?, 
            Tool_Description = ?, Tool_Status = ?, Tool_Manual = ?, 
            Tool_Loan_Fee = ?, Default_Late_Fee = ?, Default_Loan_Length = ?, 
            Renewal_Amount = ?, Tool_Replacement_Cost = ?, Is_Floating = ?, 
            Is_Featured = ? WHERE Tool_ID = ${id};`;
    }else{
        toolData = [itemName, brand.toString(), weight, size, homeLocationCode, curLocationCode, 
            locationCode, itemDesc, statusCode, loanFee,
            lateFee, loanLength, renewal, replacementCost, dropOffLocation, 
            featured ];
        
            updateQuery = `UPDATE Tools SET Tool_Name=?, Brand_Name=?, Tool_Weight=?, Tool_Size=?,
            Home_Location = ?, Current_Location = ?, Location_Code = ?, 
            Tool_Description = ?, Tool_Status = ?, Tool_Loan_Fee = ?, Default_Late_Fee = ?, Default_Loan_Length = ?, 
            Renewal_Amount = ?, Tool_Replacement_Cost = ?, Is_Floating = ?, 
            Is_Featured = ? WHERE Tool_ID = ${id};`;
    }

    let catTypeParse = {category: categories.toString(), type: types.toString()}
    catTypeParse = newToolSchema.safeParse(catTypeParse);

    if(!catTypeParse.error){
        try {
            console.log(id)
            // Start a new transaction
            const connection = await pool.getConnection();
            await connection.beginTransaction();
        
            //Execute the prepared statement
            await connection.query(updateQuery, toolData);

            const deleteCategory = `DELETE FROM Tool_Categories WHERE Tool_ID = ${id};`
            const catRows = await connection.query(deleteCategory)

            const deleteType = `DELETE FROM Tool_Types WHERE Tool_ID = ${id};`
            const typeRows = await connection.query(deleteType)


            selectedCat?.forEach( async (cat) =>{
                console.log(cat)
                const catQuery = `INSERT INTO Tool_Categories (Tool_ID, Category_ID) 
                    VALUES (${id}, ${cat});`;
                await connection.execute(catQuery)
            });

            selectedType?.forEach(async (tp)=>{
                console.log(tp)
                const typeQuery = `INSERT INTO Tool_Types (Tool_ID, Type_ID) VALUES (${id}, ${tp});`
                await connection.execute(typeQuery)
            });

            // Commit the transaction
            await connection.commit();
            connection.release();
        
            console.log('Tool updated successfully');
            return {status: 'success'}
        } catch (error) {
            // Rollback the transaction in case of an error
            console.error('Error updating account:', error);
            return {status: 'error', message: error.toString()}
        }
    }else{
        return {status : 'error',  message: catTypeParse.error.toString()}
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