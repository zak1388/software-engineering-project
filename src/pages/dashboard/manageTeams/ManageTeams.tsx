import React, { useState, useEffect } from 'react'
import styles from "./manageTeams.module.css"
import AddTeamModal from '../../../components/addTeamModal/AddTeamModal.tsx'
import Axios from "axios"
import { IoIosAddCircle } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import TeamSettingsModal from '../../../components/teamSettingsModal/TeamSettingsModal.tsx';
import AddMemberModal from '../../../components/addMemberModal/AddMemberModal.tsx';

interface Team{
    name: String
}

function ManageTeams() {
    const [modal, setModal] = useState(false)
    const [teamSettingsModal, setTeamSettingsModal] = useState(false)
    const [addMembersModal, setAddMembersModal] = useState(false)
    const [teams, setTeams] = useState([])
    const [teamClicked, setTeamClicked] = useState()

    useEffect(() => {
        const getTeams = async () => {
            await Axios.get("http://localhost:8000/api/getTeams").then((response) => {
                // console.log(response)
                setTeams(response.data)
            })
        }

        getTeams()
    }, [])

    const openTeamSettings = (team) => {
        setTeamClicked(team)
        setTeamSettingsModal(true)
    }

    const openAddMembers = (team) => {
        setTeamClicked(team)
        setAddMembersModal(true)
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2>Teams</h2>
            <button className={styles.createTeam} onClick={() => setModal(true)}>Create team</button>
        </div>
        <div className={styles.teams}>
            {(teams.length > 0) ? (
                <>
                    {teams.map((team: Team, idx) => {
                        return (
                            <div className={styles.team}>
                                <div className={styles.teamName}>
                                    <span></span>
                                    <p>{team.name}</p>
                                </div>
                                <div className={styles.buttons}>
                                    <div className={styles.button} onClick={() => openTeamSettings(team)}>
                                        <IoSettingsSharp />
                                        <p>Settings</p>
                                    </div>
                                    <div className={styles.button} onClick={() => openAddMembers(team)}>
                                        <IoIosAddCircle />
                                        <p>Add member</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
            ) : (
                <p>There are no teams right now</p>
            )}
        </div>
        {modal && <AddTeamModal setModal={setModal}/>}
        {teamSettingsModal && <TeamSettingsModal setTeamSettingsModal={setTeamSettingsModal} teamClicked={teamClicked}/>}
        {addMembersModal && <AddMemberModal setAddMembersModal={setAddMembersModal} teamClicked={teamClicked}/>}
    </div>
  )
}

export default ManageTeams