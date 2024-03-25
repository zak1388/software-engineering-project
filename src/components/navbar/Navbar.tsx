import React from 'react'
import styles from "./navbar.module.css"
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  return (
    <div className={styles.container}>
        <div className={styles.search}>
            <input type="text" placeholder="Search an employee..." />
            <CiSearch />
        </div>
        <section className={styles.profile}>
            <h5>John Smith</h5>
            <CgProfile className={styles.profilePic}/>
        </section>

    </div>
  )
}

export default Navbar