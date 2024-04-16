import dynamic from "next/dynamic";
const RevenueReport = dynamic(() => import("@/components/admin/reports/RevenueReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page(){
    let revenueData = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " ",Accounts.Last_Name) AS Name, Accounts.Email, Transactions.Transaction_Date, Transaction_Types.Transaction_Details, Transactions.Payment_Amount FROM Transactions
    INNER JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    INNER JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
    WHERE 
        (Transaction_Details = "New Membership" OR Transaction_Details = "Membership Change" OR Transaction_Details = "Membership Renewal" OR Transaction_Details = "Gift Card Purchase" OR Transaction_Details = "Tool Late Fee" OR Transaction_Details = "Rental Fee" OR Transaction_Details = "Tool Replacement Fee" OR Transaction_Details = "Cleaning Fee") 
        AND Transactions.Payment_Amount != 0; `)
    revenueData = JSON.parse(JSON.stringify(revenueData))

    return(<>
        <RevenueReport loanData={revenueData}/>
    </>)
}