import Link from 'next/link';

const Transactions = ({user}) =>{
    return(
    <>
                    <h1>Transaction History</h1>
                    <div className='table-cont'>
                        <table >
                        <thead >
                            <tr >
                                <th >Type</th>
                                <th >Date</th>
                                <th >Payment Method</th>
                                <th >Amount</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr >
                                <td >Gift Card</td>
                                <td >17 May 2023</td>
                                <td >Credit Card</td>
                                <td >Amount</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
    </>
    )
}

export default Transactions