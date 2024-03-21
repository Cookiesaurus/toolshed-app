import Link from 'next/link'
import './dashboard.css'
import Cards from '@/components/account/cards'
import Adminnav from '@/components/admin/adminnav'
export default function AdminPage() { 
    return (
        <>
        <div className='bread-crumb'>
            <p className='crumb-init'><Link href={'/'}>Admin/</Link></p>
            <p className='crumb-extra'>Dashboard</p>
        </div>   

    <div className="account-cont">
        <Adminnav/>
    </div>
        </>
    )
 }