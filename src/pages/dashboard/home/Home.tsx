import React from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaRegCalendarMinus } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { PiFirstAidKitBold } from "react-icons/pi";

function Home() {
  return (
    <div className={styles.container}>


        <div className={styles.widgets_grid}>
            {/* Company Updates Widget */}
            <div className={styles.company_updates}>
                <div className={styles.updates_header}>
                    <h2>Company Updates</h2>
                    <h5 className={styles.new_updates}>2 new</h5>
                </div>
                <p className={styles.date}>25 March</p>
                <p className={styles.update_block}>Example Update</p>
                <p className={styles.update_block}>Another Update</p>
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
                <div className={styles.updates_header}>
                    <h2>Team Updates</h2>
                    <h5 className={styles.new_updates}>1 new</h5>
                </div>
            </div>

            {/* Days Off Set (includes days off, holiday and sick day balances) */}
            <div className={styles.days_off}>
                {/* Days Off */}
                <div className={styles.balance_block}>
                    <FaRegCalendarMinus className={styles.days_off_icon}/>
                    <h2>Days Off</h2>
                </div>

                {/* Holiday */}
                <div className={styles.balance_block}>
                    <GiIsland className={styles.days_off_icon}/>
                    <h2>Holiday</h2>
                </div>

                {/* Sick Days */}
                <div className={styles.balance_block}>
                    <PiFirstAidKitBold className={styles.days_off_icon}/>
                    <h2>Sick</h2>
                </div>
            </div>


        </div>

    </div>
  )
}

export default Home