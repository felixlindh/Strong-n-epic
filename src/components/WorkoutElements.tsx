import React from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type WorkoutProps = {
    workouts: WorkoutInterface[],
    currentUser: UserInterface,
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

export default function WorkoutElements({workouts, currentUser, setCurrentUser}: WorkoutProps) {

    async function bookWorkout(workoutId: string) {
    
        const BODY = {
            workoutId: workoutId,
            userId: currentUser.id
        }

        const res = await fetch("/api/users/booking", fetchOptions("POST", BODY))
        const data = await res.json()
        console.log(data.user.booked_workouts)

        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts})
    }

    const workoutElements = workouts.map((workout) => (
        <div className='card' key={workout.id}>
            <h4>{workout.title}</h4>
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.startTime}</p>
            <p>Duration: {workout.duration} minutes</p>
            <button onClick={() => bookWorkout(workout.id)} className='book-workout'>Book workout</button>
        </div>
    ))
  return (<>{workoutElements}</>)
}
