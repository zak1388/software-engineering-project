import React from 'react'
import styles from "./dashboard.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function Dashboard() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
            <Navbar />
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard