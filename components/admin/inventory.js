const Inventory = () =>{
    return(
        <>
            <div className="filterOptionsContainer">
                <form className="filterOptions">
                    <input list="type" name="type" placeholder=" Type"/>
                    <datalist id="type">
                        <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/>
                    </datalist>
                </form>
                <form className="filterOptions">
                    <input list="availability" name="availability" placeholder=" Availability"/>
                    <datalist id="availability">
                    <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/>
                    </datalist>
                </form>
            </div>

            <div className='mainContent'>
                <table>
                        <thead>
                            <tr className='topRow'>
                                <th className='topRow'>ID</th>
                                <th className='topRow'> Name</th>
                                <th className='topRow'>Type</th>
                                <th className='topRow'>Location</th>
                                <th className='topRow'>Availability</th>
                                <th className='topRow'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>344657</th>
                                <th>Spray Paint</th>
                                <th>Air & Pnumatic Tools</th>
                                <th>Available</th>
                                <th>March 17, 2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>344657</th>
                                <th>Air Gun Nozzle</th>
                                <th>Air & Pnumatic Tools</th>
                                <th>Available</th>
                                <th>March 17, 2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>24675</th>
                                <th>Angle Grinder Kit</th>
                                <th>Power Tools</th>
                                <th>Available</th>
                                <th>March 17, 2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                        </tbody>
                        </table>
            </div>
        </>
    )
}

export default Inventory