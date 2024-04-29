import '../adduser/add.css'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import toast from 'react-hot-toast'

const Edit = () => {
    
    const {id} = useParams()
    const [userdata, setUserdata] = useState([])
    const navigate = useNavigate()

    const inputHandler = (e) => {
        const {name, value} = e.target
        setUserdata({...userdata, [name]: value})
        console.log(userdata);
    }

    useEffect(()=>{
            axios.get(`http://localhost:5000/getone/${id}`)
            .then((response)=>{
                setUserdata(response.data);
            })
            .catch(error => console.log(error))
        
    },[id])

    const submitform = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:5000/update/${id}`, userdata)
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
                <input onChange={inputHandler} value={userdata.fname} type='text' id='fname' name='fname' placeholder='First Name' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='lname'>Last Name</label>
                <input onChange={inputHandler} value={userdata.lname} type='text' id='lname' name='lname' placeholder='Last Name' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='age'>Age</label>
                <input onChange={inputHandler} value={userdata.age} type='text' id='age' name='age' placeholder='Age' autoComplete='off'></input>
            </div>
            <div className='inputGroup'>
                <label htmlFor='email'>Email</label>
                <input onChange={inputHandler} value={userdata.email} type='text' id='email' name='email' placeholder='Email' autoComplete='off'></input>
            </div>
            
            <div className='inputGroup'>
                <button type='submit'>Add User</button>
            </div>
        </form>
    </div>
  )
}

export default Edit