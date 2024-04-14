import db from "@/app/config/db.mjs";
import dynamic from "next/dynamic";
const Search = dynamic(() => import("@/components/admin/customers/Search"), {
  ssr: false
});
export default async function Page({ searchParams }) {
  let name = searchParams.searchTerm;

  let searchResults = await db.selectFromDB(`SELECT Accounts.Account_ID, Accounts.First_Name, Accounts.Last_Name, Accounts.Organization_Name, 
                        Membership_Levels.Membership_Title, Accounts.Membership_Expiration_Date FROM Accounts
                        INNER JOIN Membership_Levels ON Accounts.Membership_Level = Membership_Levels.Membership_Level
                        WHERE 
                        Accounts.First_Name REGEXP "${name}" OR Accounts.First_Name REGEXP "${name}"
                        OR Accounts.Last_Name REGEXP "${name}" OR Accounts.Last_Name REGEXP "${name}";`)
    
searchResults = JSON.parse(JSON.stringify(searchResults))
console.log(searchResults)
  return (
    <>
      <h1>Search Results: </h1>
      <Search customerData={searchResults} />
    </>
  );
}
