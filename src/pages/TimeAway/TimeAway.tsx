import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "./TimeAway.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";

function findResponseFor(request, responses) {
    return responses.find(response => response.request === request);
}

function TimeAway () {
    const [requests, setRequests] = useState([]);
    const [responses, setResponses] = useState([]);
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "long", year: 'numeric', month: "long", day: "numeric"});

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveRequests", {
            params: { userId: localStorage.getItem("userId") }
        }).then(response => {
            console.log("Got leave requests as:", response.data);
            setRequests(response.data);
        }, (err) => console.log("Failed to get leave requests", err));
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveResponses", {
            params: { userId: localStorage.getItem("userId") }
        }).then(response => {
            console.log("Got leave responses as:", response.data);
            setResponses(response.data);
        }, (err) => console.log("Failed to get leave responses", err));
    }, []);

    useEffect(() => {
        responses.forEach(response => {
                let request = requests.find(request => request._id === response.request);
                if (!request) return;
                request.accepted = response.approved;
            }
        );
    }, [requests, responses]);

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
                <HolidayInfoRow
                    type="Holiday"
                    grant="25.0"
                    approved="2.0"
                    remaining="23.0"
                />
                <HolidayInfoRow
                    type="Holiday Carrying Over"
                    grant="0"
                    approved="0"
                    remaining="0"
                />
                <HolidayInfoRow
                    type="Sick Leave"
                    grant="N/A"
                    approved="1.0"
                    remaining="N/A"
                />
            </div>
            {
                requests.map((request) => (
                    <Request 
                        key={request.id}
                        type={request.type}
                        start_date={dateFormatter.format(new Date(request.start))}
                        end_date={dateFormatter.format(new Date(request.end))}
                        accepted={request.accepted}
                    />
                ))
            }
        </div>
    )
}


function HolidayInfoRow({type, grant, approved, remaining}) {
    return (
        <div className={styles.dataset}>
            <h1 className={styles.data}>{type}</h1>
            <h1 className={styles.data}>{grant}</h1>
            <h1 className={styles.data}>{approved}</h1>
            <h1 className={styles.data}>{remaining}</h1>
        </div>
    );
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
