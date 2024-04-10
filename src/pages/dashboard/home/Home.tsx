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
import { CgProfile } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";

import FilterComponentsModal from '../../../components/filterComponentsModal/FilterComponentsModal.tsx';
import Axios from "axios"
import Login from './../../login/Login.tsx';
import moment from 'moment';


function Home() {
  
  const userId = localStorage.getItem("userId")
  const [adminNoticeSpinner, setAdminNoticeSpinner] = useState(false)
  const [managerNoticeSpinner, setManagerNoticeSpinner] = useState(false)
  const [issueSpinner, setIssueSpinner] = useState(false)
  const [calendarSpinner, setCalendarSpinner] = useState(false)
  const [chatSpinner, setChatSpinner] = useState(false)

  const [modal, setModal] = useState(false)
  const [componentListState, setComponentListState] = useState({})

  const [adminUpdates, setAdminUpdates] = useState([])
  const [managerUpdates, setManagerUpdates] = useState([])
  const [teams, setTeams] = useState([])

  const [issues, setIssues] = useState([])

  const [todayEvents, setTodayEvents] = useState([])

  const [messages, setMessages] = useState([])

  const update_components = () => {
    // console.log("update components")
    // console.log(componentListState)
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
  
  useEffect(() => {
    // const fetch_components = async () => {
    //     await Axios.get("http://localhost:8000/api/getProfile", {
    //         params: { userId }
    //     }).then((response) => {
    //         console.log(response)
    //         setComponentListState(response.data.dashboard_model.components_list)
    //     })
    // }

    // fetch_components()
    // update_components()





    // update_components()

    const getTeams = async () => {
        await Axios.get("http://localhost:8000/api/getUsersTeams", {
          params: { userId }
        }).then((response) => {
          // console.log(response)
          setTeams(response.data)
          getNotices(response.data)
          getRecentMessages(response.data[response.data.length-1].team_id)

        }, console.error)
      }
  
      getTeams()

    const getNotices = async ( teams ) => {
        setAdminNoticeSpinner(true)
        setManagerNoticeSpinner(true)
        console.log(teams)
        await Axios.get("http://localhost:8000/api/getNotices", {
            params: { teams }
        }).then((response) => {
            // console.log(response.data)
            setAdminUpdates(response.data.adminNotices)
            setAdminNoticeSpinner(false)
            setManagerUpdates(response.data.managerNotices)
            setManagerNoticeSpinner(false)
        }, console.error)
    }

    const getRecentMessages = async (teamId) => {
        setChatSpinner(true)
        await Axios.get("http://localhost:8000/api/GetTeamMessages", {
            params: { teamId }
        }).then((response) => {
            // console.log(response)
            setMessages(response.data)
            setChatSpinner(false)
        }, console.error)
    }

    const getIssues = async () => {
        setIssueSpinner(true)
        await Axios.get("http://localhost:8000/api/getIssues").then((response) => {
            // console.log(response)
            setIssueSpinner(false)
            setIssues(response.data)
        }, console.error)
    }

    getIssues()

    const getTodayEvents = async () => {
        setCalendarSpinner(true)
        const start = moment(Date()).startOf('day').toISOString()
        const end = moment(Date()).endOf('day').toISOString()
        console.log("this runs")
        await Axios.get("http://localhost:8000/api/getEvents", {
            params: { userId, start, end }
        }).then((response) => {
            // console.log(response)
            setTodayEvents(response.data)
            setCalendarSpinner(false)
        }, console.error)
    }

    getTodayEvents()


}, [])

useEffect(() => {
    const fetch_components = async () => {
        await Axios.get("http://localhost:8000/api/getProfile", {
            params: { userId }
        }).then((response) => {
            console.log(response)
            setComponentListState(response.data.dashboard_model.components_list)
        }, console.error)
    }

    fetch_components()
    update_components()
}, [componentListState])

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
                                {adminNoticeSpinner ? (
                                    <ClipLoader color="#36d7b7" />

                                ) : (
                                    <>
                                {adminUpdates.length > 0 ? (
                                    <>

                                        {adminUpdates.map((update, idx) => {
                                            return (
                                                <div className={styles.update_block}>
                                                <p>{update.date}</p>
                                                <p>{update.title}</p>
                                                <p>{update.main_text}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <p>There are no company updates right now</p>
                                )}
                                    </>
                                )}
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
                                {issueSpinner ? (
                                    <ClipLoader color="#36d7b7" />

                                ) : (
                                    <>
                                {issues.length > 0 ? (
                                    <>
                                        {issues.map((issue, idx) => {
                                            return (
                                                <div className={styles.update_block}>
                                                    <p style={{ fontWeight: "bold", fontSize: "12px" }}>{issue.createdAt}</p>
                                                    <p style={{ fontWeight: "bold" }}>{issue.brief}</p>
                                                    <p>{issue.fullText}</p>
                                                </div>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <p>There are no admin issues right now</p>
                                )}
                                    </>
                                )}

                        </div>
                    </div>
                </div>
    
                <div className={styles.bottom} id="bottom">
                    {/* Team Chat Widget */}
                    <div className={styles.team_chat} id="team_chat">
                        <h2>Recent Team Chat</h2>
                        {chatSpinner ? (
                            <ClipLoader color="#36d7b7" />
                        ) : (
                            <div className={styles.chat_wrapper}>
                            {messages?.map((message, idx) => {
                                return (
                                <>
                                    {(message.sender == userId) ? (
                                    <div className={styles.own_message}>
                                        <div className={styles.own_message_content}>
                                        <div className={styles.user_details}>
                                            <p>You</p>
                                            <p>{message.sent_at}</p>
                                        </div>
                                        <p>{message.message}</p>
                                        </div>
                                        <CgProfile style={{ fontSize: "30px" }}/>
                                    </div>
                                    ) : (
                                    <div className={styles.message}>
                                        <CgProfile style={{ fontSize: "30px" }}/>
                                        <div className={styles.message_content}>
                                        <div className={styles.user_details}>
                                            <p>{message.first_name} {message.last_name}</p>
                                            <p>{message.sent_at}</p>
                                        </div>
                                        <p>{message.message}</p>
                                        </div>
                                    </div>
                                    
                                    )}
                                
                                </>
                                )
                            })} 
                            </div>
                        )}
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
                            {calendarSpinner ? (
                                <ClipLoader color="#36d7b7" />
                            ) : (
                                <>
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
                                </>
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
                        {managerNoticeSpinner ? (
                            <ClipLoader color="#36d7b7" />

                        ) : (
                            <>
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
                            </>
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
