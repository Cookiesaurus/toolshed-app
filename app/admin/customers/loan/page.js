import dynamic from "next/dynamic";
const ViewUserLoan = dynamic(() => import("@/components/admin/customers/ViewUserLoan"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page({ searchParams }) {
    const accountID = searchParams.account_id
    //Change this to get transaction history
    let costumer = await db.selectFromDB(`SELECT * FROM Accounts WHERE Account_ID = ${accountID}`);
    costumer = JSON.parse(JSON.stringify(costumer));
    let transactionHist = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
    Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
    LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
    LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type WHERE Accounts.Account_ID = ${accountID} ORDER BY Transactions.Transaction_ID DESC;`)
    transactionHist = JSON.parse(JSON.stringify(transactionHist))

  return (
    <>
      <ViewUserLoan customerData={costumer} data={transactionHist}/>
    </>
  );
}
