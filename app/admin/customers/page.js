import { getSession } from "@/actions/actions";
import db from "@/app/config/db.mjs";
import dynamic from 'next/dynamic'
 
const ViewAllUsers = dynamic(() => import("@/components/admin/ViewAllUsers"), { ssr: false })
export default async function Page() {
  const admin = await getSession();
  let customers;
  if(admin.user?.Privilege_Level > 5){
    customers = await db.selectFromDB(`SELECT Accounts.Account_ID, CONCAT(Accounts.First_Name, " ", Accounts.Last_Name) AS Name, Accounts.Email AS Email, Accounts.Organization_Name AS Organization, 
    Membership_Levels.Membership_Title AS Membership_Title, 
    Accounts.Membership_Expiration_Date AS Expiration_Date FROM 
    Accounts INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level WHERE Accounts.Privilege_Level IN (1, 2, 3);`);
  }

  customers = await db.selectFromDB(`SELECT Accounts.Account_ID, CONCAT(Accounts.First_Name, " ", Accounts.Last_Name) AS "Name", Accounts.Email AS "Email", Accounts.Organization_Name 
  AS "Organization", Membership_Levels.Membership_Title As "Membership_Title", Accounts.Membership_Expiration_Date "Expiration_Date" FROM Accounts
  INNER JOIN Membership_Levels ON Accounts.Membership_Level=Membership_Levels.Membership_Level`);

  customers = JSON.parse(JSON.stringify(customers));
  return (
    <>
      <ViewAllUsers customerData={customers} />
    </>
  );
}
