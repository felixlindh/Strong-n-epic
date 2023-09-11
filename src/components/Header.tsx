import React from 'react'
import { UserInterface } from '../types/UserInterface'
import { defaultUser } from '../App'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
    username: string,
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

export default function Header({username, setCurrentUser}: HeaderProps): JSX.Element {
  const navigate = useNavigate()
  function logout(): void {
    setCurrentUser(defaultUser)
    navigate("/")
  }

  return (
    <header>
        <h2>Strong n' Epic</h2>
        <div className='header-userinfo'>
        <p>Welcome {username}</p>
        <button className='logout-btn' onClick={logout}>Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/></button>
        </div>
    </header>
  )
}
