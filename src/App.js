import UsersView from "./components/UsersView"
import { useState, useEffect } from 'react'

const App = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers(page)
      setUsers(usersFromServer)
    }
    getUsers()
  }, [])

  const fetchUser = async (name) => {
    const res = await fetch('https://gorest.co.in/public/v2/users?name=' + name)
    const data = await res.json()
    setUsers(data)
  }

  // Fetch Users X-Pagination-Total
  const fetchUsers = async (tpage) => {

    const res = await fetch('https://gorest.co.in/public/v2/users?page=' + tpage)
    const data = await res.json()

    return data
  }

  // Delete User DELETE /public/v2/users/9
  const deleteUser = async (id) => {
    const res = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer f990c9dbdfa3d72c09caf4de6b364ca0611fc2c725b156c783789a6b07d16023'
      }
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 204
      ? setUsers(users.filter((user) => user.id !== id))
      : alert('Error Deleting This User')
  }

  // Add User
  const addUser = async (user) => {

    console.log(user)
    const res = await fetch('https://gorest.co.in/public/v2/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer f990c9dbdfa3d72c09caf4de6b364ca0611fc2c725b156c783789a6b07d16023'
      },
      body: JSON.stringify(user),
    })

    if (res.status === 201) {
      const data = await res.json()
      setUsers([data, ...users])
      document.getElementById("myNav").style.width = "0%";
      alert('The user was created successfully')
    } else {
      alert('The user could not be created, please check the entered information')
    }

  }

  // Edit Users
  const editUsers = async (user) => {

    console.log(user)
    const res = await fetch(`https://gorest.co.in/public/v2/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer f990c9dbdfa3d72c09caf4de6b364ca0611fc2c725b156c783789a6b07d16023'
      },
      body: JSON.stringify(user),
    })

    if (res.status === 200) {
      const data = await res.json()

      setUsers(
        users.map((user) =>
          user.id === data.id ? { ...user, name: data.name, email: data.email, gender: data.gender, status: data.status } : user
        )
      )

      document.getElementById("myNav").style.width = "0%";
      alert('The user was edited successfully')
    } else {
      alert('The user could not be edited, please check the entered information')
    }
  }

  const pastPage = () => {
    if (page > 1) {
      setPage(page - 1)
      let tpage
      tpage ||= page - 1

      const getUsers = async () => {
        const usersFromServer = await fetchUsers(tpage)
        setUsers(usersFromServer)
      }
      getUsers()
    }
  }

  const nextPage = () => {
    setPage(page + 1)
    let tpage = page + 1
    const getUsers = async () => {
      const usersFromServer = await fetchUsers(tpage)
      setUsers(usersFromServer)
    }
    getUsers()
  }

  return (
    <div className="container navyBlue">
      <UsersView users={users} onDelete={deleteUser} page={page} ppage={pastPage} npage={nextPage} onAdd={addUser} editUsers={editUsers} fetchUser={fetchUser} />
    </div>
  )
}

export default App;
