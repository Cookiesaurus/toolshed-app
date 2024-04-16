import db from "@/app/config/db.mjs"
import dynamic from "next/dynamic";
import { getSession } from "@/actions/actions"
const Transactions = dynamic(() => import('@/components/account/Transactions'), { ssr: false })
export default async function Page(){
    let user = await getSession();
    user=JSON.parse(JSON.stringify(user))
    let accountID = user?.user?.Account_ID
    let transactionHist = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
    Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
    LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
    LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type WHERE Accounts.Account_ID = ${accountID} ORDER BY Transactions.Transaction_ID DESC;`)
    transactionHist = JSON.parse(JSON.stringify(transactionHist))
    return (
        <>
            <Transactions user={user} data={transactionHist}/>
        </>
    )
}
