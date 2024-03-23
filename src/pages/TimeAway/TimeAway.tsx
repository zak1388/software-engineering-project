import React from 'react'
import styles from "./TimeAway.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function TimeAway () {
    return (
        <div className={styles.container}>
            <div>
                <button className={styles.newRequest}>New Request</button>
            </div>
            <div className={styles.request}>
                <div className={styles.titles}>
                    <h2 className={styles.title0}>Type</h2>
                    <h2 className={styles.title1}>Grant (Days)</h2>
                    <h2 className={styles.title1}>Approved</h2>
                    <h2 className={styles.title1}>Remaining Days</h2>
                </div>
                <div className={styles.dataset1}>
                    <h1 className={styles.data0}>Holiday</h1>
                    <h1 className={styles.data1}>25.0</h1>
                    <h1 className={styles.data2}>2.0</h1>
                    <h1 className={styles.data3}>23.0</h1>
                </div>
                <div className={styles.dataset2}>
                    <h1 className={styles.data4}>Holiday Carrying Over</h1>
                    <h1 className={styles.data5}>0.0</h1>
                    <h1 className={styles.data6}>0.0</h1>
                    <h1 className={styles.data7}>0.0</h1>
                </div>
                <div className={styles.dataset3}>
                    <h1 className={styles.data8}>Sick Leave</h1>
                    <h1 className={styles.data9}>N/A</h1>
                    <h1 className={styles.data10}>1.0</h1>
                    <h1 className={styles.data11}>N/A</h1>
                </div>
                
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
            <div className={styles.request3}>
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

                <div className={styles.Reject}>
                    <h1>Rejected </h1>
                </div>
            </div>
        </div>
    )
}

export default TimeAway