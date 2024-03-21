import React, { useState } from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import FilterComponentsModal from '../../../components/filterComponentsModal/FilterComponentsModal.tsx';

function Home() {
  const [modal, setModal] = useState(false)

  return (
    <div className={styles.container}>
        {/* Filter/Adjustment Feature - allows selection of widgets*/}
        <div className={styles.header}>
          <div className={styles.filter}>
            <HiMiniAdjustmentsHorizontal className={styles.filterIcon} onClick={() => setModal(true)}/>
            {modal && <FilterComponentsModal setModal={setModal}/>}
          </div>
        </div>

        <div className={styles.widgetGrid}>
        </div>

    </div>
  )
}

export default Home