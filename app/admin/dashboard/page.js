// import Link from 'next/link'
// import './dashboard.css'
// import Cards from '@/components/account/cards'
// import Adminnav from '@/components/admin/adminnav'
// import db from '@/app/config/db.mjs'
// export default async function AdminPage() { 
    
//     let customers = await db.selectFromDB(`SELECT 
//     Account_ID,
//     First_Name,
//     Last_Name,
//     Organization_Name,
//     Email,
//     Phone_Number,
//     Address_Line1,
//     Address_Line2,
//     City,
//     State,
//     Postal_Code,
//     Account_Creation_Date,
//     Account_Notes,
//     Membership_Level,
//     Membership_Status,
//     Membership_Auto_Renewal,
//     Membership_Creation_Date,
//     Membership_Expiration_Date,
//     Privilege_Level
// FROM 
//     Accounts
// WHERE 
//     Privilege_Level = 1;
// `)
//     let inventory = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, Tools.Tool_Link FROM Tools 
//     INNER JOIN Tool_Locations ON Tools.Home_Location=Tool_Locations.Tool_Location 
//     INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status 
//     INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID 
//     GROUP BY Tools.Tool_ID`)
    
//     customers = JSON.parse(JSON.stringify(customers))
//     inventory = JSON.parse(JSON.stringify(inventory))

//     return (
//         <>
//         <div className='bread-crumb'>
//             <p className='crumb-init'><Link href={'/'}>Admin/</Link></p>
//             <p className='crumb-extra'>Dashboard</p>
//         </div>   

//     <div className="account-cont">
//         <Adminnav customer={customers} inventory={inventory}/>
//     </div>
//         </>
//     )
//  }