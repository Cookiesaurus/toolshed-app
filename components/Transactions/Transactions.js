import Link from 'next/link';

const Transactions = () =>{
    return(
    <>
        <div className='bread-crumb'>
            <p><Link href={'/'} className='crumb-init'>Account/</Link></p><p className='crumb-extra'> Transaction Histroy</p>
        </div>
        <div className='account-cont'>
            <div className="left-account">
                <h3>Account Settings</h3>
                <p><Link href={'/Account/Profile'}>Profile</Link></p>
                <p><Link href={'/Account/Profile'}>Security</Link></p>
                <p><Link href={'/Account/Profile'}>Membership</Link></p>
                <p><Link href={'/Account/Profile'}>Profile</Link></p>
                <h3>Payment</h3>
                <p><Link href={'/Account/Profile'}>Saved Cards</Link></p>
                <p><Link href={'/Account/Profile'}>Transaction History</Link></p>
                <p><Link href={'/Account/Profile'}>Gift Card</Link></p>
                <p><Link href={'/Account/Profile'}>Profile</Link></p>
            </div>

                <div className="right-account">
                    <h1>Transaction History</h1>
                    <div className='table-cont'>
                        <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>Gift Card</td>
                            <td>17 May 2023</td>
                            <td>Credit Card</td>
                            <td>Amount</td>
                        </tbody>
                        </table>
                    </div>
                </div>
        </div>
    </>
    )
}

export default Transactions