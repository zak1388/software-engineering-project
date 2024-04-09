import React, { useState } from 'react'
import styles from "./login.module.css";
import fdmlogo from "./fdmIcon.png"
import Axios from "axios"
import { useNavigate } from 'react-router-dom';

// TODO: add header as component
// TODO: custom fonts

// function onsubmit(event: SubmitEvent) {
//     const form = event.target;

//     for (const child of form) {
//         if (child.value === "") {
//             console.log("Empty form field");
//             event.preventDefault();
//         }
//     }
// }

function Login() {
  const [username, setUsername] = useState<String>("")
  const [password, setPassword] = useState<String>("")
  const [error, setError] = useState<String>("");

  const navigate = useNavigate()

  const attemptLogin = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)

    await Axios.post("http://localhost:8000/api/login", {
      params: { username, password }
    }).then((response) => {
      console.log(response)
      if(response.data){
        const user = response.data
        navigate("/")
        localStorage.setItem("userId", user._id)
        localStorage.setItem("username", user.username)
        localStorage.setItem("email", user.email)
        localStorage.setItem("first_name", user.first_name)
        localStorage.setItem("last_name", user.last_name)
        localStorage.setItem("holiday_days", user.holiday_days)
        localStorage.setItem("position", user.position)
        localStorage.setItem("office_location", user.office_location)
        localStorage.setItem("personal_number", user.personal_number)
        localStorage.setItem("emergency_number", user.emergency_number)
        localStorage.setItem("address", user.address)

        localStorage.setItem("component_list", JSON.stringify(user.dashboard_model.components_list))




      } else{
        alert("username or password is incorrect");
      }
    }, (err) => {
        if (err.response) {
            setError(err.response.data);
        } else {
            setError(err);
        }
        console.error("Request failed! ", err);
    })
  }


  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <img src={fdmlogo} alt="FDMLogo"/>
      </div>
        <form onSubmit={attemptLogin}  className={styles.loginForm}>
            {error && <div className={styles.errorDiv}> {error.toString()} </div>}
            <div className={styles.field}>
                <label className={styles.label} htmlFor="username">Username: </label>
                <input className={styles.input} type="text" id="username" name="username" onChange={((e) => setUsername(e.target.value))} required/>
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password: </label>
                <input className={styles.input} type="password" id="password" name="password" onChange={((e) => setPassword(e.target.value))} required/>
            </div>
            <input className={styles.submit} type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login
