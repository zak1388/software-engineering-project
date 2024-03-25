import React from 'react'
import styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

function Navbar() {
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
            <CgProfile className={styles.profilePic}/>
        </section>

    </div>
  )
}

export default Navbar