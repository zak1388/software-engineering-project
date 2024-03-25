import React from 'react'
import styles from "./filterComponentsModal.module.css"
import { IoMdClose } from "react-icons/io";

function FilterComponentsModal({ setModal }) {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <IoMdClose onClick={() => setModal(false)} style={{ cursor: "pointer" }}/>
        </div>
        <div className={styles.components}>
            <div className={styles.component}>
                <p>Calendar</p>
                <input type="checkbox" defaultChecked={true}/>
            </div>
            <div className={styles.component}>
                <p>Calendar</p>
                <input type="checkbox" defaultChecked={true}/>
            </div>
            <div className={styles.component}>
                <p>Calendar</p>
                <input type="checkbox" defaultChecked={true}/>
            </div>
        </div>
        <div className={styles.button}>
            <button>Save</button>
        </div>
    </div>
  )
}

export default FilterComponentsModal