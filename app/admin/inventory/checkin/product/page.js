import CheckInItem from "@/components/ProductItem/CheckInItem"
import db from "@/app/config/db.mjs";
export default async function Page({searchParams}){
    const tool_id = searchParams.tool_id;
    const account_id = searchParams.account_id;
    const transaction = searchParams.transaction_id

    let toolInfo = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tool_Statuses.Tool_Status_Details, Tools.Tool_Description, Tools.Tool_Replacement_Cost, Tools.Tool_Link, Tools.Is_Floating FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID HAVING Tools.Tool_ID = ${tool_id};`)
    let  locations = await db.selectFromDB("SELECT * FROM SEAC_Tool_Shed.Tool_Locations");
    let customer = await db.selectFromDB(`SELECT Accounts.First_Name, Accounts.Account_ID, Accounts.Last_Name from Accounts Where Account_ID=${account_id}`)
    toolInfo = JSON.parse(JSON.stringify(toolInfo))
    locations = JSON.parse(JSON.stringify(locations));
    customer = JSON.parse(JSON.stringify(customer))
    return (
        <>
            <CheckInItem toolInfo={toolInfo[0]} locations={locations} transactionID={transaction} customerName={customer[0]}/>
        </>
    )
}