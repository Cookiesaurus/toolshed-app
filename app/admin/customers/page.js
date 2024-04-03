import ViewAllUsers from "@/components/admin/ViewAllUsers";
import db from "@/app/config/db.mjs";
export default async function Page() {
  let customers = await db.selectFromDB(`SELECT 
    Account_ID,
    First_Name,
    Last_Name,
    Organization_Name,
    Email,
    Phone_Number,
    Address_Line1,
    Address_Line2,
    City,
    State,
    Postal_Code,
    Account_Creation_Date,
    Account_Notes,
    Membership_Level,
    Membership_Status,
    Membership_Auto_Renewal,
    Membership_Creation_Date,
    Membership_Expiration_Date,
    Privilege_Level
FROM 
    Accounts
WHERE 
    Privilege_Level = 1;
`);
  return (
    <>
      <ViewAllUsers customerData={customers} />
    </>
  );
}
