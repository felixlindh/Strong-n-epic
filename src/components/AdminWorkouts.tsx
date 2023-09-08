import React, {useState} from 'react'
import { WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type AdminWorkoutsProps = {
    workouts: WorkoutInterface[],
    setWorkouts: React.Dispatch<React.SetStateAction<WorkoutInterface[]>>
}

const defaultValue: WorkoutInterface = {
    id: "",
    title: "",
    trainer: "",
    date: "",
    startTime: "",
    duration: 0
}


export default function AdminWorkouts({workouts, setWorkouts}: AdminWorkoutsProps) {
    const [toggle, setToggle] = useState(false)
    const [inputValues, setInputValues] = useState(defaultValue)

    async function deleteWorkout(workoutId: string) {
        const BODY = {
            workoutId: workoutId
        }
        const res = await fetch("/api/workouts", fetchOptions("DELETE", BODY))
        const data = await res.json()

        setWorkouts(data.workouts)
        setToggle(false)
        setInputValues(defaultValue)
        alert("Workout successfully deleted")
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setInputValues((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
      }

    async function addWorkout(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const res = await fetch("/api/workouts", fetchOptions("POST", inputValues))
        const data = await res.json()
        console.log(data)
        setWorkouts(data.workouts)
        
        alert("New workout successfully added")
        setInputValues(defaultValue)
    }

    function close() {
        setInputValues(defaultValue)
        setToggle(false)
    }

    const addWorkoutElement: JSX.Element = (
        <form onSubmit={addWorkout} className='new-workout-card'>
            <p onClick={close} className='x-icon'>&#10006;</p>
            <h3 className='new-workout-title'>{inputValues.id === "" ? "Add New Workout" : "Edit Workout"}</h3>
            <label>Title</label>
            <input required type='text' name='title' value={inputValues.title} onChange={handleChange}/>

            <label htmlFor="">Trainer</label>
            <input required type="text" name='trainer' value={inputValues.trainer} onChange={handleChange}/>

            <div>
            <label htmlFor="">Date</label>
            <input required type="date" name='date' value={inputValues.date} onChange={handleChange}/> 

            <label htmlFor="">Time</label>
            <input required type="time" name='startTime' value={inputValues.startTime} onChange={handleChange}/>
            </div>
            <label htmlFor="">Duration in minutes</label>
            <input required type="number" name='duration' value={inputValues.duration} onChange={handleChange}/>

            <button className='add-workout-btn' type='submit'>{inputValues.id === "" ? "Add workout" : "Save changes"}</button>
            {inputValues.id !== "" ? <button type='button' onClick={() => deleteWorkout(inputValues.id)} className='add-workout-btn red'>Delete Workout</button> : ""}
        </form>
    )

    function edit(workout: WorkoutInterface) {
        setInputValues(workout)
        setToggle(true)
    }

    const workoutElements = workouts.map((workout) => (
        <div className='card' key={workout.id}>
            <div className='card-header'>
            <h4>{workout.title}</h4> 
            <button onClick={() => edit(workout)} className='edit-btn'>&#9881;</button>
            </div>
            <p>Trainer: {workout.trainer}</p>
            <p>Date: {workout.date}</p>
            <p>Time: {workout.startTime}</p>
            <p>Duration: {workout.duration} minutes</p>
           
        </div>
    ))

  return (<>
  <button className='toggle-add' onClick={() => setToggle(true)}>Add new workout</button>
  <div className='grid-container'>
  {workoutElements} 
  </div>
  {toggle && addWorkoutElement}</>)
}
