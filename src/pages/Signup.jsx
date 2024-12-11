import React from 'react'
import AuthCard from '../components/AuthCard'

const Signup = () => {
  function CreateAccount(){
    const arr={Name:"Beebagr",Email:"beebagratta90@gmail.com",Password:"123"}
    localStorage.setItem("Account",JSON.stringify(arr))
  }
  return (
    <div>
      <AuthCard AuthFunction={CreateAccount} AuthButton={"Singup"} AuthLink={"/"} AuthLinkText={"Login"}/>
    </div>
  )
}

export default Signup
