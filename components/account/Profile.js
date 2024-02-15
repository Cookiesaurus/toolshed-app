import Link from 'next/link';
import './profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const Profile = () =>{
    return (
        <>

                    <h1>Profile</h1>
                    <div className='account-name'>
                        <div className='account-info'>
                            <p>Username</p>
                            <Link href={''}><FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}} /></Link>
                        </div>
                        <div className='account-email'>
                            <p className='light-paragraph'>Email</p>
                            <p>testemail@email.com</p> 
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
                            <p>Name</p>
                            <p>Address Line One</p>
                            <p>Address Town/City</p>
                            <p>Address State, Zip Code</p>
                            <p>Address Country</p>
                            <p>Phone Number</p>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Profile