import React, { useState } from 'react'
import user_icon from './person.png'
import email_icon from './email.png'
import password_icon from './password.png'
// import logo_icon from './Layer.png'
import './login.css'

const login = () => {

  const [action,setAction] = useState("Sign Up");

  return (
	<div className='container'>
   
    
    
   
<div className='main'></div>
    <div className="header">
      <div className="text">{action}</div>
        <div className="underline"></div>
    </div>
    <div className="inputs">
      <div className="input">
        <img src={user_icon} alt='' />
        <input type="text" placeholder='Name'/>
      </div>
      <div className="input">
        <img src={email_icon} alt='' />
        <input type="email" placeholder='Email-Id'/>
      </div>
      <div className="input">
        <img src={password_icon} alt='' />
        <input type="password" placeholder='Password'/>
      </div>
    </div>
    <div className="forgot-password">Lost Password? <span>Click Here !</span></div>
    <div className="submit-container">
      <div className={action==="Login"?"submit gray":"submit"}>Sign Up</div>
      <div className={action==="Sign Up"?"submit gray":"submit"}>Login</div>
    </div>
  </div>
  )
}

export default login