import { FaTimes } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const User_info = ({ user, onDelete, onEdit }) => {
  return (
    <div id="{key}" className="ct_user_info">
      <div style={{ float: 'right' }}>
        <span onClick={() => onEdit(user.id)}><FaEdit /></span>
        <span onClick={() => onDelete(user.id)}><FaTimes /></span>

      </div>
      <div>Name: <b>{user.name}</b></div>
      <div>Gender: <b>{user.gender}</b></div>
      <div>Email: <b>{user.email}</b></div>
      <div>Status: <b>{user.status}</b></div>
    </div>
  )
}

export default User_info