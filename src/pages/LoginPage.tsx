import React, {useState} from 'react'

interface LoginInterface {
    username: string,
    password: string
}

const defaultValue: LoginInterface = {
    username: "",
    password: ""
}

export default function LoginPage() {
    const [login, setLogin] = useState(defaultValue)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLogin((previnputValues) => {
          return {
            ...previnputValues,
            [name]: value,
          };
        });
      }

    async function handleLoginClick() {
        const BODY = login
        const fetchOptions = {
            method: "PUT",
            body: JSON.stringify(BODY),
            headers: {
                "Content-Type": "application/json",
              }
        }

        const res = await fetch("api/login", fetchOptions)
        if(res.status !== 400) {
            const data = await res.json()
            console.log(data)
        } else {
            alert("User not found")
        }
        
    }


  return (
    <div className='login-wrapper'>
        <h1 className='login-title'>Strong n' Epic</h1>
        <div className='login-container'>
        <label>Användarnamn</label>
        <input name='username' type='text' value={login.username} onChange={handleChange}/>

        <label htmlFor="">Lösenord</label>
        <input name='password'  type='password' value={login.password} onChange={handleChange}/>

        <button className='login-button' onClick={handleLoginClick}>Logga in</button>
        </div>
    </div>
  )
}
