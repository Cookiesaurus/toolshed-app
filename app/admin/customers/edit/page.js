import EditUser from "@/components/admin/EditUser"
import db from "@/app/config/db.mjs"

export default async function Page({searchParams}) { 
    //Need a query that pulls all customer info from the DB based on account ID
    let customerInfo = await db.selectFromDB(`Select * From Accounts Where Account_ID = ${searchParams.account_id}`)
    customerInfo = JSON.parse(JSON.stringify(customerInfo))

    const objectData = customerInfo.reduce((acc, obj) => {
        const newObj = {};
        for (const key in obj) {
          newObj[key] = obj[key];
        }
        acc = newObj;
        return acc;
      }, {});

    return (
        <> 
        <EditUser customerInfo={objectData}/>
        </>
    )
 }