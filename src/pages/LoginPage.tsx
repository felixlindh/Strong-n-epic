import React, {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import fetchOptions from '../service/fetchService'
import {LoginInterface, UserInterface} from '../types/UserInterface'



const defaultValue: LoginInterface = {
    username: "",
    password: ""
}

type UserProps = {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

export default function LoginPage(props: UserProps) {
    const [login, setLogin] = useState(defaultValue)
    const navigate = useNavigate()
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLogin((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
      }

    async function handleLoginClick() {
        const BODY = login
        

        const res = await fetch("api/login", fetchOptions<LoginInterface>("PUT", BODY))
        if(res.status !== 400) {
            const data = await res.json()
            props.setCurrentUser(data.user)
            navigate("/home")
        } else {
            alert("User not found")
        }
        
    }


  return (
    <div className='login-wrapper'>
        <h1 className='login-title'>Strong n' Epic</h1>
        <div className='login-container'>
        <label>Username</label>
        <input name='username' type='text' value={login.username} onChange={handleChange}/>

        <label htmlFor="">Password</label>
        <input name='password'  type='password' value={login.password} onChange={handleChange}/>

        <button className='login-button' onClick={handleLoginClick}>Login</button>
        </div>

       <p className='link'>Don't have an account?<Link to={"/register"}> Sign up here</Link></p>
    </div>
  )
}
