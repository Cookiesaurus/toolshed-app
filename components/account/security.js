const Security = () =>{
    return(
        <>
            <h1>Security</h1>
                    <div className='account-name'>
                        <div className='account-email'>
                            <p className='light-paragraph'>Log-in Email</p>
                            <p>testemail@email.com</p> 
                        </div>
                        <div className='account-info'>
                            <button type="submit" id="change-password" className="profile-button">
                                Change Password
                            </button>
                        </div>
                    </div>
        </>
    )
}

export default Security