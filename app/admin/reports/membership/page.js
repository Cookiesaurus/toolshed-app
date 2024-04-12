import dynamic from "next/dynamic";
const MembershipReport = dynamic(() => import("@/components/admin/reports/MembershipReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default function Page(){
    return(<>
        <MembershipReport/>
    </>)
}