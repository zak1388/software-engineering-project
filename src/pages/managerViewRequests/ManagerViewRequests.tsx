import React, { useState, useEffect } from 'react'
import styles from "../adminViewRequests/adminViewRequests.module.css"
import css from "./managerViewRequests.module.css"


import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

function ManagerViewRequests() {
    const [showModal, setShowModal] = useState(false);

    const handleReadMoreClick = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.view_requests}>
                    <h1>Employee Holiday Requests</h1>
                    <div className={styles.request_block}>
                        {/* Employee Name */}
                        <div className={css.employee_name}>
                            <h3>Name</h3>
                            <h2>John Smith</h2>
                        </div>
                        {/* Type of Leave */}
                        <div className={css.leave_type}>
                            <h3>Type of Leave</h3>
                            <h2>Holiday</h2>
                        </div>
                        {/* Start Date - End Date */}
                        <div className={css.start_to_end}>
                            <h3>Start Date - End Date</h3>
                            <div className={css.date_range}>
                                <p>10/03/24</p>
                                <p>to</p>
                                <p>30/03/24</p>
                            </div>
                        </div>
                        {/* Read More - Popup */}
                        {showModal && (
                            <div className={styles.popup}>
                                <div className={styles.popup_content}>
                                    <div className={styles.popup_heading}>
                                        <h1>John Smith (67892)</h1>
                                        <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                                    </div>
                                    <h2>Holiday Leave Request</h2>
                                    <h2>10/03/24 to 30/03/24</h2>
                                    <div className={styles.popup_description}>
                                        <p>...description...</p>
                                    </div>
                                    <p className={css.date_request_submitted}>Request Submitted: 01/03/24</p>
                                </div>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.rejected_button}><AiOutlineClose className={styles.button_icon}/>Rejected</button>
                        </div>
                    </div>

                    <div className={styles.request_block}>
                        <div className={css.employee_name}>
                            <h3>Name</h3>
                            <h2>John Smith</h2>
                        </div>
                        <div className={css.leave_type}>
                            <h3>Type of Leave</h3>
                            <h2>Sick Leave</h2>
                        </div>
                        <div className={css.start_to_end}>
                            <h3>Start Date - End Date</h3>
                            <div className={css.date_range}>
                                <p>10/03/24</p>
                                <p>to</p>
                                <p>12/03/24</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.approved_button}><AiOutlineCheck className={styles.button_icon}/>Approved</button>
                        </div>
                    </div>

                    <div className={styles.request_block}>
                        <div className={css.employee_name}>
                            <h3>Name</h3>
                            <h2>Jane Doe</h2>
                        </div>
                        <div className={css.leave_type}>
                            <h3>Type of Leave</h3>
                            <h2>Holiday</h2>
                        </div>
                        <div className={css.start_to_end}>
                            <h3>Start Date - End Date</h3>
                            <div className={css.date_range}>
                                <p>01/04/24</p>
                                <p>to</p>
                                <p>10/04/24</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.pending_button}><AiOutlineEllipsis className={styles.button_icon}/>Pending</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerViewRequests