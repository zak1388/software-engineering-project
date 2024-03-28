import React from 'react'
import styles from "./userInfo.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function userInfo() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                Stuff
            </div>
        </div>
      )
}

export default userInfo