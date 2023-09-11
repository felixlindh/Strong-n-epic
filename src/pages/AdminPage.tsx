import React, {useEffect, useState} from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AdminUsers from '../components/AdminUsers'
import AdminWorkouts from '../components/AdminWorkouts'
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

type AdminProps = {
    currentUser: UserInterface,
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

const defaultWorkouts: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    startTime: "",
    date: "",
    duration: 0
}]

const defaultUsers: UserInterface[] = [{
    id: "",
    name: "", 
    password: "",
    role: "USER",
    booked_workouts: []
}]


export default function AdminPage({currentUser, setCurrentUser}: AdminProps): JSX.Element {
    const navigate = useNavigate()
    const [users, setUsers] = useState(defaultUsers)
    const [workouts, setWorkouts] = useState(defaultWorkouts)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        fetch("api/users")
        .then((res) => res.json())
        .then((res) => setUsers(res.users))

        fetch("api/workouts")
        .then((res) => res.json())
        .then((res) => setWorkouts(res.workouts))
    }, [])

  return (
    <div className='admin-wrapper'>
    <Header setCurrentUser={setCurrentUser} username={currentUser.name} />
    <div className='title-container'>
    <FontAwesomeIcon onClick={() => navigate("/home")} className='left-arrow' icon={faLeftLong} />
    <h3 className='admin-title'>AdminPage {toggle ? "workouts" : "Users"}</h3>
    </div>
    <div className='workout-nav'>
        <button className={!toggle ? "active" : ""} onClick={() => setToggle(false)}>Users</button> 
        <button className={toggle ? "active" : ""} onClick={() => setToggle(true)}>Workouts</button>
    </div>
    {!toggle && <AdminUsers setUsers={setUsers} users={users} />}
    {toggle && <AdminWorkouts workouts={workouts} setWorkouts={setWorkouts} />}
   
    
    </div>
  )
}
