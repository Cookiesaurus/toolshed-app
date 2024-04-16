import Profile from "@/components/account/Profile";
import { getSession } from "@/actions/actions";
import db from "@/app/config/db.mjs";
export default async function Page({searchParams}){
    const account = searchParams.account_id
    let user = await db.selectFromDB(`SELECT * FROM Accounts WHERE Account_ID = ${account}`);
    user=JSON.parse(JSON.stringify(user))
    return (
        <>
            <Profile user={user[0]}/>
        </>
    )
}