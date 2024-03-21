import React from 'react'
import styles from "./filterComponentsModal.module.css"
import { IoMdClose } from "react-icons/io";

function FilterComponentsModal({ setModal }) {
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <IoMdClose onClick={() => setModal(false)} style={{ cursor: "pointer" }}/>
        </div>
    </div>
  )
}

export default FilterComponentsModal