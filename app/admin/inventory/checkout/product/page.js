import db from "@/app/config/db.mjs";
import CheckOutItem from "@/components/ProductItem/CheckOutItem";
export default async function Page({searchParams}){
    const tool_id = searchParams.tool_id;
    const account_id = searchParams.account_id;
    const transaction = searchParams.transaction_id
    let customer = await db.selectFromDB(`SELECT Accounts.First_Name, Accounts.Account_ID, Accounts.Last_Name, Accounts.Email from Accounts Where Account_ID=${account_id}`)
    let tool = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Home.Location_Name AS Home_Location, Current.Location_Name AS Current_Location, Tool_Statuses.Tool_Status_Details, Tools.Tool_Loan_Fee, Tools.Default_Loan_Length, Tools.Tool_Description, Tools.Tool_Replacement_Cost, Tools.Tool_Link, Tools.Is_Floating FROM Tools 
    INNER JOIN Tool_Locations AS Home ON Tools.Home_Location = Home.Tool_Location
    INNER JOIN Tool_Locations AS Current ON Tools.Current_Location = Current.Tool_Location
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID
    INNER JOIN Categories ON Tool_Categories.Category_ID=Categories.Category_ID
    INNER JOIN Tool_Types ON Tools.Tool_ID=Tool_Types.Tool_ID
    INNER JOIN Types ON Tool_Types.Type_ID=Types.Type_ID
    GROUP BY Tools.Tool_ID HAVING Tools.Tool_ID=${tool_id};`)
    customer = JSON.parse(JSON.stringify(customer))
    tool = JSON.parse(JSON.stringify(tool))
return(
    <>
        <CheckOutItem customerName={customer[0]} toolInfo={tool[0]} transactionID={transaction}/>
    </>
)
}