import dynamic from "next/dynamic";
const CheckInTool = dynamic(() => import("@/components/admin/tools/CheckInTool"), { ssr: false })
import db from '@/app/config/db.mjs';
export default async function Page(){
    let toolData = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
    Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
    LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
    LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
    WHERE Transaction_Types.Transaction_Details = "Tool Check Out" AND Transactions.Transaction_Status = "Open" AND Transactions.End_Date IS NOT NULL;`);
    toolData = JSON.parse(JSON.stringify(toolData))
    return(
        <>
            <CheckInTool toolData={toolData}/>
        </>
    )
}