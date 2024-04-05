import React, { useState, useEffect } from 'react'
import styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import Axios from "axios"
import { useNavigate } from 'react-router-dom';
import ProfileOptions from '../profileOptions/ProfileOptions.tsx';
import { RxHamburgerMenu } from "react-icons/rx";


interface Employee{
  _id: String,
  first_name: String
}

function Navbar() {

  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const first_name = localStorage.getItem("first_name")
  const last_name = localStorage.getItem("last_name")

  const [employees, setEmployees] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const getEmployees = async () => {
      await Axios.get("http://localhost:8000/api/getEmployees").then((response) => {
        console.log(response)
        setEmployees(response.data)
      })
    }

    getEmployees()
  }, [])

  const searchFilter = (e) => {
    const wordEntered = e.target.value

    if(wordEntered == ""){
      setSearchResult([])
    } else{
      const filteredData = employees.filter((employee: Employee) => {
        return employee.first_name.includes(wordEntered)
      })
      setSearchResult(filteredData)
    }

  }

  const routeUser = (id) => {
    navigate(`/profile/${id}`)
  }

  const routeProfile = () => {
    navigate(`/profile/${userId}`)
  }

  const openSidebar = () => {
    let sidebar = document.getElementById("mobileSidebar")
    sidebar.style.display = "flex"
    sidebar.style.position = "absolute"
    sidebar.style.zIndex = "9999"
  }


  return (
    <div className={styles.container}>
        <RxHamburgerMenu className={styles.hamburger} onClick={openSidebar}/>
        <div className={styles.search}>
            <div className={styles.searchWrapper}>
              <input type="text" placeholder="Search an employee..." onChange={searchFilter}/>
              <CiSearch />
            </div>
            {searchResult && (
                <div className={styles.searchResult}>
                  {searchResult.map((employee: Employee, idx) => {
                    return (
                      <div className={styles.employee} onClick={() => routeUser(employee._id)}>
                        <p>{employee.first_name}</p>
                      </div>
                    )
                  })}
                </div>
            )}
        </div>
        <section className={styles.profile}>
            <h5>{first_name} {last_name}</h5>
            <div className={styles.profileMenu} onMouseEnter={() => setModal(true)} onMouseLeave={() => setModal(false)}>
              <CgProfile className={styles.profilePic} />
              {modal && <ProfileOptions setModal={setModal}/>}
            </div>
        </section>

    </div>
  )
}

export default Navbar