import React from 'react'
import styles from "./dashboard.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import Login from './../login/Login.tsx';

function Dashboard() {
  const userId = localStorage.getItem("userId")

  return (
    <>
      {userId ? (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Navbar />
                <Outlet />
    
            </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default Dashboard