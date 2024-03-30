import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "./TimeAway.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

function TimeAway () {
    const [leaves, setLeaves] = useState();

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveRequests", {
            params: { userId: localStorage.getItem("userId") }
        }).then(response => {
            console.log("Got leave requests as:", response);
            setLeaves(response);
        }, (err) => console.log("Failed to get leave reqs", err));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.NewButton}>
                <button className={styles.newRequest}>
                    <span>
                        New Request <TiPlus className={styles.plus} />
                    </span>
                </button>
            </div>
            <div className={styles.HolidayInfo}>
                <div className={styles.titles}>
                    <h2 className={styles.title}>Type</h2>
                    <h2 className={styles.title}>Grant (Days)</h2>
                    <h2 className={styles.title}>Approved</h2>
                    <h2 className={styles.title}>Remaining Days</h2>
                </div>
                <div className={styles.dataset}>
                    <h1 className={styles.data}>Holiday</h1>
                    <h1 className={styles.data}>25.0</h1>
                    <h1 className={styles.data}>2.0</h1>
                    <h1 className={styles.data}>23.0</h1>
                </div>
                <div className={styles.dataset}>
                    <h1 className={styles.data}>Holiday Carrying Over</h1>
                    <h1 className={styles.data}>0.0</h1>
                    <h1 className={styles.data}>0.0</h1>
                    <h1 className={styles.data}>0.0</h1>
                </div>
                <div className={styles.dataset}>
                    <h1 className={styles.data}>Sick Leave</h1>
                    <h1 className={styles.data}>N/A</h1>
                    <h1 className={styles.data}>1.0</h1>
                    <h1 className={styles.data}>N/A</h1>
                </div>
            </div>
            <Request 
                type="Holiday"
                start_date="Tuesday 19th March 2024"
                end_date="Tuesday 19th March 2024"
                accepted="true"
            />
            <Request 
                type="Holiday"
                start_date="Tuesday 29th March 2024"
                end_date="Tuesday 29th March 2024"
                accepted="{false}"
            />
        </div>
    )
}

function Request({type, start_date, end_date, accepted}) {
    return (
            <div className={styles.request}>
                <div>
                    <h3>Type</h3>
                    <h1>{type}</h1>
                </div>
                <div>
                    <h3>Start Date</h3>
                    <h1>{start_date}</h1>
                </div>

                <div>
                    <h3>End Date</h3>
                    <h1>{end_date}</h1>
                </div>

                <div className={styles.Accepted}>
                    <span>
                        {
                            accepted && <CiCircleCheck className={styles.AcceptedIcon}/> 
                            || <CiCircleRemove className={styles.AcceptedIcon}/>
                        }
                    </span>
                    <h1>
                        {
                            accepted && "Accepted"
                            || "Rejected"
                        }
                    </h1>
                </div>
            </div>
    );
}

export default TimeAway
