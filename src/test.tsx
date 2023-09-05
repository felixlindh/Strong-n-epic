import { useEffect } from "react"

export default function Test() {
    
    useEffect(() => {
      fetch("api/users")
        .then((res) => res.json())
        .then((res) => console.log(res))

        fetch("api/workouts")
        .then((res) => res.json())
        .then((res) => console.log(res))
    }, [])

    async function postWorkout() {
        const BODY = { 
           workoutId: "321",
           userId: "123"
          }

        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(BODY),
            headers: {
                "Content-Type": "application/json",
              }
        }
        const res = await fetch("api/users/booking", fetchOptions)

        console.log(res)
    }

    async function postUser() {
        const BODY = {  title: "Ny workout",
            trainer: "Mr tränare",
            date: new Date('2023-11-25T06:30').toDateString(),
            startTime: new Date('2023-11-25T06:30').toLocaleTimeString(),
            duration: 90
          }

        const fetchOptions = {
            method: "POST",
            body: JSON.stringify(BODY),
            headers: {
                "Content-Type": "application/json",
              }
        }
        const res = await fetch("api/workouts", fetchOptions)

        console.log(res)

        await fetch("api/workouts")
        .then((res) => res.json())
        .then((res) => console.log(res))
    }
    

    return (
        <div>
            <button onClick={postWorkout} >New workout</button>
        </div>
    )
}