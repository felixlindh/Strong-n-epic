import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Server, Response } from "miragejs"
import { nanoid } from 'nanoid';
import { UserInterface, WorkoutInterface } from './types/UserInterface';

let usersArray: UserInterface[] = [
  { 
    id: nanoid(), 
    name: "Felix", 
    password: "123",
    role: "ADMIN",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Dennis", 
    password: "123",
    role: "ADMIN",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Jacke", 
    password: "123",
    role: "USER",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Greta", 
    password: "123",
    role: "USER",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Yves", 
    password: "123",
    role: "USER",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Harald", 
    password: "123",
    role: "USER",
    booked_workouts: []
  },
  { 
    id: nanoid(), 
    name: "Olof", 
    password: "123",
    role: "USER",
    booked_workouts: []
  }
]

let wokroutArray: WorkoutInterface[] = [
  { id: nanoid(), 
    title: "Crossfit",
    trainer: "Gertrude Trainersson",
    date: new Date('2023-09-30T20:30').toISOString().split("T")[0],
    startTime: new Date('2023-09-30T20:30').toTimeString().substring(0, 5),
    duration: 60
  },
  { id: nanoid(), 
    title: "Bodybuilding",
    trainer: "Arnold Schwarzenegger",
    date: new Date('2023-10-05T12:30').toISOString().split("T")[0],
    startTime: new Date('2023-10-05T12:30').toTimeString().substring(0, 5),
    duration: 120
  },
  { id: nanoid(), 
    title: "Yoga",
    trainer: "Yves Flexibel",
    date: new Date('2023-11-25T06:30').toISOString().split("T")[0],
    startTime: new Date('2023-11-25T06:30').toTimeString().substring(0, 5),
    duration: 90
  },
  { id: nanoid(), 
    title: "Spinning",
    trainer: "Greta Spinsson",
    date: new Date('2023-11-25T06:30').toISOString().split("T")[0],
    startTime: new Date('2023-11-25T06:30').toTimeString().substring(0, 5),
    duration: 90
  },
  { id: nanoid(), 
    title: "Karate",
    trainer: "Chuck Norris",
    date: new Date('2023-11-25T06:30').toISOString().split("T")[0],
    startTime: new Date('2023-11-25T06:30').toTimeString().substring(0, 5),
    duration: 90
  },
  { id: nanoid(), 
    title: "Jogging",
    trainer: "Usain Bolt",
    date: new Date('2023-11-25T06:30').toISOString().split("T")[0],
    startTime: new Date('2023-11-25T06:30').toTimeString().substring(0, 5),
    duration: 90
  },
  { id: nanoid(), 
    title: "Zumba",
    trainer: "Zoey Zumbasson",
    date: new Date('2023-11-25T06:30').toISOString().split("T")[0],
    startTime: new Date('2023-11-25T06:30').toTimeString().substring(0, 5),
    duration: 90
  }
]
new Server({
  routes() {
    this.namespace = 'api'

    this.get('/users', () => {
      return {
        users: usersArray
      }
    })
    this.post("/register", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const user = usersArray.find((user) => user.name === body.name)
      if(user) {
        return new Response(400, { some: 'header' }, { errors: [ 'username is allready taken'] })
      } else {
        body.id = nanoid()
        body.role = "ADMIN"
        body.booked_workouts = []
        usersArray.push(body)
        return { user: body }
      }
      
    })

    this.delete("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      const userIndex = usersArray.findIndex((user) => user.id === body.userId)

      usersArray.splice(userIndex, 1)

      return {users: usersArray}

    })

    this.delete("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const userIndex = usersArray.findIndex((user) => user.id === body.userId)
      const bookedIndex = usersArray[userIndex].booked_workouts.findIndex((workout) => workout.id === body.workoutId)
      
      usersArray[userIndex].booked_workouts.splice(bookedIndex, 1)

      return {user: usersArray[userIndex]}
      
    })

    this.post("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const workout = wokroutArray.find((workout) => workout.id === body.workoutId)
      
      if(workout) {
        const userIndex = usersArray.findIndex((user) => user.id === body.userId)
        usersArray[userIndex].booked_workouts.push(workout)
        return {user: usersArray[userIndex]}
      } else {
        return new Response(400, { some: 'header' }, { errors: [ 'something was not found'] })
      }
      
    })

    this.get('/workouts', schema => {
      return {
        workouts: wokroutArray
      }
    })

    this.post("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      if(body.id === "") {
        body.id = nanoid()
        wokroutArray.push(body)
      } else {
        const workoutIndex = wokroutArray.findIndex((workout) => workout.id === body.id)
        wokroutArray[workoutIndex] = body
      }
      
      return { workouts: wokroutArray }
    })

    this.delete("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)

      wokroutArray = wokroutArray.filter((workout) => workout.id !== body.workoutId)
      
      console.log(wokroutArray)
      return {workouts: wokroutArray}
    })

    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const user = usersArray.find((user) => user.name === body.name && user.password === body.password)
      console.log(user)
      if(user) {
        return { user: user}
      } else {
        return new Response(400, { some: 'header' }, { errors: [ 'user was not found'] });
      }
      
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


