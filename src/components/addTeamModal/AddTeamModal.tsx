import React, { useState, useEffect } from 'react'
import styles from "./addTeamModal.module.css"
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Axios from "axios"



function AddTeamModal({ setModal, teamClicked }) {
    const [name, setName] = useState<String>("")
    const [managers, setManagers] = useState([])
    const [filteredManagers, setFilteredManagers] = useState([])
    const [manager, setManager] = useState("")

    const addMember = async (teamId) => {
        await Axios.post("http://localhost:8000/api/addMember", {
            employeeId: manager,
            teamId: teamId
        })
    }

    const createTeam = async () => {
        await Axios.post("http://localhost:8000/api/createTeam", {
            name: name,
            manager: manager
        }).then((response) => {
            console.log(response)
            if(response.data){
                addMember(response.data._id)
                setModal(false)
            }
        })

    }

    const filterManagers = (e) => {
        const filter = e.target.value


        if(filter == ""){
            setFilteredManagers([])
        } else{
            const filteredData =  managers.filter((manager) => {
                return manager.email.includes(filter)
            })

            setFilteredManagers(filteredData)
        }
    }

    const selectManager = (managerId) => {
        setManager(managerId)
    }

    useEffect(() => {
        const getManagers = async () => {
            await Axios.get("http://localhost:8000/api/getManagers").then((response) => {
                console.log(response)
                setManagers(response.data)
            })
        }

        getManagers()


    }, [])


  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2>Create team</h2>
            <IoMdClose  style={{ cursor: "pointer" }} onClick={() => setModal(false)}/>
        </div>
        <div className={styles.teamNameInput}>
            <h4>Team name</h4>
            <input type="text" placeholder="Enter a team name..." onChange={((e) => setName(e.target.value))}/>
        </div>
        <div className={styles.members}>
            <h4>Managers</h4>
            <h6>chosen manager: {manager}</h6>
            <div className={styles.memberInput}>
                <CiSearch />
                <input className={styles.inputBox} type="text" placeholder='choose a manager' onChange={filterManagers}/>
            </div>

                {filteredManagers.map((manager, idx) => {
                    return (
                        <div className={styles.manager} onClick={() => selectManager(manager._id)}>
                            <div className={styles.left}>
                                <CgProfile />
                                <p>{manager.email}</p>
                            </div>
                        </div>
                    )
                })}
  
        </div>
        <div className={styles.buttons}>
            <p>Reset to default</p>
            <button onClick={createTeam}>Create team</button>
        </div>
    </div>
  )
}

export default AddTeamModal