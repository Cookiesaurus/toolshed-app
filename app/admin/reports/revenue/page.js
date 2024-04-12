import dynamic from "next/dynamic";
const RevenueReport = dynamic(() => import("@/components/admin/reports/RevenueReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default function Page(){
    return(<>
        <RevenueReport/>
    </>)
}