import React, {useEffect, useState} from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import Header from '../components/Header'
import AdminUsers from '../components/AdminUsers'

type AdminProps = {
    currentUser: UserInterface
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


export default function AdminPage({currentUser}: AdminProps) {
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
    <Header username={currentUser.name} />
    <h3 className='admin-title'>AdminPage</h3>

    {!toggle && <AdminUsers setUsers={setUsers} users={users} />}
    <div className='workout-nav'>
        <button className={!toggle ? "active" : ""} onClick={() => setToggle(false)}>Users</button> 
        <button className={toggle ? "active" : ""} onClick={() => setToggle(true)}>Workouts</button>
    </div>
    </div>
  )
}
