"use client"
import Link from 'next/link';
import './dashboard.css';
import DataTable from 'react-data-table-component';
const Dashboard = ({users, inventory}) =>{
    const columns = [
        {
          name: "User",
          selector: (row) => row.id
        },
        {
          name: "Name",
          selector: (row) => row.name,
          sortable: true
        },
        {
          name: "Due Date",
          selector: (row) => row.location,
          sortable: true
        },
        {
          name: "Item",
          selector: (row) => row.type,
          sortable: true
        },
        {
          name: "Location",
          selector: (row) => row.brand,
          sortable: true
        },
        {
          name: "Action",
          selector: (row) => row.status,
          sortable: true
        },
      ];
    
    
    return (
        <>
            <div className='topRowButtons'>
                <Link className='topRowButton' href={'/admin/customers/createuser'}>Create User</Link>
                <Link className='topRowButton' href={'/admin/inventory/new_item'}>Add Item</Link>
                <Link className='topRowButton' href={'/admin/inventory/checkout'}>Check Out</Link>
                <Link className='topRowButton' href={''}>Check In</Link>
            </div>

            <div className='topRowStats'>
                <div className='container'>
                    <p className='statsTitle'>Total users</p>
                    <p className='stat'>{users.length}</p>
                </div>
                <div className='container'>
                    <p className='statsTitle'>Total Inventory</p>
                    <p className='stat'>{inventory.length}</p>
                </div>
                <div className='container'>
                    <p className='statsTitle'>Total Sales</p>
                    <p className='stat'>$9999</p>
                </div>
                <div className='container'>
                    <p className='statsTitle'>Active Loans</p>
                    <p className='stat'>9999</p>
                </div>
            </div>

            <div className='mainContent'>
                <h2 className='title'>Recent Activities</h2>
                <DataTable columns={columns} className='white'/>
            </div>
        </>
    )
}

export default Dashboard