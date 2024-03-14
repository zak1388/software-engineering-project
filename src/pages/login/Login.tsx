import React from 'react'
import styles from "./login.module.css";

// TODO: add header as component
// TODO: custom fonts

function Login() {
  return (
    <div className={styles.background}>
        <form className={styles.loginForm}>
            <div className={styles.field}>
                <label className={styles.label} for="username">Username: </label>
                <input className={styles.input} type="text" id="username" name="username" />
            </div>
            <div className={styles.field}>
                <label className={styles.label} for="passowrd">Password: </label>
                <input className={styles.input} type="password" id="passowrd" name="passowrd" />
            </div>
            <input className={styles.submit} type="submit" value="Login" />
        </form>
    </div>
  )
}

export default Login
