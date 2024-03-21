import React from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

function Home() {
  return (
    <div className={styles.container}>
        {/* Filter/Adjustment Feature - allows selection of widgets*/}
        <HiMiniAdjustmentsHorizontal className={styles.filterIcon} />

        <div className={styles.widgetGrid}>
        </div>

    </div>
  )
}

export default Home