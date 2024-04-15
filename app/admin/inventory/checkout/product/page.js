import db from "@/app/config/db.mjs";
import CheckOutItem from "@/components/ProductItem/CheckOutItem";
export default async function Page({searchParams}){
    const tool_id = searchParams.tool_id;
    const account_id = searchParams.account_id;
    let customer = await db.selectFromDB(`SELECT Accounts.First_Name, Accounts.Last_Name from Accounts Where Account_ID=${account_id}`)
    let tool = await db.selectFromDB(`SELECT Tools.Tool_Name, Tools.Tool_Description, Tools.Tool_Link From Tools WHERE Tools.Tool_ID=${tool_id}`)
    customer = JSON.parse(JSON.stringify(customer))
    tool = JSON.parse(JSON.stringify(tool))
return(
    <>
        <CheckOutItem customerName={customer[0]} toolInfo={tool[0]}/>
    </>
)
}