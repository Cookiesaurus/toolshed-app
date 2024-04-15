import React from 'react';
import db from '@/app/config/db.mjs';
import dynamic from 'next/dynamic';
const CheckOutTool = dynamic(() => import('@/components/admin/tools/CheckOutTool'), { ssr: false })

export default async function Page({ searchParams }) {
  const tool_id = searchParams.tool_id;
  const account_id = searchParams.account_id;
  const account_name = searchParams.name;
  //const customerData = await db.selectFromDB(`SELECT * FROM Accounts WHERE Accounts.First_Name = ${account_name}`);
  let memberships = await db.selectFromDB(`SELECT Membership_Levels.Membership_Title FROM Membership_Levels;`)
  let currentData = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
  Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
  LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
  LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
  LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type
  WHERE Transaction_Types.Transaction_Details = "Tool Check Out" AND Transactions.Transaction_Status = "Open" AND Transactions.End_Date IS NULL;  `)
  currentData = JSON.parse(JSON.stringify(currentData))
  memberships = JSON.parse(JSON.stringify(memberships))
  return (
    <>
      {<CheckOutTool currentData={currentData} memberships={memberships}/>}
    </>
  );
}
