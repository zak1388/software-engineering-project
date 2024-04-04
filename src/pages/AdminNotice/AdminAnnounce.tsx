import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './AdminNotice.module.css'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function AdminAnnouncement() {
    return (
          <div className={styles.container}>
              <form className={styles.AdminPost}>
                <div>
                      <textarea className='Title' cols={70} rows={2} placeholder='Enter Title'></textarea>
                  </div>
                  <div>
                      <textarea className='Notice' cols={70} rows={10} placeholder='Enter Announcement'></textarea>
                  </div>
                  <input className={styles.submit} type="submit" value="Post Announcement" />
              </form>
          </div>
    )
  }
  
  export default AdminAnnouncement