import React, { useState, useEffect } from 'react'
import styles from "./managerViewRequests.module.css"

import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";

function managerViewRequests() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Navbar />
            </div>
            <h1>Employee Holiday Requests</h1>
            <table>
                <tr>
                    {/* Header Row */}
                    <th>Employee</th>
                    <th>Date Request Submitted</th>
                    <th>Type of Leave Requested</th>
                    <th>Start Date - End Date</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>John Smith</td>
                    <td>01/03/24</td>
                    <td>Holiday</td>
                    <td>10/03/24 - 30/03/24</td>
                    <td>
                        <AiOutlineClose />
                        <p>Rejected</p>
                    </td>
                </tr>
                <tr>
                    <td>John Smith</td>
                    <td>10/03/24</td>
                    <td>Sick Leave</td>
                    <td>10/03/24 - 12/03/24</td>
                    <td>
                        <FcOk />
                        <p>Approved</p>
                    </td>
                </tr>
                <tr>
                    <td>Jane Doe</td>
                    <td>28/03/24</td>
                    <td>Holiday</td>
                    <td>01/04/24 - 10/04/24</td>
                    <td>
                        <AiOutlineEllipsis />
                        <p>Pending</p>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export