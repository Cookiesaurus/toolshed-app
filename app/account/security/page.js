import React from 'react'
import Security from '@/components/account/security'
import { getSession } from '@/actions/actions'
import db from '@/app/config/db.mjs'
export default async function Page(){
let user = await getSession()
user = JSON.parse(JSON.stringify(user))

return (
  <>
  
<Security user={user}/>
  </>
)

}
