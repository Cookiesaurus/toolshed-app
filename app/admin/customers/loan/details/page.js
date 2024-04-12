import db from "@/app/config/db.mjs";
import ViewLoanDetails from "@/components/admin/customers/ViewLoanDetails";
export default async function Page({ searchParams }) {
    const accountID = searchParams.account_id
    //Change this to get transaction history
    let costumer = await db.selectFromDB(`SELECT * FROM Accounts WHERE Account_ID = ${accountID}`);
    costumer = JSON.parse(JSON.stringify(costumer));

  return (
    <>
      <h1>{searchParams.account_id}</h1>
      <ViewLoanDetails/>
    </>
  );
}