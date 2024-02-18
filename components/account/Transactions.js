import Link from 'next/link';

const Transactions = () =>{
    return(
    <>
                    <h1>Transaction History</h1>
                    <div className='table-cont'>
                        <table className='white'>
                        <thead className='white'>
                            <tr className='white'>
                                <th className='white'>Type</th>
                                <th className='white'>Date</th>
                                <th className='white'>Payment Method</th>
                                <th className='white'>Amount</th>
                            </tr>
                        </thead>
                        <tbody className='white'>
                            <tr className='white'>
                                <td className='white'>Gift Card</td>
                                <td className='white'>17 May 2023</td>
                                <td className='white'>Credit Card</td>
                                <td className='white'>Amount</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
    </>
    )
}

export default Transactions