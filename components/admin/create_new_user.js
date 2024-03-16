const Create_New_User = () =>{
    return(
        <>
            <h1>Create a new user</h1>

            <div>
                <h2>Account</h2>
                <form>
                    <label htmlFor="first-name" className="sr-only">First Name</label>
                    <input className="input" placeholder={" First Name"} required id="first-name" name="firstName"/>
                    <label htmlFor="last-name" className="sr-only">Last name</label>
                    <input className="input" placeholder={" Last Name"} required id="last-name" name="lastName"/>
                    <input className="input" placeholder={" Title"} id="name-title" name="title"/>
                    <label htmlFor="organization" className="sr-only">Organization</label>
                    <input className="input" placeholder={" Organization"} id="organization" name="organi"/>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input className="input" type="email" placeholder={" myemail@example.com"} required id="email" name="signup-email"/>
                    <label htmlFor="phone-number" className="sr-only">Phone number</label>
                    <input className="input" type="tel" placeholder={" Phone number Ex: 123-456-7890"} required id="phone-number" name="number"/>
                    <label htmlFor="birthday" className="sr-only">Birthday</label>
                    <p className="form-header">Birthday:<input className="input" type="date" placeholder={"Birthday"} required id="birthday" name="birth-day"/></p>
                    </form>
            </div>

            <div>
                <h2>Membership</h2>
            </div>

            <div>
                <h2>Primary Info</h2>
            </div>

            <div>
                <h2>Secondary Info</h2>
            </div>
        </>
    )
}

export default Create_New_User