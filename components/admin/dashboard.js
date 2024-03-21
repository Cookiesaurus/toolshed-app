import Link from 'next/link';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const Profile = () =>{
    return (
        <>
            <div className='topRowButtons'>
                <button className='topRowButton' type='button'>Create User</button>
                <button className='topRowButton' type='button'>Add Item</button>
                <button className='topRowButton' type='button'>Check Out</button>
                <button className='topRowButton' type='button'>Check In</button>
            </div>

            <div className='topRowStats'>
                <div className='container'>
                    <p className='statsTitle'>Total users</p>
                    <p className='stat'>9999</p>
                </div>
                <div className='container'>
                    <p className='statsTitle'>Total Inventory</p>
                    <p className='stat'>9999</p>
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

export default Profile