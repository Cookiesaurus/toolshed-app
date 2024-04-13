const AddTransaction = () => {
  return (
    <>
      <h1>Add Transaction</h1>
      <form >
        <div className="new-user-cont">
          <div className="new-user-left">
            <div className="accountInfo">
              <div className="primaryInfo">
                <h2>Account Info</h2>
                <label htmlFor="first_Name">First Name</label>
                <input type="text" id="first_Name" name="firstName" />

                <label htmlFor="last_Name">Last Name</label>
                <input type="text" id="last_Name" name="lastName" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

              </div>
            </div>
          </div>
          <div className="new-user-right">
            <h2>Transaction Info</h2>
                <label htmlFor="transaction-id">Transaction ID</label>
                <input type="text" id="transaction-id" name="transactionID" />

                <label htmlFor="transaction-type">Transaction Type</label>
                <input type="text" id="transaction-type" name="trnasactionType" />

                <label htmlFor="transaction-start">Transaction Start Date: When an admin starts the transaction</label>
                <input type="date" id="transaction-start" name="transactionStart" />

                <label htmlFor="transaction-end">Transaction End Date</label>
                <input type="date" id="transaction-end" name="transactionEnd" />

                <label htmlFor="transaction-amount">Transaction Amount</label>
                <input type="text" id="transaction-amount" name="transactionAmount" />
          </div>
        </div>
        <div className="create-button-cont">
          <button className="createNewUserButton" type="submit">
            Create Transaction
          </button>
        </div>
      </form>
    </>
  )
}

export default AddTransaction
