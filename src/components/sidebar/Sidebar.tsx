import React from 'react'
import styles from "./sidebar.module.css"
import { HiHome } from "react-icons/hi2"
import { IoIosAirplane } from "react-icons/io"

function Sidebar() {
  return (
    <div className={styles.gridContainer}>
        <div className={styles.logo}>
            <p>..Logo...</p>
        </div>
        <section className={styles.links}>
            {/* Home Link */}
            <div className={styles.homeLink}>
                <HiHome style={{ width: "2 em", height: "2 em" }}/>
                <h2>Home</h2>
            </div>

            {/* Time Away Link*/}
            <div>
                <IoIosAirplane style={{ width: "2 em", height: "2 em" }}/>
            </div>

            {/* Team Chat Link*/}
            <div>

            </div>

            {/* Calendar Link*/}
            <div>

            </div>


        </section>
    </div>


  )
}

export default Sidebar