import Link from 'next/link';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const Profile = () =>{
    return (
        <>
            <div className='topRowButtons'>
                <button type='button'>Create User</button>
                <button type='button'>Add Item</button>
                <button type='button'>Check Out</button>
                <button type='button'>Check In</button>
            </div>

            <div className='topRowStats'>
                <div className='container'>
                    <p>Total users</p>
                    <p>9999</p>
                </div>
                <div className='container'>
                    <p>Total Inventory</p>
                    <p>9999</p>
                </div>
                <div className='container'>
                    <p>Total Sales</p>
                    <p>$9999</p>
                </div>
                <div className='container'>
                    <p>Active Loans</p>
                    <p>9999</p>
                </div>
            </div>

            <div className='mainContent'>
                <h2>Recent Activities</h2>
                <table>
                        <thead>
                            <tr >
                                <th>User</th>
                                <th>Name</th>
                                <th>Due</th>
                                <th>Item</th>
                                <th>Location</th>
                                <th>Action</th>
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
                                    <button type='button'>Check In</button>
                                    <button type='button'>Details</button>
                                </th>
                            </tr>
                            <tr>
                                <th>JDoe0282</th>
                                <th>John Doe</th>
                                <th>March 24, 2024</th>
                                <th>Screw driver</th>
                                <th>Main Location</th>
                                <th>
                                    <button type='button'>Check In</button>
                                    <button type='button'>Details</button>
                                </th>
                            </tr>
                            <tr>
                                <th>SMac844</th>
                                <th>Sally Mac</th>
                                <th>March 9, 2024</th>
                                <th>Hammer</th>
                                <th>Truck</th>
                                <th>
                                    <button type='button'>Check In</button>
                                    <button type='button'>Details</button>
                                </th>
                            </tr>
                        </tbody>
                        </table>
            </div>
        </>
    )
}

export default Profile