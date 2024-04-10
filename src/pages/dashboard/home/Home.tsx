import React, { useState, useEffect } from 'react'
import styles from "./home.module.css"

// Icons
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaRegCalendarMinus } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { PiFirstAidKitBold } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlaneDeparture } from "react-icons/fa";

import FilterComponentsModal from '../../../components/filterComponentsModal/FilterComponentsModal.tsx';
import Axios from "axios"
import Login from './../../login/Login.tsx';
import moment from 'moment';


function Home() {
  
  const userId = localStorage.getItem("userId")

  const [modal, setModal] = useState(false)
  const [componentListState, setComponentListState] = useState({})

  const [adminUpdates, setAdminUpdates] = useState([])
  const [managerUpdates, setManagerUpdates] = useState([])
  const [teams, setTeams] = useState([])

  const [issues, setIssues] = useState([])

  const [todayEvents, setTodayEvents] = useState([])
  
  useEffect(() => {
    const fetch_components = async () => {
        await Axios.get("http://localhost:8000/api/getProfile", {
            params: { userId }
        }).then((response) => {
            console.log(response)
            setComponentListState(response.data.dashboard_model.components_list)
        })
    }

    fetch_components()

    const update_components = () => {
      // console.log("update components")
      if(modal == false){
        for (let [key, value] of Object.entries(componentListState)){
            // console.log(key, value)
            let container: any = document.getElementById(`${key}`)
            if(value === false){
              container.style.display = "none"
            } else{
              container.style.display = "block"
            }
          }
      }


      let top: any = document.getElementById("top")
      let bottom_middle: any = document.getElementById("bottom_middle")
      let calendar: any = document.getElementById("calendar")
      let days_off: any = document.getElementById("days_off")
      let next_leave_scheduled: any = document.getElementById("next_leave_scheduled")
      let admin_updates: any = document.getElementById("admin_updates")


      if(calendar.style.display === "none" && days_off.style.display === "none"){
          bottom_middle.style.display = "none"
      } else{
          bottom_middle.style.display = "flex"
      }

    }

    update_components()

    const getTeams = async () => {
        await Axios.get("http://localhost:8000/api/getUsersTeams", {
          params: { userId }
        }).then((response) => {
          // console.log(response)
          setTeams(response.data)
          getNotices(response.data)

        })
      }
  
      getTeams()

    const getNotices = async ( teams ) => {
        console.log(teams)
        await Axios.get("http://localhost:8000/api/getNotices", {
            params: { teams }
        }).then((response) => {
            console.log(response.data)
            setAdminUpdates(response.data.adminNotices)
            setManagerUpdates(response.data.managerNotices)
        })
    }

    const getIssues = async () => {
        await Axios.get("http://localhost:8000/api/getIssues").then((response) => {
            // console.log(response)
            setIssues(response.data)
        })
    }

    getIssues()

    const getTodayEvents = async () => {
        const start = moment(Date()).startOf('day').toISOString()
        const end = moment(Date()).endOf('day').toISOString()
        console.log("this runs")
        await Axios.get("http://localhost:8000/api/getEvents", {
            params: { userId, start, end }
        }).then((response) => {
            console.log(response)
            setTodayEvents(response.data)
        })
    }

    getTodayEvents()


}, [])

  return (

        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.filter}>
                <HiMiniAdjustmentsHorizontal className={styles.filterIcon} onClick={() => setModal(true)}/>
                {modal && <FilterComponentsModal setModal={setModal}/>}
                </div>
            </div>
    
    
            <div className={styles.widgets_grid}>
                <div className={styles.top} id="top">
                    {/* Company Updates Widget */}
                  
                    {/* <div className={styles.company_updates}>
                        <div className={styles.updates_header}> */}
                            <div className={styles.company_updates} id="company_updates">
                                <div className={styles.updatesHeader}>
    
                                    <h2>Company Updates</h2>
                                    <h5 className={styles.new_updates}>2 new</h5>
                                </div>
                                {adminUpdates.map((update, idx) => {
                                    return (
                                        <div className={styles.update_block}>
                                           <p>{update.date}</p>
                                           <p>{update.title}</p>
                                           <p>{update.main_text}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        {/* </div>
                    </div>
     */}
                    <div className={styles.top_right}>
                        {/* Next Leave Widget */}
                        <div className={styles.next_leave_scheduled} id="next_leave_scheduled">
                            <h2>Next Scheduled Leave</h2>
                            <div className={styles.leave_detail}>
                                <FaPlaneDeparture className={styles.next_leave_icon} />
                                <p className={styles.leave_date}>Monday, 15 April</p>
                            </div>
                        </div>
    
                        {/* Admin Updates Widget */}
                        <div className={styles.admin_updates} id="admin_updates">
                            <div className={styles.updates_header}>
                                <h2>Admin Updates</h2>
                            </div>
                                {issues.map((issue, idx) => {
                                return (
                                    <div className={styles.update_block}>
                                        <p style={{ fontWeight: "bold", fontSize: "12px" }}>{issue.createdAt}</p>
                                        <p style={{ fontWeight: "bold" }}>{issue.brief}</p>
                                        <p>{issue.fullText}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
    
                <div className={styles.bottom} id="bottom">
                    {/* Team Chat Widget */}
                    <div className={styles.team_chat} id="team_chat">
                        <h2>Team Chat</h2>
                    </div>
    
                    <div className={styles.bottom_middle} id="bottom_middle">
                        {/* Calendar Widget */}
                        <div className={styles.calendar} id="calendar">
                            <div className={styles.calendar_header}>
                                {/* <IoIosArrowBack className={styles.calendar_icon}/>
                                <IoIosArrowForward className={styles.calendar_icon}/> */}
                                <h2>Today</h2>
                                <h2>, 02 April</h2>
                            </div>
                            {todayEvents.length > 0 ? (
                                <>
                                    {todayEvents.map((event, idx) => {
                                        return (
                                        <div className={styles.calendar_block}>
                                            <p>{event.start.slice(11, 19)}</p>
                                            <article className={styles.calendar_event}>
                                                <h4>{event.title}</h4>
                                                <p>{event.start.slice(11, 19)} - {event.end.slice(11, 19)}</p>
                                            </article>
                                        </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>You have no events for today!</p>
                            )}
                        </div>
    
    
                        {/* Days Off Set (includes days off, holiday and sick day balances) */}
                        <div className={styles.days_off} id="days_off">
                            <div className={styles.days_off_wrapper}>
                                {/* Days Off */}
                                <div className={styles.balance_block}>
                                    <FaRegCalendarMinus className={styles.days_off_icon}/>
                                    <h2>Days Off</h2>
                                    <div className={styles.separate_balance}>
                                        <b>1</b>
                                        <p>/6</p>
                                    </div>
                                </div> 
    
                                {/* Holiday */}
                                <div className={styles.balance_block}>
                                    <GiIsland className={styles.days_off_icon}/>
                                    <h2>Holiday</h2>
                                    <div className={styles.separate_balance}>
                                        <b>17</b>
                                        <p>/28</p>
                                    </div>
                                </div> 
    
    
                                {/* Sick Days */}
                                <div className={styles.balance_block}>
                                    <PiFirstAidKitBold className={styles.days_off_icon}/>
                                    <h2>Sick</h2>
                                    <div className={styles.separate_balance}>
                                        <b>10</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Team Updates Widget */}
    
                    {/* <div className={styles.team_updates}>
                        <div className={styles.updates_header}> */}
    
                    <div className={styles.team_updates} id="team_updates">
                        <div className={styles.updates_header}>
    
                            <h2>Team Updates</h2>
                            <h5 className={styles.new_updates}>1 new</h5>
                        </div>
                        {managerUpdates.length > 0 ? (
                            <>
                                {managerUpdates.map((content, idx) => {

                                    return (
                                        <div className={styles.update_block}>
                                            <p style={{ fontWeight: "bold", fontSize: "12px" }}>{content.team}</p>
                                            <p style={{ fontWeight: "bold" }}>{content.title}</p>
                                            <p>{content.main_text}</p>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <p>There are no updates from your managers</p>
                        )}



                        {/* <p className={styles.update_block}>lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse</p> */}
                    </div>
                    {/* </div> */}
                    {/* </div> */}
    
                </div>
    
    
        </div>
    
        </div>
    
  )
}

export default Home