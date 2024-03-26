
import './profile.css' 
import Link from 'next/link'

const Membership = ({user}) => {
  console.log(user.user.Membership_Level)
   const membershipLevel = user.user.Membership_Level
   const renewal = user.user.Membership_Auto_Renewal

    let membership;
    if(membershipLevel == 1){
        membership = "Tinkerer"
    } else if(membershipLevel == 2){
        membership = "MacGyver"
    } else if(membershipLevel == 3){
        membership = "Builder"
    } else if(membershipLevel == 4){
        membership = "Builder"
    }

    const autoRenewal = renewal === 1 ? true : false;


    return (
   <>
     <h1>Membership</h1>
    <div className='account-name'>
        <div className='account-email'>
            <p className='light-paragraph'>Current Membership Type</p>
            <h2 className='customer-name'>{membership}</h2>
        </div>
        <div className='account-info'>
            <button className='profile-button'>Upgrade Membership</button>
            <Link href={''} className='light-paragraph'>Cancel Subscription</Link>
        </div>
        <div className='switch-container'>
            <label className="switch" htmlFor='auto-renewal'>
                <input type="checkbox" id='auto-renewal' checked={autoRenewal}/>
                <span className="slider round"></span>
            </label>
            <p>Auto Renewal</p>
        </div>
    </div>
   </>
  )
}

export default Membership
