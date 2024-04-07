import React from 'react'
import Security from '@/components/account/security'
import { getSession } from '@/actions/actions'
import db from '@/app/config/db.mjs'
export default async function Page(){
const user = await getSession()
console.log(user)

return (
  <>
  
<Security user={user}/>
  </>
)

}
