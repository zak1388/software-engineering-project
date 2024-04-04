import React, { useState, useEffect } from 'react'
import styles from "./adminViewRequests.module.css"

import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";

function AdminViewRequests() {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Navbar />
                   {/* Admin View Requests Table */}
                <h1>Personal Information Change Requests</h1>
                <table>
                    <tr>
                        {/* Header Row */}
                        <th>User ID</th>
                        <th>Type</th>
                        <th>Date Requested</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>67892</td>
                        <td>Name</td>
                        <td>01-04-24</td>
                        <td>
                            <AiOutlineEllipsis />
                            <p>Pending</p>
                        </td>
                    </tr>
                    <tr>
                        <td>12345</td>
                        <td>Address</td>
                        <td>15-03-24</td>
                        <td>
                            <FcOk />
                            <p>Approved</p>
                        </td>
                    </tr>
                    <tr>
                        <td>73947</td>
                        <td>Date of Birth</td>
                        <td>04-03-24</td>
                        <td>
                            <AiOutlineClose />
                            <p>Rejected</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default AdminViewRequests