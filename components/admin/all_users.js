const All_User = () =>{
    return(
        <>
            <div className="filterOptionsContainer">
                <form className="filterOptions">
                    <input list="type" name="type" placeholder=" Find User"/>
                    <datalist id="type">
                        <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/>
                    </datalist>
                </form>
                <form className="filterOptions">
                    <input list="availability" name="availability" placeholder=" Membership type"/>
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
                                <th className='topRow'>User ID</th>
                                <th className='topRow'>Name</th>
                                <th className='topRow'>Email</th>
                                <th className='topRow'>Organization</th>
                                <th className='topRow'>Membership</th>
                                <th className='topRow'>Actions</th>
                                <th className='topRow'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>JSmithMAIN (398384398)</th>
                                <th>John Smelts</th>
                                <th>123abc@email.com</th>
                                <th></th>
                                <th>Tinker Level</th>
                                <th>3/19/2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>JSmithMAIN (398384398)</th>
                                <th>John Smelts</th>
                                <th>123abc@email.com</th>
                                <th></th>
                                <th>Tinker Level</th>
                                <th>3/19/2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>JSmithMAIN (398384398)</th>
                                <th>John Smelts</th>
                                <th>123abc@email.com</th>
                                <th></th>
                                <th>Tinker Level</th>
                                <th>3/19/2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button'>Loans</button>
                                    <br/>
                                    <button className="checkoutButton" type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>JSmithMAIN (398384398)</th>
                                <th>John Smelts</th>
                                <th>123abc@email.com</th>
                                <th></th>
                                <th>Tinker Level</th>
                                <th>3/19/2024</th>
                                <th>
                                    <button className="editButton" type='button'>Edit</button>
                                    <br/>
                                    <button className="loansButton" type='button' onClick={""}>Loans</button>
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

export default All_User