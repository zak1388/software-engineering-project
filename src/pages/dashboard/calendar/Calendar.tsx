import React, { useState, useEffect, useRef } from 'react'
import styles from "./calendar.module.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from '../../../components/addEventModal/AddEventModal.tsx'

function Calendar() {
  const [modal, setModal] = useState(false)
  const calendarRef = useRef(null)

  const onEventAdded = event => {
    console.log(event)
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent(event)

  }

  return (
    <>
    <div className={styles.container}>
      <button onClick={() => setModal(true)}>Add event</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
        />
      </div>
    </div>
    {modal && <AddEventModal setModal={setModal} onEventAdded={event => onEventAdded(event)}/>}
    </>
  )
}

export default Calendar