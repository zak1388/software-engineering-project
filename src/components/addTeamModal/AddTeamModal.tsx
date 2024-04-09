import React, { useState } from 'react'
import styles from "./addTeamModal.module.css"
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Axios from "axios"



function AddTeamModal({ setModal, teamClicked }) {
    const [name, setName] = useState<String>("")

    const createTeam = async () => {
        await Axios.post("http://localhost:8000/api/createTeam", {
            name: name
        }).then((response) => {
            console.log(response)
            if(response.data){
                setModal(false)
            }
        })
    }

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
        {/* <div className={styles.members}>
            <h4>Members</h4>
            <div className={styles.memberInput}>
                <CiSearch />
                <input className={styles.inputBox} type="text" placeholder='Add member by email' />
            </div>
        </div> */}
        <div className={styles.buttons}>
            <p>Reset to default</p>
            <button onClick={createTeam}>Create team</button>
        </div>
    </div>
  )
}

export default AddTeamModal