import React from 'react'
import styles from "./userInfo.module.css"
import { Outlet } from 'react-router-dom'
import { FaPencilAlt } from "react-icons/fa"

function userInfo() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.contact_panel}>
                    <div className={styles.title}>
                        <h1>Contact Information: </h1>
                        <button className={styles.edit_btn}>< FaPencilAlt size={20}/></button>
                    </div>
                    <div className={styles.address}></div>
                    <div className={styles.contact}></div>
                    <div className={styles.emergency_contact}></div>
                </div>
                <div className={styles.personal_info_panel}>
                <div className={styles.title}>
                        <h1>Personal Information: </h1>
                        <button className={styles.edit_btn}>< FaPencilAlt size={20}/></button>
                    </div>
                    <div className={styles.details}></div>
                    <div className={styles.office}></div>
                    <div className={styles.work_details}></div>
                </div>
            </div>
        </div>
      )
}

export default userInfo