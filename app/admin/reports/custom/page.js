import dynamic from "next/dynamic";
const CustomReports = dynamic(() => import("@/components/admin/reports/CustomReports"), { ssr: false })
import db from "@/app/config/db.mjs";
export default function Page(){
    return (<>
        <CustomReports/>
    </>)
}