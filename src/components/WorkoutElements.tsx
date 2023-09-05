import React from 'react'
import { WorkoutInterface } from '../types/UserInterface'

type WorkoutProps = {
    workouts: WorkoutInterface[]
}

export default function WorkoutElements({workouts}: WorkoutProps) {

    const workoutElements = workouts.map((workout) => (
        <div className='card' key={workout.id}>
            <h4>{workout.title}</h4>
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.startTime}</p>
            <p>Duration: {workout.duration} minutes</p>
            <button className='book-workout'>Book workout</button>
        </div>
    ))
  return (<>{workoutElements}</>)
}
