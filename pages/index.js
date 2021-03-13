import { useState } from 'react'
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'

export default function Home() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('Not logged in')
  async function submitForm(){
    const res=await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((t)=>t.json())
    const token=res.token;
    const json=jwt.decode(token)
    if(json.admin){
      Cookie.set("_wsp",token,{secure: process.env.NODE_ENV === "production",sameSite: "lax",expires: 7})
      // document.cookie = `foo=${token}; path=/;sameSite=lax`;
      setMessage(`welcome ${json.username} and you are ${json.admin ? 'admin':'not admin'}`)
    }else{
      setMessage('Invalid Credentials')
    }
    alert(Cookie.get("_wsp"));
  }

  return (
    <div>
      <h1>{message}</h1>
      {/* <h2>{Cookie.get("_wsp")}</h2> */}
      <form>
        <input type="text" name="username" value={username} onChange={e=> setUsername(e.target.value)} /><br />
        <input type="password" name="password" value={password} onChange={e=> setPassword(e.target.value)} /><br />
        <input type="button" value="login" onClick={submitForm} />
      </form>
    </div>
  )
}
