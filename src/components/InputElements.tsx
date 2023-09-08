import React from 'react'
import { LoginInterface } from '../types/UserInterface'
import { useLocation } from 'react-router-dom'

type InputElementsProps = {
    stateValues: LoginInterface,
    handleChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    handleClick: () => void 
}

export default function InputElements({stateValues, handleChange, handleClick}: InputElementsProps) {
    const location = useLocation()
  return (
    <div className='login-container'>
        <label>Username</label>
        <input name='name' type='text' value={stateValues.name} onChange={handleChange}/>

        <label htmlFor="">Password</label>
        <input name='password'  type='password' value={stateValues.password} onChange={handleChange}/>

        <button className='login-button' onClick={handleClick}>{location.pathname === "/register" ? "Register" : "Login"} </button>
    </div>
  )
}
