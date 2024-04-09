import db from "@/app/config/db.mjs"
import dynamic from "next/dynamic";
import { getSession } from "@/actions/actions"
const Transactions = dynamic(() => import('@/components/account/Transactions'), { ssr: false })
export default async function Page(){
    let user = await getSession();
    user=JSON.parse(JSON.stringify(user))
    return (
        <>
            <Transactions user={user}/>
        </>
    )
}
