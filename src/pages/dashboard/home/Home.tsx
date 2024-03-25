import React from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

function Home() {
  return (
    <div className={styles.container}>


        <div className={styles.widgetsGrid}>
            {/* Company Updates Widget */}
            <div className={styles.company_updates}>
                <div className={styles.updatesHeader}>
                    <h2>Company Updates</h2>
                    <h5 className={styles.newUpdates}>2 new</h5>
                </div>
                <p className={styles.date}>25 March</p>
                <p className={styles.updateBlock}>Example Update</p>
                <p className={styles.updateBlock}>Another Update</p>
            </div>

            {/* Next Leave Widget */}
            <div className={styles.next_leave_scheduled}>
                <h2>Next Scheduled Leave</h2>
            </div>

            {/* Admin Updates Widget */}
            <div className={styles.admin_updates}>
                <h2>Admin Updates</h2>
            </div>

            {/* Team Chat Widget */}
            <div className={styles.team_chat}>
                <h2>Team Chat</h2>
            </div>

            {/* Calendar Widget */}
            <div className={styles.calendar}>
                <h2>Calendar</h2>
            </div>

            {/* Team Updates Widget */}
            <div className={styles.team_updates}>
                <div className={styles.updatesHeader}>
                    <h2>Team Updates</h2>
                    <h5 className={styles.newUpdates}>1 new</h5>
                </div>
            </div>

            {/* Days Off Set (includes days off, holiday and sick day balances) */}
            <div className={styles.days_off}>
                {/* Days Off */}
                <div className={styles.balance_block}>
                    <h2>Days Off</h2>
                </div>

                {/* Holiday */}
                <div className={styles.balance_block}>
                    <h2>Holiday</h2>
                </div>

                {/* Sick Days */}
                <div className={styles.balance_block}>
                    <h2>Sick</h2>
                </div>
            </div>


        </div>

    </div>
  )
}

export default Home