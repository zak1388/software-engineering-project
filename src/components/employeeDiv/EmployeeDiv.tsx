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

    const addMember = async (employee) => {
        await Axios.post("http://localhost:8000/api/addMember", {
            employeeId: employee._id,
            teamId: teamClicked._id
        }).then((response) => {
            console.log(response)
        })
    }


    useEffect(() => {
        const checkMemberAdded = async () => {
            const employeeId = employee._id
            const teamId = teamClicked._id
            await Axios.get("http://localhost:8000/api/checkMemberAdded", {
                params: { employeeId, teamId }
            }).then((response) => {
                // console.log(response)
                if(response.data.length > 0){
                    setAdded(true)
                } else{
                    setAdded(false)
                }
            })
        }

        checkMemberAdded()
    }, [addMember])

  return (
    <div className={styles.employee}>
        <div className={styles.left}>
            <CgProfile style={{ fontSize: "22px" }} />
            <p>{employee.email}</p>
            <span>{employee.position}</span>
        </div>
        <div className={styles.addButton}>
            {(added == true) ? (
                <>
                    <p>added</p>
                </>
            ) : (
                <>
                    <IoIosAddCircle />
                    <p onClick={() => addMember(employee)}>add</p>
                </>
            )}
        </div>
    </div>
  )
}

export default EmployeeDiv