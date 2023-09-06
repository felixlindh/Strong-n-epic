import React from 'react'
import { UserInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type BookedProps = {
    currentUser: UserInterface,
    setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>
}

export default function BookedElements({currentUser, setCurrentUser}: BookedProps) {


    async function cancelWorkout(workoutId: string) {
        console.log(workoutId)
        const BODY = {
            workoutId: workoutId,
            userId: currentUser.id
        }

        let res = await fetch("/api/users/booking", fetchOptions("DELETE", BODY))
        let data = await res.json()

        console.log(data.user)
        setCurrentUser({...currentUser, booked_workouts: data.user.booked_workouts})
    }

    const bookedElements = currentUser.booked_workouts?.map((workout) => (
        <div className='card' key={workout.id}>
            <h4>{workout.title}</h4>
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.startTime}</p>
            <p>Duration: {workout.duration} minutes</p>
            <button onClick={() => cancelWorkout(workout.id)} className='book-workout red'>Cancel workout</button>
        </div>
    ))
  return (<>{currentUser.booked_workouts.length > 0 ? bookedElements
            : <h2 className='booked-status'>You have no booked workouts</h2>}</>)
}
