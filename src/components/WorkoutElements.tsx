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

        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts})
        alert(`Successfully booked workout`)
    }

    function checkIfBooked(obj: WorkoutInterface){
        const isBooked = currentUser.booked_workouts.some((workout) =>
        workout.id === obj.id && workout.title === obj.title
        )

        return isBooked
    }

    const workoutElements = workouts.map((workout) => (
        <div className='card' key={workout.id}>
            <div className='card-header'>
            <h4>{workout.title}</h4>
            {checkIfBooked(workout)  && <p className='allready-booked'>BOOKED</p>}
            <button disabled={checkIfBooked(workout)} 
            onClick={() => bookWorkout(workout.id)} 
            className={checkIfBooked(workout) ? "book-workout disabled" : "book-workout"}>Book workout</button>
            </div>
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.startTime}</p>
            <p>Duration: {workout.duration} minutes</p>
            
        </div>
    ))
  return (<>{workoutElements}</>)
}
