import React, { useState, useEffect } from 'react'
import styles from "./adminViewRequests.module.css"

import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

function AdminViewRequests() {
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
                    <h1>Personal Information Change Requests</h1>
                    <div className={styles.request_block}>
                        {/* Employee ID */}
                        <div className={styles.employee_id}>
                            <h3>Employee ID</h3>
                            <h2>67892</h2>
                        </div>
                        {/* Type of Info */}
                        <div className={styles.info_type}>
                            <h3>Type</h3>
                            <h2>Name</h2>
                        </div>
                        {/* Date Requested */}
                        <div className={styles.date_requested}>
                            <h3>Date Requested</h3>
                            <h2>1 April 2024</h2>
                        </div>
                        {/* Read More - Popup */}
                        {showModal && (
                            <div className={styles.popup}>
                                <div className={styles.popup_content}>
                                    <div className={styles.popup_heading}>
                                        <h1>John Smith (67892)</h1>
                                        <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                                    </div>
                                    <h2>Request to Change Last Name</h2>
                                    <div className={styles.popup_description}>
                                        <p>Smith</p>
                                        <FaArrowRight />
                                        <p>Doe</p>
                                    </div>
                                    <div>Proof Submitted...</div>
                                </div>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.pending_button}><AiOutlineEllipsis className={styles.button_icon}/>Pending</button>
                        </div>
                    </div>
                    <div className={styles.request_block}>
                        <div className={styles.employee_id}>
                            <h3>Employee ID</h3>
                            <h2>12345</h2>
                        </div>
                        <div className={styles.info_type}>
                            <h3>Type</h3>
                            <h2>Address</h2>
                        </div>
                        <div className={styles.date_requested}>
                            <h3>Date Requested</h3>
                            <h2>15 March 2024</h2>
                        </div>
                        {showModal && (
                            <div className={styles.popup}>
                                <div className={styles.popup_content}>
                                    <div className={styles.popup_heading}>
                                        <h1>Jane Doe (67892)</h1>
                                        <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                                    </div>
                                    <h2>Request to Change Address</h2>
                                    <div className={styles.popup_description}>
                                        <p>11, 123 Street, NW9 6AJ</p>
                                        <FaArrowRight />
                                        <p>5B, ...</p>
                                    </div>
                                    <div>Proof Submitted...</div>
                                </div>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.approved_button}><AiOutlineCheck className={styles.button_icon}/>Approved</button>
                        </div>
                    </div>
                    <div className={styles.request_block}>
                        <div className={styles.employee_id}>
                            <h3>Employee ID</h3>
                            <h2>73947</h2>
                        </div>
                        <div className={styles.info_type}>
                            <h3>Type</h3>
                            <h2>Date Of Birth</h2>
                        </div>
                        <div className={styles.date_requested}>
                            <h3>Date Requested</h3>
                            <h2>4 March 2024</h2>
                        </div>
                        {showModal && (
                            <div className={styles.popup}>
                                <div className={styles.popup_content}>
                                    <div className={styles.popup_heading}>
                                        <h1>Joel Johnson (73947)</h1>
                                        <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                                    </div>
                                    <h2>Request to Change Date of Birth</h2>
                                    <div className={styles.popup_description}>
                                        <p>20 June 1958</p>
                                        <FaArrowRight />
                                        <p>20 June 1962</p>
                                    </div>
                                    <div>Proof Submitted...</div>
                                </div>
                            </div>
                        )}
                        <div className={styles.buttons}>
                            <button className={styles.read_more_button} onClick={() => handleReadMoreClick()}>Read More</button>
                            <button className={styles.rejected_button}><AiOutlineClose className={styles.button_icon}/>Rejected</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminViewRequests