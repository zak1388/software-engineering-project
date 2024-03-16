import React from 'react'
import styles from "./sidebar.module.css"
import { HiHome } from "react-icons/hi2"
import { IoIosAirplane } from "react-icons/io"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { HiCalendarDays } from "react-icons/hi2"
import FDMLogo from "./fdmLogo.png"

function Sidebar() {
  return (
    <div className={styles.flexContainer}>
        {/* FDM Logo */}
        <section className={styles.mainLogo}>
            <img src={FDMLogo} alt="FDM logo"/>
        </section>
        <section className={styles.links}>
            {/* Home Link */}
            <div className={styles.separateLink}>
                <HiHome className={styles.linkIcon}/>
                <h2>Home</h2>
            </div>

            {/* Time Away Link*/}
            <div className={styles.separateLink}>
                <IoIosAirplane className={styles.linkIcon}/>
                <h2>Time Away</h2>
            </div>

            {/* Team Chat Link*/}
            <div className={styles.separateLink}>
                <HiChatBubbleLeftRight className={styles.linkIcon}/>
                <h2>Team Chat</h2>
            </div>

            {/* Calendar Link*/}
            <div className={styles.separateLink}>
                <HiCalendarDays className={styles.linkIcon}/>
                <h2>Calendar</h2>
            </div>


        </section>
    </div>


  )
}

export default Sidebar