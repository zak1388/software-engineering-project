import React from 'react'
import styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate()

  const routePage = (link) => {
    navigate(`/${link}`)
  }
  
  const first_name = localStorage.getItem("first_name")
  const last_name = localStorage.getItem("last_name")
  const component_list = localStorage.getItem("component_list")
  console.log(JSON.stringify(component_list))

  return (
    <div className={styles.container}>
        <div className={styles.search}>
            <input type="text" placeholder="Search an employee..." />
            <CiSearch />
        </div>
        <section className={styles.profile}>
            <h5>{first_name} {last_name}</h5>
            <CgProfile onClick={() => routePage('userInfo')} className={styles.profilePic}/>
        </section>

    </div>
  )
}

export default Navbar