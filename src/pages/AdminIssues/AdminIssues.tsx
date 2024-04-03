import React, { useState } from 'react'
import styles from "./AdminIssues.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

function AdminIssues () {
    const [showModal, setShowModal] = useState(false);

    const handleReadMoreClick = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <Navbar />
            <Outlet />
            <div className={styles.IssuesBundle}>
                <h1>Employee Issues</h1>
                <div className={styles.SingleIssue}>
                    <div className={styles.Name}>
                        <h3>Employee Name</h3>
                        <h1>Rochak Sharma</h1>
                    </div>
                    <div className={styles.Date}>
                        <h3>Date Raised</h3>
                        <h1>19th March 2024</h1>
                    </div>

                    <div className={styles.Brief}>
                        <h3>Brief</h3>
                        <h1>Cannot change emergency contact to a landline number.</h1> {/*should have a word limit when uploading*/}
                    </div>

                    {showModal && (
                        <div className={styles.Modal}>
                            <div className={styles.ModalContent}>
                                <div className={styles.ModalHeading}>
                                    <h1>Rochak Sharma (220563998)</h1>
                                    <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
                                </div>
                                <h2>Cannot change emergency contact to a landline number.</h2>
                                <p>Inability to update emergency contacts to landline numbers poses a potential safety risk. Consider revising database settings to accommodate landline entries for comprehensive emergency preparedness and employee safety.</p>
                            </div>
                        </div>
                    )}

                    <div className={styles.Buttons}>
                        <button className={styles.ReadMoreButton} onClick={() => handleReadMoreClick()}>Read More</button>
                        <button className={styles.DeleteButton}>Delete</button>
                    </div>

                </div>
                <div className={styles.SingleIssue}>
                    <div className={styles.Name}>
                        <h3>Employee Name</h3>
                        <h1>Donald Trump</h1>
                    </div>
                    <div className={styles.Date}>
                        <h3>Date Raised</h3>
                        <h1>30th January 2024</h1>
                    </div>

                    <div className={styles.Brief}>
                        <h3>Brief</h3>
                        <h1>Cannot win an election with this thing.</h1> {/*should have a word limit when uploading*/}
                    </div>

                    <div className={styles.Buttons}>
                        <button className={styles.ReadMoreButton}>Read More</button>
                        <button className={styles.DeleteButton}>Delete</button>
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default AdminIssues