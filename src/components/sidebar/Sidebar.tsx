import React from 'react'
import styles from "./sidebar.module.css"
import { HiHome } from "react-icons/hi2"
import { IoIosAirplane } from "react-icons/io"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { HiCalendarDays } from "react-icons/hi2"
import FDMLogo from "./fdmLogo.png"
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  const routePage = (link) => {
    navigate(`/${link}`)
  }

  return (
    <div className={styles.flexContainer}>
        {/* FDM Logo */}
        <section className={styles.mainLogo}>
            <img src={FDMLogo} alt="FDM logo"/>
        </section>
        <section className={styles.links}>
            {/* Home Link */}
            <div className={styles.separateLink} onClick={() => routePage("")}>
                <HiHome className={styles.linkIcon}/>
                <h2>Home</h2>
            </div>

            {/* Time Away Link*/}
            <div className={styles.separateLink} onClick={() => routePage("timeAway")}>
                <IoIosAirplane className={styles.linkIcon}/>
                <h2>Time Away</h2>
            </div>

            {/* Team Chat Link*/}
            <div className={styles.separateLink} onClick={() => routePage("teamChat")}>
                <HiChatBubbleLeftRight className={styles.linkIcon}/>
                <h2>Team Chat</h2>
            </div>

            {/* Calendar Link*/}
            <div className={styles.separateLink} onClick={() => routePage("calendar")}>
                <HiCalendarDays className={styles.linkIcon}/>
                <h2>Calendar</h2>
            </div>


        </section>
    </div>


  )
}

export default Sidebar