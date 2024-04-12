import dynamic from "next/dynamic"
const LoanReport = dynamic(() => import("@/components/admin/reports/LoanReport"), { ssr: false })
import db from "@/app/config/db.mjs";
export default async function Page(){

return (
    <>
        <LoanReport/>
    </>
)
}