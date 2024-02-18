import './profile.css'
import Link from 'next/link'
import Image from 'next/image'
import visa from '../../app/public/images/visa.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
const Cards = () => {
  return (
    <>
     <h1>Saved Cards</h1>
    <div className='card-cont'>
        <div className='card new-card'>
            <Link href={''} className='new-link'>Add New Payment Method</Link>
        </div>
        <div className='card'>
            <div className='card-type'>
                <Image src={visa} alt='Visa Card' width={55.8} className='card-image'/>
                <div className='card-icons'>
                    <FontAwesomeIcon icon={faPencil} style={{backgroundColor: 'white'}} size='lg'/>
                    <FontAwesomeIcon icon={faTrashCan} style={{backgroundColor: 'white'}} size='lg'/>
                </div>
            </div>
            <div className='card-nickname'>
                <p>nickname</p>
                <p className='weight-400'>· · · · · · · · · · · · 4 3 2 1</p>
            </div>
            <div className='card-details'>
                <p className='weight-300'>Card Holder Name</p>
                <p className='weight-300'>Exp: MM/YY</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Cards
