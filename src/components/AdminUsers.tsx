import React, {useState} from 'react'
import { UserInterface, WorkoutInterface } from '../types/UserInterface'
import fetchOptions from '../service/fetchService'

type AdminUsersProps = {
    users: UserInterface[]
    setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>
}

export default function AdminUsers({users, setUsers}: AdminUsersProps) {
    const [toggle, setToggle] = useState({})

    function toggleFunction(id: string) {
        setToggle({
          ...toggle,
          [id]: !toggle[id as keyof typeof toggle],
        });
      }

    async function deleteUser(userId: string) {
        const BODY = {userId: userId}
        const res = await fetch("/api/users", fetchOptions("DELETE", BODY))
        const data = await res.json()

        console.log(data.users)
        setUsers(data.users)
    }

    function userBookings(array: WorkoutInterface[]) {
        const elements = array.map((workout) => {
            return <p>{workout.title} - {workout.date}</p>
        })
        if(elements.length > 0) {
            return elements
        } else {
            return <p>User has no workouts booked</p>
        }
        
    }

    const usersElements = users.map((user) => (
        <div className='card' key={user.id}>
            <h4>Username: {user.name}</h4>
            <p>Id: {user.id}</p>
            <p>Role: {user.role}</p>
            <div onClick={() => toggleFunction(user.id)}>
                <u>Workouts</u> {toggle[user.id as keyof typeof toggle] ? (
                <span>&#8593;</span>
            ) : (
                <span>&#8595;</span>
            )}
            {toggle[user.id as keyof typeof toggle] &&
                userBookings(user.booked_workouts)}
            </div>
            <button onClick={() => deleteUser(user.id)} className='delete-user-btn red' >Delete User</button>
        </div>
    ))
  return (<div className='grid-container'>{usersElements}</div>)
}
