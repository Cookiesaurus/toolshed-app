import dynamic from "next/dynamic";
const ItemsReport = dynamic(() => import("@/components/admin/reports/ItemsReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default function Page(){
    return (<>
        <ItemsReport/>
    </>)
}