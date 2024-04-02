import React from 'react'
import styles from "./calendar.module.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Calendar() {
  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      />
    </div>
  )
}

export default Calendar