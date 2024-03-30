import Link from 'next/link';
import './dashboard.css';
const Dashboard = ({users, inventory}) =>{
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
                <table className='table'>
                        <thead>
                            <tr className='topRow'>
                                <th className='topRow'>User</th>
                                <th className='topRow'>Name</th>
                                <th className='topRow'>Due</th>
                                <th className='topRow'>Item</th>
                                <th className='topRow'>Location</th>
                                <th className='topRow'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>JDoe0282</th>
                                <th>John Doe</th>
                                <th>March 17, 2024</th>
                                <th>Angle Grinder</th>
                                <th>Main Location</th>
                                <th>
                                    <button className='checkInButton' type='button'>Check In</button>
                                    <br/>
                                    <button className='detailsButton' type='button'>Details</button>
                                </th>
                            </tr>
                            <tr>
                                <th>JDoe0282</th>
                                <th>John Doe</th>
                                <th>March 24, 2024</th>
                                <th>Screw driver</th>
                                <th>Main Location</th>
                                <th>
                                    <button className='checkInButton' type='button'>Check In</button>
                                    <br/>
                                    <button className='detailsButton' type='button'>Details</button>
                                </th>
                            </tr>
                            <tr>
                                <th>SMac844</th>
                                <th>Sally Mac</th>
                                <th>March 9, 2024</th>
                                <th>Hammer</th>
                                <th>Truck</th>
                                <th>
                                    <button className='checkInButton' type='button'>Check In</button>
                                    <br/>
                                    <button className='detailsButton' type='button'>Details</button>
                                </th>
                            </tr>
                        </tbody>
                        </table>
            </div>
        </>
    )
}

export default Dashboard