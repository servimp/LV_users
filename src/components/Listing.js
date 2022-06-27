import { useState } from "react"
import UserInfo from "./UserInfo"
import TextField from "@mui/material/TextField"
import Button from '@mui/material/Button'

const Listing = ({ users, onDelete, onEdit, fetchUser }) => {

  const [s_label, setSlabel] = useState('')

  return (
    <div className="ct_listing">

      <div style={{ padding: '8px', paddingBottom: '16px', height: '78px' }}>
        <div style={{ float: 'left' }}>
          <TextField id="u_search" label={'Search By User Name'} value={s_label} variant="outlined" onChange={(e) => setSlabel(e.target.value)} />
        </div>
        <div style={{ float: 'right', paddingTop: '8px', paddingRight: '24px' }}>
          <Button onClick={() => fetchUser(s_label)} variant="outlined">Search</Button>
        </div>
      </div>

      {users.map((user, index) => (
        <UserInfo key={index} user={user} onDelete={onDelete} onEdit={onEdit} />
      ))}

    </div>
  )
}

export default Listing