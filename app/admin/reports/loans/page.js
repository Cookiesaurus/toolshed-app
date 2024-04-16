import dynamic from "next/dynamic"
const LoanReport = dynamic(() => import("@/components/admin/reports/LoanReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page(){

let loanData = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
WHERE Transaction_Types.Transaction_Details = "Tool Return" OR Transaction_Types.Transaction_Details = "Cleaning Fee" OR Transaction_Types.Transaction_Details = "Tool Replacement Fee" ORDER BY Tool_ID, Transaction_Date DESC;`)

loanData = JSON.parse(JSON.stringify(loanData))

return (
    <>
        <LoanReport loanData={loanData}/>
    </>
)
}