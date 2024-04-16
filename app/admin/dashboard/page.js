import db from '@/app/config/db.mjs'
import dynamic from 'next/dynamic'
const Dashboard = dynamic(() => import('@/components/admin/dashboard'), { ssr: false })
export default async function AdminPage() { 
    
    let customers = await db.selectFromDB(`SELECT  Account_ID, First_Name, Last_Name, Organization_Name, Email, Phone_Number, Address_Line1, Address_Line2, 
    City, State, Postal_Code, Account_Creation_Date, Account_Notes, Membership_Level, 
    Membership_Status, Membership_Auto_Renewal, Membership_Creation_Date, Membership_Expiration_Date, 
    Privilege_Level FROM Accounts WHERE Privilege_Level = 1;`)
    let inventory = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, Tools.Tool_Link FROM Tools 
    INNER JOIN Tool_Locations ON Tools.Home_Location=Tool_Locations.Tool_Location 
    INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status 
    INNER JOIN Tool_Categories ON Tools.Tool_ID=Tool_Categories.Tool_ID 
    GROUP BY Tools.Tool_ID`)
    let datatable = await db.selectFromDB(`SELECT Transactions.Transaction_ID, Accounts.Account_ID, CONCAT(Accounts.First_Name, " " ,Accounts.Last_Name) AS Name, Tools.Tool_ID, Tools.Tool_Name, Transactions.Transaction_Status, Transactions.Transaction_Date,
    Transaction_Types.Transaction_Details, Transactions.End_Date, Transactions.Check_In_Date, Transactions.Payment_Amount FROM Transactions
    LEFT JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID
    LEFT JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID
    LEFT JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type ORDER BY Transactions.Transaction_ID DESC;`)
    
    customers = JSON.parse(JSON.stringify(customers))
    inventory = JSON.parse(JSON.stringify(inventory))
    datatable = JSON.parse(JSON.stringify(datatable))
    return (
        <>
        <Dashboard users={customers} inventory={inventory} dataTable={datatable}/>
        </>
    )
 }