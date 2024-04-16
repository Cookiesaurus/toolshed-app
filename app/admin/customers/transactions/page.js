import { getSession } from "@/actions/actions";
import AddTransaction from "@/components/admin/customers/AddTransaction";
import db from "@/app/config/db.mjs";
export default async function Page({searchParams}) { 
    const accountID = searchParams.account_id
    let user = await getSession()
    let admin = user.user?.Privilege_Level
    let costumer = await db.selectFromDB(`SELECT First_Name, Last_Name, Email, Account_ID FROM Accounts WHERE Account_ID = ${accountID}`);
    let transactionTypes = await db.selectFromDB(`SELECT Transaction_Type , Transaction_Details FROM Transaction_Types`);
    
    costumer = JSON.parse(JSON.stringify(costumer));
    transactionTypes = JSON.parse(JSON.stringify(transactionTypes));
    return (
        <> 
            <AddTransaction customerData={costumer[0]} admin={admin > 3 ? true : false} transactionTypes={transactionTypes}/>
        </>
    )
 }