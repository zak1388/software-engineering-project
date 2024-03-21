import React from 'react'
import styles from "./login.module.css";
import fdmlogo from "./fdmIcon.png"

// TODO: add header as component
// TODO: custom fonts

function onsubmit(event: SubmitEvent) {
    const form = event.target;

    for (const child of form) {
        if (child.value === "") {
            console.log("Empty form field");
            event.preventDefault();
        }
    }
}

function Login() {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <img src={fdmlogo} alt="FDMLogo"/>
      </div>
        <form  method="POST" action="http://localhost:8000/login" onSubmit={onsubmit}  className={styles.loginForm}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="username">Username: </label>
                <input className={styles.input} type="text" id="username" name="username" />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="password">Password: </label>
                <input className={styles.input} type="password" id="password" name="password" />
            </div>
            <input className={styles.submit} type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login
