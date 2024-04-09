import React, { useState, useEffect } from 'react'
import styles from "./addMemberModal.module.css"
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import Axios from "axios"
import EmployeeDiv from '../employeeDiv/EmployeeDiv.tsx';

interface Employee{
    first_name: String,
    last_name: String,
    position: String,
    email: String
}


function AddMemberModal({ setAddMembersModal, teamClicked }) {
    // console.log(teamClicked._id)

    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])

    useEffect(() => {
        const getEmployees = async () => {
            await Axios.get("http://localhost:8000/api/getEmployees").then((response) => {
                console.log(response)
                setEmployees(response.data)
              })
        }

        getEmployees()

    }, [])


    const filterEmployees = (e) => {
        let wordEntered = e.target.value
        
        if(wordEntered == ""){
            setFilteredEmployees([])
        } else{
            const filteredData = employees.filter((employee: Employee) => {
                return employee.email.includes(wordEntered)
            })
            setFilteredEmployees(filteredData)
        }
    }

    const addMember = async (employee) => {
        await Axios.post("http://localhost:8000/api/addMember", {
            employeeId: employee._id,
            teamId: teamClicked._id
        }).then((response) => {
            console.log(response)
        })
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2>Add member ~ {teamClicked.name}</h2>
            <IoMdClose  style={{ cursor: "pointer" }} onClick={() => setAddMembersModal(false)}/>
        </div>
        <div className={styles.members}>
            <div className={styles.memberInput}>
                <CiSearch />
                <input className={styles.inputBox} type="text" placeholder='Add member by email' onChange={filterEmployees}/>
            </div>
            <div className={styles.employees}>
                {filteredEmployees.map((employee: Employee, idx) => {
                    return (
                        // <div className={styles.employee}>
                        //     <div className={styles.left}>
                        //         <CgProfile style={{ fontSize: "22px" }} />
                        //         <p>{employee.email}</p>
                        //         <span>{employee.position}</span>
                        //     </div>
                        //     <div className={styles.addButton}>
                        //         <IoIosAddCircle />
                        //         <p onClick={() => addMember(employee)}>Add</p>
                        //     </div>
                        // </div>
                        <EmployeeDiv employee={employee} teamClicked={teamClicked}/>
                    )
                })}
            </div>
        </div>
        <div className={styles.button}>
            <button onClick={() => setAddMembersModal(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default AddMemberModal