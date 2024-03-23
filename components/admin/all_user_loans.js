const All_User_Loans = () =>{
    return(
        <>
            <div className="title_and_buttons">
                <h1>Robert Person</h1>
                <div className="buttonsContainer">
                    <button>View</button>
                    <button>Edit</button>
                    <button>Privalges</button>
                    <button>Agreements</button>
                    <button>Payment Method</button>
                    <button>Check In/Out</button>
                </div>
            </div>

            <div className='mainContent'>
                <table>
                        <thead>
                            <tr className='topRow'>
                                <th className='topRow'>Date</th>
                                <th className='topRow'>Amount</th>
                                <th className='topRow'>Payment Method</th>
                                <th className='topRow'>Item</th>
                                <th className='topRow'>Handled By</th>
                                <th className='topRow'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>3/19/24</th>
                                <th>$0.00</th>
                                <th>Checkout <br/>Belt Sander</th>
                                <th>SEAC Voulenteer</th>
                                <th>
                                    <button className="loanDetailsButton" type='button'>Details</button>
                                </th>
                            </tr>
                        </tbody>
                        </table>
            </div>
        </>
    )
}

export default All_User_Loans