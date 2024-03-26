import Link from 'next/link';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const Profile = ({user}) =>{
    
    return (
        <>

                    <h1>Profile</h1>
                    <div className='account-name'>
                        <div className='account-info'>
                            <p>{user.user.First_Name} {user.user.Last_Name}</p>
                            <Link href={''}><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}} /></Link>
                        </div>
                        <div className='account-email'>
                            <p className='light-paragraph'>Email</p>
                            <p>{user.user.Email}</p> 
                        </div>
                    </div>
                    <div className='address-cont'>
                    <div className='account-info'>
                        <p>Addresses</p>
                        <Link href={''} className='new-address'> + Add</Link>
                    </div>
                    <div>
                        <div className='account-info'>
                            <p className='light-paragraph'>Default Address</p>
                            <Link href={'/'}><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}}/></Link>
                        </div>
                        <div className='address-info'>
                            <p>{user.user.Address_Line1} {user.user.Address_Line2}</p>
                            <p>{user.user.City}</p>
                            <p>{user.user.Postal_Code}</p>
                            <p>{user.user.State}</p>
                            <p>{user.user.Phone_Number}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Profile