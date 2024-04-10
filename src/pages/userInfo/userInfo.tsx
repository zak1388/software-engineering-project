import React from 'react'
import styles from "./userInfo.module.css"
import { Outlet, useParams } from 'react-router-dom'
import { FaPencilAlt } from "react-icons/fa"

function UserInfo() {
    const {id} = useParams()
    const userId = localStorage.getItem("userId")

    console.log(userId, id)



    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.contact_panel}>
                    <div className={styles.title}>
                        <h1>Contact Information: </h1>
                        {userId === id && <button className={styles.edit_btn}>< FaPencilAlt size={20}/></button>}
                    </div>
                    <div className={styles.address}>
                        <p className={styles.ttl}>Address:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                    <div className={styles.contact}>
                        <p className={styles.ttl}>Contact:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                    <div className={styles.emergency_contact}>
                        <p className={styles.ttl}>Emergency Contact:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                </div>
                <div className={styles.personal_info_panel}>
                    <div className={styles.title}>
                        <h1>Personal Information: </h1>
                        {userId == id &&  <button className={styles.edit_btn}>< FaPencilAlt size={20}/></button>}
                    </div>
                    <div className={styles.details}>
                        <p className={styles.ttl}>Personal Details:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                    <div className={styles.office}>
                        <p className={styles.ttl}>Office Location:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                    <div className={styles.work_details}>
                        <p className={styles.ttl}>Work Details:</p>
                        <p className={styles.data}>sample sample sample</p>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default UserInfo