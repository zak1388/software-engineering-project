import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './ManagerNotice.module.css'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import Axios from "axios"

function ManagerAnnouncement() {
    const userId = localStorage.getItem("userId")

    const type = localStorage.getItem("position")
    const [title, setTitle] = useState("")
    const [mainText, setMainText] = useState("")
    const [urgent, setUrgent] = useState("")
    const creator = localStorage.getItem("userId")
    const [team, setTeam] = useState("")
    const [teams, setTeams] = useState([])

    const addNotice = async (e) => {
        e.preventDefault()
        await Axios.post("http://localhost:8000/api/createNotice", {
            type: type,
            title: title,
            mainText: mainText,
            date: Date(),
            creator: creator,
            team: team

        }).then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        const getTeams = async () => {
            await Axios.get("http://localhost:8000/api/getTeams", {
                params: { userId }
            }).then((response) => {
                console.log(response)
                setTeams(response.data)
            })
        }

        getTeams()
    }, [])

    const updateSelectedTeam = (e) => {
        console.log(e.target.value)
        const option = e.target.value

        if(option == "select a team"){

        } else{
            setTeam(option)
        }
    }

    return (
          <div className={styles.container}>
              <form onSubmit={addNotice} className={styles.ManagerPost}>
              <h2>Admin notice</h2>
                <div>
                      <textarea className='Title' cols={70} rows={2} placeholder='Enter Title' onChange={((e) => setTitle(e.target.value))}></textarea>
                  </div>
                  <div>
                      <textarea className='Notice' cols={70} rows={10} placeholder='Enter Announcement' onChange={((e) => setMainText(e.target.value))}></textarea>
                  </div>
                  <select onChange={updateSelectedTeam}>
                    <option value="select a team">Select a team</option>
                    {teams.length > 0 ? (
                        <>
                            {teams.map((team, idx) => {
                                return (
                                    <option value={team._id}>{team.name}</option>
                                )
                            })}
                        </>
                    ) : (
                        <p>You don't manage any teams yet</p>
                    )}
                  </select>
                  <input className={styles.submit} type="submit" value="Post Announcement" />
              </form>
          </div>
    )
  }
  
  export default ManagerAnnouncement