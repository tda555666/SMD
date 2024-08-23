import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot ,faPhone,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import contactus from '../../assets/imgs/contactus.png'



function Contacts() {
  return (
    <>
    <div className='flex items-center justify-center'>
      <div className='flex items-center justify-between w-128 border rounded bg-white shadow-xl mt-10 p-10'>
        <div className='flex flex-col space-y-4 p-4'>
          <h1 className='text-4xl'>how can we help you?</h1>
          <p>our service center can help you at every time 24/7</p>
          <div>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>palestine, gaza city</span>
          </div>
          <div>
          <FontAwesomeIcon icon={faPhone} />
            <span>0544361919</span>
          </div>
          <div>
          <FontAwesomeIcon icon={faEnvelope} />
            <span>urmomisgay@gmail.com</span>
          </div>
        </div>
        <div className=''>
        <img src = {contactus} className='h-[60vh] w-[400px] '></img>
        </div>
      </div>
    </div>
    </>
  )
}



export default Contacts