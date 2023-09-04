import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Server, Response } from "miragejs"
import { nanoid } from 'nanoid';

let usersArray = [
  { 
    id: nanoid(), 
    name: "Felix", 
    password: "123",
    booked_workouts: []
  }
]

let wokroutArray = [
  { id: nanoid(), 
    title: "Crossfit",
    trainer: "Gertrude Trainersson",
    date: new Date('2023-09-30T20:30').toDateString(),
    startTime: new Date('2023-09-30T20:30').toLocaleTimeString(),
    duration: 60
  },
  { id: nanoid(), 
    title: "Bodybuilding",
    trainer: "Arnold Schwarzenegger",
    date: new Date('2023-10-05T12:30').toDateString(),
    startTime: new Date('2023-10-05T12:30').toLocaleTimeString(),
    duration: 120
  },
  { id: nanoid(), 
    title: "Yoga",
    trainer: "Yves Flexibel",
    date: new Date('2023-11-25T06:30').toDateString(),
    startTime: new Date('2023-11-25T06:30').toLocaleTimeString(),
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
    this.post("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      body.id = nanoid()
      usersArray.push(body)
      return { users: body }
    })

    this.get('/workouts', schema => {
      return {
        workouts: wokroutArray
      }
    })

    this.post("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      body.id = nanoid()
      wokroutArray.push(body)
      return { workouts: body }
    })

    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody)
      const user = usersArray.find((user) => user.name === body.username && user.password === body.password)
      console.log(user)
      if(user) {
        return { users: user}
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


