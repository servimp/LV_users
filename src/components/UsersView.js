import ListingInfo from "./ListingInfo"
import Listing from "./Listing"
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import { useState } from 'react'

const Users_view = ({ users, onDelete, page, npage, ppage, onAdd, editUsers, fetchUser }) => {

  const [u_name, setUname] = useState('')
  const [u_email, setUemail] = useState('')
  const [active, setActive] = useState(true)
  const [gender, setGender] = useState('')
  const [u_label, setUlabel] = useState('Enter User Name')
  const [e_label, setElabel] = useState('Enter User Email')
  const [btn_label, setBtnlabel] = useState('CREATE NEW USER')
  const [idEdit, setIdedit] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!u_name || !u_email || !gender) {
      alert('Please check that the user information is complete')
      return
    }

    if (idEdit === 0) {
      console.log('on create')
      let status_user = active === true ? 'active' : 'inactive'
      onAdd({ name: u_name, email: u_email, status: status_user, gender: gender })
    }

    else {
      console.log('on edit')
      let status_user = active === true ? 'active' : 'inactive'
      editUsers({ id: idEdit, name: u_name, email: u_email, status: status_user, gender: gender })
    }

  }

  const openNav = () => {
    document.getElementById("myNav").style.width = "100%";
  }

  const createUser = () => {
    setUlabel('Enter User Name')
    setElabel('Enter User Email')
    setBtnlabel('ENTER NEW USER')
    setUname('')
    setUemail('')
    setActive(true)
    setGender('')
    setIdedit(0)
    openNav()
  }

  const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
  }


  const editUser = (id) => {
    users.map((user) => {
      if (user.id === id) {
        console.log(user)
        setUlabel('Edit User Name')
        setElabel('Edit User Email')
        setBtnlabel('EDIT USER')
        setUemail(user.email)
        setUname(user.name)
        setGender(user.gender)
        setActive(user.status === 'active' ? true : false)
        setIdedit(id)
      } return true
    })
    openNav()
  }

  const handleChange = (event) => {
    setGender(event.target.value)
  }

  return (
    <div className="ct_users_view">Users_view {"(Livevox exercise)"}
      <ListingInfo createUser={createUser} page={page} pastPage={ppage} nextPage={npage} />
      <Listing users={users} onDelete={onDelete} onEdit={editUser} fetchUser={fetchUser} />
      <div id="myNav" className="overlay">

        <span style={{ cursor: 'pointer' }} className="closebtn" onClick={closeNav}>&times;</span>

        <div className="overlay-content">
          <form className='add-form' onSubmit={onSubmit}>
            <div style={{ padding: '24px', width: '340px', display: 'inline-block', backgroundColor: '#ccc', borderRadius: '12px' }}>
              <div style={{ padding: '8px' }}>
                <TextField id="u_name" label={u_label} value={u_name} variant="outlined" onChange={(e) => setUname(e.target.value)} />
              </div>
              <div style={{ padding: '8px', paddingBottom: '16px' }}>
                <TextField id="u_email" label={e_label} value={u_email} variant="outlined" onChange={(e) => setUemail(e.target.value)} />
              </div>
              <div style={{ border: '2px solid #EEE', padding: '8px', borderRadius: '6px' }}>Gender
                <RadioGroup>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    checked={gender === 'female'}
                    onChange={handleChange} />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    checked={gender === 'male'}
                    onChange={handleChange} />
                </RadioGroup>
              </div>
              <div>Active
                <Checkbox label="Checkbox demo" checked={active}
                  value={active}
                  onChange={(e) => setActive(e.currentTarget.checked)} />
              </div>
              <div style={{ padding: '8px' }}><Button type="submit" variant="contained">+ {btn_label}</Button></div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Users_view