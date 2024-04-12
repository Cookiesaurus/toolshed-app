import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const Profile = ({user}) =>{
    
    return (
        <>
            <h1>Profile</h1>
            <Link className="edit-button" href={''}><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}} />Edit Info</Link>
            <form className='profile_info'>
                <div className='primary_info'>
                    <h3 className='info-title'>Primary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' for="name">Name: </label>
                            <input className='profile-input' id='name' name='name' value={`${user.user.First_Name} ${user.user.Last_Name}`} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' for="email">Email: </label>
                            <input className='profile-input' id='email' name='email' value={`${user.user.Email}`} />
                            <label className='profile-label' for='phone'>Phone: </label>
                            <input className='profile-input' id='phone' name='phone' value={`${user.user.Phone_Number}`} />
                        </div>
                    </div>
                </div>
                <div className='secondary_info'>
                    <h3 className='info-title'>Secondary Info</h3>
                    <div className='account-name'>
                        <div className='account-info'>
                            <label className='profile-label' for="name">Name: </label>
                            <input className='profile-input' id='name' name='name' value={`${user.user.Secondary_First_Name} ${user.user.Secondary_Last_Name}`} />
                        </div>
                        <div className='account-email'>
                            <label className='profile-label' for="email">Email: </label>
                            <input className='profile-input' id='email' name='email' value={`${user.user.Secondary_Email}`} />
                            <label className='profile-label' for='phone'>Phone: </label>
                            <input className='profile-input' id='phone' name='phone' value={`${user.user.Secondary_Phone_Number}`} />
                        </div>
                    </div>
                </div>
                <div className='address-cont'>
                    <div>
                        <div className='account-info'>
                            <h3 className='info-title'>Default Address</h3>
                            <label className='profile-label' for='address_line1'>Address Line 1: </label>
                            <input className='profile-input' id='address_line1' name='address_line1' value={`${user.user.Address_Line1}`} />
                            <label className='profile-label' for='address_line2'>Address Line 2: </label>
                            <input className='profile-input' id='address_line2' name='address_line2' value={`${user.user.Address_Line2}`} />
                            <label className='profile-label' for='city'>City: </label>
                            <input className='profile-input' id='city' name='city' value={`${user.user.City}`} />
                            <label className='profile-label' for='postal_code'>Postal code: </label>
                            <input className='profile-input' id='postal_code' name='postal_code' value={`${user.user.Postal_Code}`} />
                            <label className='profile-label' for='state'>State: </label>
                            <input className='profile-input' id='state' name='state' value={`${user.user.State}`} />
                        </div>
                    </div>
                </div>
                <div className='save-changes'>
                    <button className="save-changes-button" type='submit'>Save Changes</button>
                </div>
            </form>
        </>
    )
}

export default Profile