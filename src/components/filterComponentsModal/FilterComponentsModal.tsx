import React from 'react'
import styles from "./filterComponentsModal.module.css"
import { IoMdClose } from "react-icons/io";

function FilterComponentsModal({ setModal }) {

    const component_list_string = localStorage.getItem("component_list")
    const component_list = JSON.parse(component_list_string)
    console.log(component_list)

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <IoMdClose onClick={() => setModal(false)} style={{ cursor: "pointer" }}/>
        </div>
        <div className={styles.components}>
            {Object.keys(component_list).map((component, i) => (
                <div className={styles.component}>
                    <p>{component}</p>
                    <input type="checkbox" defaultChecked={component_list[component]}/>
                </div>
            ))}
        </div>
        <div className={styles.button}>
            <button>Save</button>
        </div>
    </div>
  )
}

export default FilterComponentsModal