import dynamic from "next/dynamic";
const MaintenanceReport = dynamic(() => import("@/components/admin/reports/MaintenanceReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default function Page(){
    return(
        <>
            <MaintenanceReport/>
        </>
    )
    
}