import React, { useState, useEffect } from 'react'
import styles from "./teamSettingsModal.module.css"
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import Axios from "axios"

interface Employee{
    _id: String,
    first_name: String,
    last_name: String,
    position: String,
    email: String
}

function TeamSettingsModal({ setTeamSettingsModal, teamClicked }) {
    const [memberIds, setMemberIds] = useState([])
    const [members, setMembers] = useState([])
    const [name, setName] = useState("")

    const getEmployee = async (employeeId) => {
        const userId = employeeId
        await Axios.get("http://localhost:8000/api/getProfile", {
            params: { userId }
        }).then((response) => {
            setMembers(oldArray => [...oldArray, response.data])
        })
    }

    const removeMember = async (employeeId) => {
        await Axios.post("http://localhost:8000/api/removeFromTeam", {
            teamId: teamClicked._id,
            employeeId: employeeId
        }).then((response) => {
            console.log(response)
        })
    }

    const editTeamName = async () => {
        await Axios.post("http://localhost:8000/api/editTeamName", {
            teamId: teamClicked._id,
            name: name
        }).then((response) => {
            console.log(response)
        })
    }


    useEffect(() => {
        const getTeamMembers = async () => {
            const teamId = teamClicked._id
            await Axios.get("http://localhost:8000/api/getTeamMembers", {
                params: { teamId }
            }).then((response) => {
                console.log(response)
                for(let i=0; i<=response.data.length-1; i++){
                    getEmployee(response.data[i].employee_id)
                }
            })
        }
        getTeamMembers()

    }, [])

  return (
    <div className={styles.container}>
          <div className={styles.header}>
            <h2>Team settings</h2>
            <IoMdClose  style={{ cursor: "pointer" }} onClick={() => setTeamSettingsModal(false)}/>
        </div>
        <div className={styles.editName}>
            <h3>Edit team name</h3>
            <input type="text" placeholder={teamClicked.name} onChange={((e) => setName(e.target.value))}/>
        </div>
        <div className={styles.saveButton}>
                <button onClick={editTeamName}>Save</button>
            </div>
        <div className={styles.removeMember}>
            <h3>Find member to remove</h3>
            <div className={styles.memberInput}>
                <CiSearch />
                <input className={styles.inputBox} type="text" placeholder='Find member by email' />
            </div>
            <div className={styles.members}>
                {members.length > 0 ? (
                    <>
                        {members.map((member: Employee, idx) => {
                            return (
                                <div className={styles.employee}>
                                    <div className={styles.left}>
                                        <CgProfile style={{ fontSize: "22px" }} />
                                        <p>{member.email}</p>
                                        <span>{member.position}</span>
                                    </div>
                                    <div className={styles.removeButton} onClick={removeMember}>
                                        <button onClick={() => removeMember(member._id)}>Remove</button>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <p>There are no members in this team</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default TeamSettingsModal