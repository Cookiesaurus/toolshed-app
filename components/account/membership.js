
import './profile.css' 
import Link from 'next/link'
const membership = () => {
  return (
   <>
     <h1>Membership</h1>
    <div className='account-name'>
        <div className='account-email'>
            <p className='light-paragraph'>Current Membership Type</p>
            <h2 className='customer-name'>Customer</h2>
        </div>
        <div className='account-info'>
            <button className='profile-button'>Upgrade Membership</button>
            <Link href={''} className='light-paragraph'>Cancel Subscription</Link>
        </div>
        <div className='switch-container'>
            <label class="switch" htmlFor='auto-renewal'>
                <input type="checkbox" id='auto-renewal'/>
                <span class="slider round"></span>
            </label>
            <p>Auto Renewal</p>
        </div>
    </div>
   </>
  )
}

export default membership
