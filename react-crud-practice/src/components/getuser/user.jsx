import React, { useEffect, useState } from 'react'
import "./user.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const User = () => {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get("http://localhost:5000/fetch")
            setUsers(response.data)
        }
        
        fetchData()
    },[])

    const deleteUser = async (userid) => {
        await axios.delete(`http://localhost:5000/delete/${userid}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=> user._id !== userid))
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="userTable">
        <Link to={"/add"} className='add_button'>Add User</Link>

        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return (
                        <tr key={user._id}>
                            <td>{index+1}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                        
                            <td className='action_buttons'>
                            <button onClick={(e)=>deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                            <Link to={"/edit/"+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default User