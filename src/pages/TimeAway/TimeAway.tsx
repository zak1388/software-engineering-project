import React from 'react'
import styles from "./TimeAway.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function TimeAway () {
    return (
        <div className={styles.container}>
            <div className={styles.request}>
            </div>
            <div className={styles.request2}>
                <div>
                    <h3>Type</h3>
                    <h1>Holiday</h1>
                </div>
                <div className={styles.StartDate}>
                    <h3>Start Date</h3>
                    <h1>Tuesday 19th March 2024</h1>
                </div>

                <div className={styles.EndDate}>
                    <h3>End Date</h3>
                    <h1>Tuesday 19th March 2024</h1>
                </div>

                <div className={styles.Accept}>
                    <h1>Approved</h1>
                </div>

            </div>
        </div>
    )
}

export default TimeAway