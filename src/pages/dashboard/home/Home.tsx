import React from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

function Home() {
  return (
    <div className={styles.container}>
        {/* Filter/Adjustment Feature - allows selection of widgets*/}
        <div className={styles.iconRow}>
            <HiMiniAdjustmentsHorizontal className={styles.filterIcon} />
        </div>

        <div className={styles.widgetsGrid}>
            {/* Company Updates Widget */}
            <div className={styles.companyUpdatesWidget}>
                <div className={styles.updatesHeader}>
                    <h2>Company Updates</h2>
                    <h5 className={styles.newUpdates}>2 new</h5>
                </div>
                <p className={styles.date}>25 March</p>
                <p className={styles.updateBlock}>Example Update</p>
                <p className={styles.updateBlock}>Another Update</p>
            </div>

            {/* Next Leave Widget */}
            <div className={styles.nextLeaveWidget}>
                <h2>Next Scheduled Leave</h2>
            </div>

            {/* Admin Updates Widget */}
            <div className={styles.adminUpdatesWidget}>
                <h2>Admin Updates</h2>
            </div>

            {/* Team Chat Widget */}
            <div className={styles.teamChatWidget}>
                <h2>Team Chat</h2>
            </div>

            {/* Calendar Widget */}
            <div className={styles.calendarWidget}>
                <h2>Calendar</h2>
            </div>

            {/* Team Updates Widget */}
            <div className={styles.teamUpdatesWidget}>
                <div className={styles.updatesHeader}>
                    <h2>Team Updates</h2>
                    <h5 className={styles.newUpdates}>1 new</h5>
                </div>
            </div>

            {/* Days Off Widget */}
            <div className={styles.daysOffWidget}>
                <h2>Days Off</h2>
            </div>

            {/* Holiday Widget */}
            <div className={styles.holidayWidget}>
                <h2>Holiday</h2>
            </div>

            {/* Sick Days Balance Widget */}
            <div className={styles.sickDaysWidget}>
                <h2>Sick</h2>
            </div>
        </div>

    </div>
  )
}

export default Home