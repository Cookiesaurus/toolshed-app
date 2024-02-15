import Link from 'next/link'
import './profile.css'
import Cards from '@/components/account/cards'
export default function ProfilePage() { 
    const tabs = ['Profile', 'Security', 'Membership', 'Saved Cards', 'TransactionHistroy', 'Gift Cards']
    return (
        <>
            <div className='bread-crumb'>
            <p><Link href={'/'} className='crumb-init'>Account /</Link></p><p className='crumb-extra'>Profile</p>
    </div>   

    <div className="account-cont">
        <div className="left-account">
            <h3>Account Settings</h3>
            {tabs.slice(0, 3).map((tab, index)=>(
                <p className="side-link" key={index}>
                {tab}
                </p>
            ))}
            <h3>Payment</h3>
            {tabs.slice(3).map((tab, index)=>(
                <div key={index} id={tab} className="side-link">
                    <p className="side-link">
                    {tab}
                    </p>
                </div>
            ))}
        </div>
        <div className='right-account'>
            <Cards/>
        </div>
    </div>
        </>
    )
 }