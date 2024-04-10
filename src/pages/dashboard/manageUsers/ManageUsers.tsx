import React, { useState, useEffect } from 'react'
import styles from "./manageUsers.module.css"
import { FaUsers } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Axios from "axios"
import AddUserModal from '../../../components/addUserModal/AddUserModal.tsx';

interface Employee{
    _id: String,
    first_name: String,
    last_name: String,
    position: String
}

function ManageUsers() {

    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [employeeCount, setEmployeeCount] = useState(0)

    const [modal, setModal] = useState(false)

    const deleteUser = async (userId) => {
        await Axios.post("http://localhost:8000/api/deleteUser", {
            userId: userId
        }).then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        const getEmployees = async () => {
            await Axios.get("http://localhost:8000/api/getEmployees").then((response) => {
                // console.log(response)
                setEmployees(response.data)
              })
        }

        getEmployees()
    }, [deleteUser])

    const filterEmployees = (e) => {
        let wordEntered = e.target.value
        
        if(wordEntered == ""){
            setFilteredEmployees([])
        } else{
            const filteredData = employees.filter((employee: Employee) => {
                return employee.first_name.includes(wordEntered)
            })
            setFilteredEmployees(filteredData)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1>Manage employees</h1>
        </div>
        {/* <div className={styles.information}>
            <div className={styles.stats}>
                <div className={styles.statBox}>
                    <FaUsers style={{ fontSize: "30px" }}/>
                    <div className={styles.content}>
                        <h5>Total employees</h5>
                        <p>108</p>
                    </div>
                </div>
                <div className={styles.statBox}>
                    <FaUsers style={{ fontSize: "30px" }}/>
                    <div className={styles.content}>
                        <h5>Total employees</h5>
                        <p>108</p>
                    </div>
                </div>
                <div className={styles.statBox}>
                    <FaUsers style={{ fontSize: "30px" }}/>
                    <div className={styles.content}>
                        <h5>Total employees</h5>
                        <p>108</p>
                    </div>
                </div>
                <div className={styles.statBox}>
                    <FaUsers style={{ fontSize: "30px" }}/>
                    <div className={styles.content}>
                        <h5>Total employees</h5>
                        <p>108</p>
                    </div>
                </div>
            </div>
            <div className={styles.pendingRequests}>

            </div>
        </div> */}
        <div className={styles.users}>
            <div className={styles.usersHeader}>
                <div className={styles.search}>
                    <CiSearch />
                    <input type="text" placeholder='filter user by name' onChange={filterEmployees}/>
                </div>
                <button onClick={() => setModal(true)} className={styles.addUser}>Add user</button>
            </div>
            <div className={styles.usersTable}>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {filteredEmployees.length > 0 ? (
                        <>
                            {filteredEmployees.map((employee: Employee, idx) => {
                                return (
                                    <tr>
                                        <td>
                                            <div className={styles.employee}>
                                                <CgProfile /> 
                                                <p>{employee.first_name}</p>
                                                <p>{employee.last_name}</p>
                                            </div>
                                        </td>
                                        <td>{employee.position}</td>
                                        <td>test</td>
                                        <td>
                                            <button className={styles.deleteButton} onClick={() => deleteUser(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    ) : (
                        <>
                            {employees.map((employee: Employee, idx) => {
                                return (
                                    <tr>
                                        <td>
                                            <div className={styles.employee}>
                                                <CgProfile /> 
                                                <p>{employee.first_name}</p>
                                                <p>{employee.last_name}</p>
                                            </div>
                                        </td>
                                        <td>{employee.position}</td>
                                        <td>test</td>
                                        <td>
                                            <button className={styles.deleteButton} onClick={() => deleteUser(employee._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </>
                    )}
                </table>
            </div>
        </div>
        {modal && <AddUserModal setModal={setModal}/>}
    </div>
  )
}

export default ManageUsers