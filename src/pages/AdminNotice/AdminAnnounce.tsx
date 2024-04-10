import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styles from './AdminNotice.module.css'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import Axios from "axios"

function AdminAnnouncement() {

    const type = localStorage.getItem("position")
    const [title, setTitle] = useState("")
    const [mainText, setMainText] = useState("")
    const creator = localStorage.getItem("userId")
    const [team, setTeam] = useState("")

    const navigate = useNavigate()

    const addNotice = async (e) => {
        e.preventDefault()

        await Axios.post("http://localhost:8000/api/createNotice", {
            type: type,
            title: title,
            mainText: mainText,
            date: Date(),
            creator: creator,
        }).then((response) => {
            console.log(response)
            if(response){
                navigate("/")
            }
        })
    }

    return (
          <div className={styles.container}>
              <form onSubmit={addNotice} className={styles.AdminPost}>
                <h2>Admin notice</h2>
                <div>
                      <textarea className='Title' cols={70} rows={2} placeholder='Enter Title' onChange={((e) => setTitle(e.target.value))} required={true}></textarea>
                  </div>
                  <div>
                      <textarea className='Notice' cols={70} rows={10} placeholder='Enter Announcement' onChange={((e) => setMainText(e.target.value))} required={true}></textarea>
                  </div>
                  <input className={styles.submit} type="submit" value="Post Announcement" />
              </form>
          </div>
    )
  }
  
  export default AdminAnnouncement
