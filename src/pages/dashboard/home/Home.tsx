import React, { useState, useEffect } from 'react'
import styles from "./home.module.css"
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { FaRegCalendarMinus } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";
import { PiFirstAidKitBold } from "react-icons/pi";

import FilterComponentsModal from '../../../components/filterComponentsModal/FilterComponentsModal.tsx';
import Axios from "axios"
import Login from './../../login/Login.tsx';


function Home() {
  
  const userId = localStorage.getItem("userId")

  const [modal, setModal] = useState(false)
  const [componentListState, setComponentListState] = useState({})
  
  useEffect(() => {
    const fetch_components = async () => {
        await Axios.get("http://localhost:8000/api/getProfile", {
            params: { userId }
        }).then((response) => {
            // console.log(response)
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
                                <p className={styles.date}>25 March</p>
                                <p className={styles.update_block}>Example Update</p>
                                <p className={styles.update_block}>Another Update</p>
                            </div>
                        {/* </div>
                    </div>
     */}
                    <div className={styles.top_right}>
                        {/* Next Leave Widget */}
                        <div className={styles.next_leave_scheduled} id="next_leave_scheduled">
                            <h2>Next Scheduled Leave</h2>
                        </div>
    
                        {/* Admin Updates Widget */}
                        <div className={styles.admin_updates} id="admin_updates">
                            <h2>Admin Updates</h2>
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
                            <h2>Calendar</h2>
                        </div>
    
    
                        {/* Days Off Set (includes days off, holiday and sick day balances) */}
                        <div className={styles.days_off} id="days_off">
                            <div className={styles.days_off_wrapper}>
                                {/* Days Off */}
                                <div className={styles.balance_block}>
                                    <FaRegCalendarMinus className={styles.days_off_icon}/>
                                    <h2>Days Off</h2>
                                    <div>
                                        <b>1</b>
                                        <p>/6</p>
                                    </div>
                                </div> 
    
                                {/* Holiday */}
                                <div className={styles.balance_block}>
                                    <GiIsland className={styles.days_off_icon}/>
                                    <h2>Holiday</h2>
                                </div> 
    
    
                                {/* Sick Days */}
                                <div className={styles.balance_block}>
                                    <PiFirstAidKitBold className={styles.days_off_icon}/>
                                    <h2>Sick</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Team Updates Widget */}
    
                    {/* <div className={styles.team_updates}>
                        <div className={styles.updates_header}> */}
    
                    <div className={styles.team_updates} id="team_updates">
                        <div className={styles.updatesHeader}>
    
                            <h2>Team Updates</h2>
                            <h5 className={styles.new_updates}>1 new</h5>
                        </div>
                        </div>
                    {/* </div> */}
                    {/* </div> */}
    
                </div>
    
    
        </div>
    
        </div>
    
  )
}

export default Home