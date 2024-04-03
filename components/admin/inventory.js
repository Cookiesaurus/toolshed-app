const Inventory = ({inventory}) =>{
    console.log(inventory)
    return(
        <>
            <div className="filterOptionsContainer">
                <form className="filterOptions">
                    <input list="type" name="type" placeholder=" Type"/>
                    <datalist id="type">
                        {/* <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/> */}
                    </datalist>
                </form>
                <form className="filterOptions">
                    <input list="availability" name="availability" placeholder=" Availability"/>
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
      <th className='topRow'>ID</th>
      <th className='topRow'>Name</th>
      <th className='topRow'>Location</th>
      <th className='topRow'>Availability</th>
      <th className='topRow'>Action</th>
    </tr>
  </thead>
  <tbody>
    {inventory.map((item, index) => (
      <tr key={index}>
        <td>{item.Tool_ID}</td>
        <td>{item.Tool_Name}</td>
        <td>{item.Location_Name}</td>
        <td>{item.Tool_Status_Details}</td>
        <td>
          <button className="editButton" type='button'>Edit</button>
          <br/>
          <button className="loansButton" type='button'>Loans</button>
          <br/>
          <button className="checkoutButton" type='button'>Checkout</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
        </>
    )
}

export default Inventory