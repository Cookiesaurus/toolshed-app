import EditUser from "@/components/admin/EditUser"
import db from "@/app/config/db.mjs"

export default async function Page({searchParams}) { 
    //Need a query that pulls all customer info from the DB based on account ID

    let customerInfo;
    //check to see if account_id is a number 
    if(!isNaN(searchParams.account_id)){
      customerInfo = await db.selectFromDB(`SELECT Accounts.Account_ID, Accounts.First_Name, Accounts.Last_Name, Accounts.DOB, Genders.Gender_Name, Accounts.Organization_Name, Accounts.Email, Accounts.Password, Accounts.Phone_Number, Accounts.Address_Line1, Accounts.Address_Line2, Accounts.City, Accounts.State, Accounts.Postal_Code, Accounts.Secondary_First_Name, Accounts.Secondary_Last_Name, Accounts.Secondary_Email, Accounts.Secondary_Phone_Number, Accounts.Account_Creation_Date, Accounts.Account_Notes, Membership_Levels.Membership_Title, Current_Membership_Status.Membership_Status_Description, Accounts.Membership_Auto_Renewal, Accounts.Membership_Creation_Date, Accounts.Membership_Expiration_Date, Privilege_Levels.Privilege_Title FROM Accounts
      INNER JOIN Genders ON Accounts.Gender_Code = Genders.Gender_Code
      INNER JOIN Privilege_Levels ON Accounts.Privilege_Level = Privilege_Levels.Privilege_Level
      INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level
      INNER JOIN Current_Membership_Status ON Accounts.Membership_Status = Current_Membership_Status.Membership_Status
      WHERE Accounts.Account_ID  = ${searchParams.account_id}`)
    }else{
      console.log(searchParams.search)
    }
    customerInfo = JSON.parse(JSON.stringify(customerInfo))

    const objectData = customerInfo.reduce((acc, obj) => {
        const newObj = {};
        for (const key in obj) {
          newObj[key] = obj[key];
        }
        acc = newObj;
        return acc;
      }, {});

    return (
        <> 
        <EditUser customerInfo={objectData}/>
        </>
    )
 }