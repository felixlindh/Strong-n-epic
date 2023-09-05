import React, {useEffect, useState} from 'react'
import { WorkoutInterface } from '../types/UserInterface'
import WorkoutElements from '../components/WorkoutElements'

const defaultWorkouts: WorkoutInterface[] = [{
    id: "",
    title: "",
    trainer: "",
    startTime: "",
    date: "",
    duration: 0
}]

export default function HomePage() {
const [workouts, setWorkouts] = useState(defaultWorkouts)
useEffect(() => {
        fetch("api/workouts")
        .then((res) => res.json())
        .then((res) => setWorkouts(res.workouts))
    }, [])


  return (
    <div className='home-wrapper'>
     <div className='workout-nav'>
        <button>Book workouts</button> <button>Your workouts</button>
     </div>
        <WorkoutElements workouts={workouts} />
    </div>
  )
}
