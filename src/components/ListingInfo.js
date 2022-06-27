import Button from '@mui/material/Button'
import { FaArrowCircleRight } from 'react-icons/fa'
import { FaArrowCircleLeft } from 'react-icons/fa'

const Listing_info = ({ createUser, page, pastPage, nextPage }) => {
  return (
    <div className='ct_info'>
      <div className='ct_l' style={{ paddingTop: '6px' }}>
        <span onClick={pastPage}><FaArrowCircleLeft /></span>&nbsp;
        Page {page} of 260 &nbsp;
        <span onClick={nextPage}><FaArrowCircleRight /></span>
      </div>
      <div className='ct_r'><Button onClick={createUser} variant="contained">Create User</Button></div>
    </div>
  )
}

export default Listing_info