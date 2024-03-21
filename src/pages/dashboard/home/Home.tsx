import React from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";

function Home() {
  return (
    <div className={styles.container}>
        <HiMiniAdjustmentsHorizontal className={styles.filterIcon} />
    </div>
  )
}

export default Home