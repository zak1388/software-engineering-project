import React from 'react'
import styles from "./sidebar.module.css"
import { HiHome } from "react-icons/hi2"
import { IoIosAirplane } from "react-icons/io"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { HiCalendarDays } from "react-icons/hi2"
import FDMLogo from "./fdmLogo.png"
import { useNavigate } from 'react-router-dom'
import { GrUserManager } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";


function Sidebar() {
    const position = localStorage.getItem("position")
    const navigate = useNavigate()

    const routePage = (link) => {
        navigate(`/${link}`)

        let sidebar = document.getElementById("sidebar")

    }

    const closeSidebar = () => {
        let sidebar = document.getElementById("mobileSidebar")
        sidebar.style.display = "none"
    }

  return (
    <>
    <div className={styles.flexContainer} id="sidebar">
        {/* FDM Logo */}
        <div className={styles.header}>
            <IoMdClose className={styles.closeSidebar} onClick={closeSidebar}/>
        </div>
        <section className={styles.mainLogo}>
            <img src={FDMLogo} alt="FDM logo" className={styles.logoImage}/>
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

            {(position == "manager") && (
                <div className={styles.separateLink} onClick={() => routePage("managerViewRequests")}>
                    <FaCodePullRequest className={styles.linkIcon}/>
                    <h2>Requests</h2>
                </div>
            )}

            
            {(position == "admin") && (
                <>
                    <div className={styles.separateLink} onClick={() => routePage("manageUsers")}>
                        <FaUsers className={styles.linkIcon}/>
                        <h2>Users</h2>
                    </div>
                    <div className={styles.separateLink} onClick={() => routePage("manageTeams")}>
                        <RiTeamFill className={styles.linkIcon}/>
                        <h2>Teams</h2>
                    </div>
                    <div className={styles.separateLink} onClick={() => routePage("managerViewRequests")}>
                        <FaCodePullRequest className={styles.linkIcon}/>
                        <h2>Requests</h2>
                    </div>
                </>
            )}
        </section>
    </div>
    <div className={styles.mobileFlexContainer} id="mobileSidebar">
        {/* FDM Logo */}
        <div className={styles.header}>
            <IoMdClose className={styles.closeSidebar} onClick={closeSidebar}/>
        </div>
        <section className={styles.mainLogo}>
            <img src={FDMLogo} alt="FDM logo" className={styles.logoImage}/>
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

            {(position == "manager") && (
                <div className={styles.separateLink} onClick={() => routePage("")}>
                    <FaCodePullRequest className={styles.linkIcon}/>
                    <h2>Requests</h2>
                </div>
            )}

            {(position == "admin") && (
                <>
                    <div className={styles.separateLink} onClick={() => routePage("manageUsers")}>
                        <FaUsers className={styles.linkIcon}/>
                        <h2>Users</h2>
                    </div>
                    <div className={styles.separateLink} onClick={() => routePage("manageTeams")}>
                        <RiTeamFill className={styles.linkIcon}/>
                        <h2>Teams</h2>
                    </div>
                    <div className={styles.separateLink} onClick={() => routePage("")}>
                        <FaCodePullRequest className={styles.linkIcon}/>
                        <h2>Requests</h2>
                    </div>
                </>
            )}
        </section>
    </div>
    </>
  )
}

export default Sidebar
