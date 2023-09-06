import React from 'react'

type HeaderProps = {
    username: string
}

export default function Header({username}: HeaderProps) {
  return (
    <header>
        <h2>Strong n' Epic</h2>
        <p>Welcome {username}</p>
    </header>
  )
}
