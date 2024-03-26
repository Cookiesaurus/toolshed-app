const All_User = ({customerData}) =>{
    return(
        <>
            <div className="filterOptionsContainer">
                <form className="filterOptions">
                    <input list="type" name="type" placeholder=" Find User"/>
                    <datalist id="type">
                        {/* <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/> */}
                    </datalist>
                </form>
                <form className="filterOptions">
                    <input list="availability" name="availability" placeholder=" Membership type"/>
                    <datalist id="availability">
                        {/* <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/> */}
                    </datalist>
                </form>
            </div>

            <div className='mainContent'>
            <table>
    <thead>
        <tr className='topRow'>
            <th className='topRow'>Name</th>
            <th className='topRow'>Email</th>
            <th className='topRow'>Organization</th>
            <th className='topRow'>Membership</th>
            <th className='topRow'>Membership Expiration</th>
            <th className='topRow'>Action</th>
        </tr>
    </thead>
    <tbody>
        {customerData.map((user, index) => {
            let membership;
            if (user.Membership_Level === 1) {
                membership = "Tinkerer";
            } else if (user.Membership_Level === 2) {
                membership = "MacGyver";
            } else if (user.Membership_Level === 3 || user.Membership_Level === 4) {
                membership = "Builder";
            }
            let expiartionDate = new Date(user.Membership_Expiration_Date)
            expiartionDate = expiartionDate.toDateString()

            return (
                <tr key={index}>
                    <td>{user.First_Name} {user.Last_Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Organization_Name}</td>
                    <td>{membership}</td>
                    <td>{expiartionDate}</td>
                    <td>
                        <button className="editButton" type='button'>Edit</button>
                        <br/>
                        <button className="loansButton" type='button'>Loans</button>
                        <br/>
                        <button className="checkoutButton" type='button'>Checkout</button>
                    </td>
                </tr>
            );
        })}
    </tbody>
</table>


            </div>
        </>
    )
}

export default All_User