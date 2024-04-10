import React, { useState, useEffect } from 'react'
import styles from "./employeeDiv.module.css"
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import Axios from "axios"

function EmployeeDiv({ employee, teamClicked }) {

    const [added, setAdded] = useState(false)

    const checkMemberAdded = async () => {
        const employeeId = employee._id
        const teamId = teamClicked._id
        await Axios.get("http://localhost:8000/api/checkMemberAdded", {
            params: { employeeId, teamId }
        }).then((response) => {
            // console.log(response)
            if(response.data.length > 0){
                setAdded(true)
                console.log("true")
            } else{
                setAdded(false)
                console.log("false")
            }
        })
    }

    const addMember = async (employee) => {
        await Axios.post("http://localhost:8000/api/addMember", {
            employeeId: employee._id,
            teamId: teamClicked._id
        }).then((response) => {
            console.log(response)
            checkMemberAdded()
        })
    }


    useEffect(() => {

        checkMemberAdded()
    }, [])

  return (
    <div className={styles.employee}>
        <div className={styles.left}>
            <CgProfile style={{ fontSize: "22px" }} />
            <p>{employee.email}</p>
            <span>{employee.position}</span>
        </div>
            {(added === true) ? (
                <>
                    <p>added</p>
                </>
            ) : (
                <div className={styles.addButton} onClick={() => addMember(employee)}>
                    <IoIosAddCircle />
                    <p>add</p>
                </div>
            )}
    </div>
  )
}

export default EmployeeDiv