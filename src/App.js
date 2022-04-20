import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handeAddUser = event => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const user = { name, email }

    // post data to server  

    fetch('http://localhost:5000/user', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        console.log(data);
      })

  }

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>

      <form onSubmit={handeAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="email" name='email' placeholder='Email' required />
        <input type="submit" value='Add User' />
      </form>

      <ul>
        {
          users.map(user => <li key={user.id}>id:{user.id} - Name:{user.name} . email:{user.email}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
