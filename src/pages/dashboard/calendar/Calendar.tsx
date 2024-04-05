import React, { useState, useEffect, useRef } from 'react'
import styles from "./calendar.module.css"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from '../../../components/addEventModal/AddEventModal.tsx'
import Axios from "axios"
import moment from "moment"

function Calendar() {
  const userId = localStorage.getItem("userId")
  const [modal, setModal] = useState(false)
  const calendarRef = useRef(null)
  const [events, setEvents] = useState([])

  const onEventAdded = event => {
    console.log(event)
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title
    })
  }

  const saveEvent = async (data) => {
    console.log(data)
    const start = data.event.start
    const end = data.event.end
    const title = data.event.title
    await Axios.post("http://localhost:8000/api/createEvent", {
      userId: userId,
      start: start,
      end: end,
      title: title
    }).then((response) => {
      console.log(response)
    })
  }

  const fetchEvents = async (data) => {
    const start = moment(data.start).toISOString()
    const end = moment(data.end).toISOString()
    await Axios.get("http://localhost:8000/api/getEvents", {
      params: { userId, start, end }
    }).then((response) => {
      console.log(response)
      setEvents(response.data)
    })
  }

  return (
    <div className={styles.container}>
      <button onClick={() => setModal(true)}>Add event</button>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          eventAdd={(event) => saveEvent(event)}
          datesSet={(date) => fetchEvents(date)}
          editable={true}
        />
      {modal && <AddEventModal setModal={setModal} onEventAdded={event => onEventAdded(event)}/>}
    </div>
  )
}

export default Calendar