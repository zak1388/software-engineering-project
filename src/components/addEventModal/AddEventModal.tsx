import React, { useState } from 'react'
import styles from "./addEventModal.module.css"
import { IoMdClose } from "react-icons/io";
import Datetime from "react-datetime"


function AddEventModal({ setModal, onEventAdded }) {
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const confirmEvent = (event) => {
        event.preventDefault()

        onEventAdded({
            title,
            start,
            end
        })


    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <IoMdClose  style={{ cursor: "pointer" }} onClick={() => setModal(false)}/>
        </div>
        <div className={styles.event_details}>
            <div className={styles.event_detail}>
                <p>Title</p>
                <input type="text" value={title} placeholder='Title of your event...' onChange={((e) => setTitle(e.target.value))}/>
            </div>
            <div className={styles.dates}>
                <div className={styles.event_detail}>
                    <p>Start</p>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>
                <div className={styles.event_detail}>
                    <p>End</p>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>
            </div>
        </div>
        <button onClick={confirmEvent}>Confirm</button>
    </div>
  )
}

export default AddEventModal