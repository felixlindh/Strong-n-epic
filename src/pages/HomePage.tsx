import React, {useEffect, useState} from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import { Link } from "react-router-dom"
import WorkoutElements from '../components/WorkoutElements'
import BookedElements from '../components/BookedElements'
import Header from '../components/Header'

const defaultWorkouts: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    startTime: "",
    date: "",
    duration: 0
}]

type CurrentUserProps = {
    currentUser: UserInterface
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

export default function HomePage({currentUser, setCurrentUser}: CurrentUserProps) {
const [workouts, setWorkouts] = useState(defaultWorkouts)
const [toggle, setToggle] = useState(false)
useEffect(() => {
        fetch("api/workouts")
        .then((res) => res.json())
        .then((res) => setWorkouts(res.workouts))
    }, [])


  return (
    <div className={!toggle ? 'home-wrapper' : 'home-wrapper-booked'}>
        <Header username={currentUser.name} />
        {currentUser.role === "ADMIN" && <Link className='admin-link' to={"/admin"}>Admin page &#8594;</Link>}
     <div className='workout-nav'>
        <button className={!toggle ? "active" : ""} onClick={() => setToggle(false)}>Book Workouts</button> 
        <button className={toggle ? "active" : ""} onClick={() => setToggle(true)}>Your Workouts</button>
     </div>
        {!toggle && <WorkoutElements workouts={workouts} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        {toggle && <BookedElements currentUser={currentUser} setCurrentUser={setCurrentUser} />}
    </div>
  )
}
