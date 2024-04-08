import db from "@/app/config/db.mjs"
import dynamic from "next/dynamic";
import { getSession } from "@/actions/actions"
const Transactions = dynamic(() => import('@/components/account/Transactions'), { ssr: false })
export default async function Page(){
    const user = await getSession();

    return (
        <>
            <Transactions user={user}/>
        </>
    )
}
