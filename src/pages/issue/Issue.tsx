import React from 'react'
import styles from "./issue.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function Issue() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
            <Navbar />
            <Outlet />
            <div className={styles.background}>
                <form className={styles.issueForm}>
                    <div>
                        <textarea className='Feedback' cols={70} rows={15} placeholder='Describe Issue'></textarea>
                    </div>
                    <input className={styles.submit} type="submit" value="Submit" />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Issue