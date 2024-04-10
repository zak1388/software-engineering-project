import React from 'react'
import styles from "./profileOptions.module.css"
import { useNavigate } from 'react-router-dom'

function ProfileOptions({ setModal }) {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")

    const routeProfile = () => {
        navigate(`/profile/${userId}`)
        setModal(false)
    }

    const attemptLogout = () => {
        navigate("/login")
        localStorage.clear()
    }

    const routeIssue = () => {
        navigate("/issue")
    }
    

  return (
    <div className={styles.container}>
        <div className={styles.item} onClick={routeProfile}>
            <p>Profile</p>
        </div>
        <div className={styles.item} onClick={routeIssue}>
            <p>Issues</p>
        </div>
        <div className={styles.item} onClick={attemptLogout}>
            <p>Logout</p>
        </div>
    </div>
  )
}

export default ProfileOptions