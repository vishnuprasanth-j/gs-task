import { useState,useEffect } from 'react'
import axios from 'axios';
import Card from './components/Card.jsx';

function App() {
const [userData,setUserData]=useState()
const fetchdata=async()=>{
  const {data}=await axios.get(`http://localhost:8000/users`)
  setUserData(data)
}
  useEffect(()=>{
   fetchdata() 
  })
  return (
    <div>
      {userData && userData.map((user,id) => (
      <div key={user._id} style={{display:'flex',gap:'8px'}}>
        <p>{id}.</p>
        <p>{user.name}</p>
        <p>{user.gender}</p>
        <p>{user.status}</p>
      </div>
    ))}
    </div>
  )
}

export default App
