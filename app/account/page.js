import Link from 'next/link'
import './profile.css'
import Accountnav from '@/components/account/accountnav'
export default function ProfilePage() { 
    return (
        <>
        <div className='bread-crumb'>
            <p className='crumb-init'><Link href={'/'}>Account/</Link></p>
            <p className='crumb-extra'>Profile</p>
        </div>   

    <div className="account-cont">
        <Accountnav/>
    </div>
        </>
    )
 }