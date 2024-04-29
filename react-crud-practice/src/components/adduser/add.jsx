import './add.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Add = () => {
    let users = {
        fname: "",
        lname: "",
        age: "",
        email: "",
        password: ""
    }

    const [userdata, setUserdata] = useState(users)
    const navigate = useNavigate()

    const inputHandler = (e) => {
        const {name, value} = e.target
        setUserdata({...userdata, [name]: value})
        console.log(userdata);
    }

    const submitform = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:5000/create", userdata)
        .then((response)=>{
            toast.success(response.data.msg, {position: "top-right"})
            navigate('/')
        })
        .catch(error => console.log(error))
    }

  return (
    <div className="addUser">
        <Link to={"/"}>Back</Link>
        <h2>Add User</h2>

        <form className='form' onSubmit={submitform}>
            <div className='inputGroup'>
                <label htmlFor='fname'>First Name</label>
                <input onChange={inputHandler} type='text' id='fname' name='fname' placeholder='First Name' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='lname'>Last Name</label>
                <input onChange={inputHandler} type='text' id='lname' name='lname' placeholder='Last Name' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='age'>Age</label>
                <input onChange={inputHandler} type='text' id='age' name='age' placeholder='Age' autoComplete='off'></input>
            </div> 
            <div className='inputGroup'>
                <label htmlFor='email'>Email</label>
                <input onChange={inputHandler} type='text' id='email' name='email' placeholder='Email' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='password'>Password</label>
                <input onChange={inputHandler} type='text' id='password' name='password' placeholder='Password' autoComplete='off'></input>
            </div>

            <div className='inputGroup'>
                <button type='submit'>Add User</button>
            </div>
        </form>
    </div>
        

  )
}

export default Add