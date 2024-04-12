const ViewLoanDetails = () =>{
    return(
        <>
            <div className="titleBar">
                <h1>Loan Detail</h1>
                <br/>
                <h2>Circular Saw</h2>
                <br/>
            </div>
            <div className="contentSection">
                <div className="section">
                    <p className="text">Checked out to</p>
                    <br/>
                    <p className="info">Moblin</p>
                    <br/>
                    <p className="text">Checked out from</p>
                    <br/>
                    <p className="info">Main location</p>
                    <br/>
                    <p className="text">Checked out on</p>
                    <br/>
                    <p className="info">March 19, 2024 11:59 PM</p>
                    <br/>
                    <p className="text">Due on</p>
                    <br/>
                    <p className="info">March 27, 2024</p>
                    <br/>
                </div>

                <div className="section">
                    <p className="text">Status at checkout</p>
                    <br/>
                    <p className="info">--</p>
                    <br/>
                    <p className="text">Comments at checkout</p>
                    <br/>
                    <p className="info">Self renewal</p>
                    <br/>
                    <p className="text">Checkout transaction</p>
                    <br/>
                    <p className="info">ID 39847343 handled by Moblin</p>
                    <br/>
                </div>

                <div className="section">
                    <p className="text">Status at check in</p>
                    <br/>
                    <p className="info">--</p>
                    <br/>
                    <p className="text">Comments at check in</p>
                    <br/>
                    <p className="info">--</p>
                    <br/>
                    <p className="text">Chec in transaction</p>
                    <br/>
                    <p className="info">ID 2988783 handeld by Moblin</p>
                    <br/>
                    <p className="text">Late Fee</p>
                    <br/>
                    <p className="info">$2.00</p>
                    <br/>
                </div>
            </div>
        </>
    )
}

export default ViewLoanDetails