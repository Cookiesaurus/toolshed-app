import React from 'react';
import CheckOut from '@/components/admin/CheckOut';
import CheckOutTool from '@/components/admin/tools/CheckOutTool';
import db from '@/app/config/db.mjs';

export default async function Page({ searchParams }) {
  const tool_id = searchParams.tool_id;
  const account_id = searchParams.account_id;
  const account_name = searchParams.name;
  //const customerData = await db.selectFromDB(`SELECT * FROM Accounts WHERE Accounts.First_Name = ${account_name}`);

  return (
    <>
      {<CheckOutTool/>}
    </>
  );
}
