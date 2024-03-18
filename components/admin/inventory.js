const Inventory = () =>{
    return(
        <>
            <div className="filterOptions">
                <form >
                    <input list="type" name="type" placeholder="Type"/>
                    <datalist id="type">
                        <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/>
                    </datalist>
                    <input list="availability" name="availability" placeholder="Availability"/>
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
                            <tr >
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Availability</th>
                                <th>Action</th>
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
                                    <button type='button'>Edit</button>
                                    <button type='button'>Loans</button>
                                    <button type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>344657</th>
                                <th>Air Gun Nozzle</th>
                                <th>Air & Pnumatic Tools</th>
                                <th>Available</th>
                                <th>March 17, 2024</th>
                                <th>
                                    <button type='button'>Edit</button>
                                    <button type='button'>Loans</button>
                                    <button type='button'>Checkout</button>
                                </th>
                            </tr>
                            <tr>
                                <th>24675</th>
                                <th>Angle Grinder Kit</th>
                                <th>Power Tools</th>
                                <th>Available</th>
                                <th>March 17, 2024</th>
                                <th>
                                    <button type='button'>Edit</button>
                                    <button type='button'>Loans</button>
                                    <button type='button'>Checkout</button>
                                </th>
                            </tr>
                        </tbody>
                        </table>
            </div>
        </>
    )
}

export default Inventory