import React, {useState} from 'react'
import InputElements from '../components/InputElements'
import {Link, useNavigate} from "react-router-dom"
import { LoginInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

const defaultValue: LoginInterface = {
    name: "",
    password: ""
}

export default function Register(): JSX.Element {
    const [login, setLogin] = useState(defaultValue)
    const navigate = useNavigate()
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target;
        setLogin((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
      }

    async function handleRegisterClick(): Promise<void> {
        const BODY = login
        

        const res = await fetch("api/register", fetchOptions<LoginInterface>("POST", BODY))
        if(res.status !== 400) {
            // const data = await res.json()
            alert(`Welcome to strong n' epic`)
            navigate("/")
        } else {
            alert("Username allready being used, try another")
        }
    }
  return (
    <div className='register-wrapper'>
        <h1 className='login-title'>Strong n' Epic</h1>
        <InputElements stateValues={login} handleChange={handleChange} handleClick={handleRegisterClick} />

       <p className='link'>Allready have an account?<Link to={"/"}> Login here</Link></p>
    </div>
  )
}
