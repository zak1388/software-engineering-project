import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "./TimeAway.module.css"
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import TimeAwayRequest from "./TimeAwayRequest.tsx";

function TimeAway () {
    const [requestsRaw, setRequestsRaw] = useState([]);
    const [responses, setResponses] = useState([]);
    const [requests, setRequests] = useState([]);
    const [holidayDays, setHolidayDays] = useState(0);
    const [sickDays, setSickDays] = useState(0);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveRequests", {
            params: { userId: localStorage.getItem("userId") }
        }).then(response => {
            setRequestsRaw(response.data);
        }, (err) => console.error("Failed to get leave requests (raw)", err));
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveResponses", {
            params: { userId: localStorage.getItem("userId") }
        }).then(response => {
            setResponses(response.data);
        }, (err) => console.error("Failed to get leave responses", err));
    }, []);

    useEffect(() => {
        const r = requestsRaw.map(request => {
                let response = responses.filter(response => Boolean(response)).find(response => request._id === response.request);
                if (response) {
                    request.accepted = response.approved;
                    request.response = response;
                }
                return request;
            }
        );
        setRequests(r);
    }, [requestsRaw, responses]);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetSickDays")
        .then((response) => {
            return response.data;
        })
        .then((sickDays) => setSickDays(sickDays));
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetHolidayDays")
        .then((response) => {
            return response.data;
        })
        .then((holidayDays) => setHolidayDays(holidayDays));
    });

    const approvedHolidayDays = (requests.reduce((acc, req) => {
        if (req.accepted && req.type === "Holiday") {
            return acc + (new Date(req.end) - new Date(req.start));
        } else 
            return 0;
    }, 0) / (24 * 60 * 60 * 1000)).toFixed(0);

    const approvedSickLeave = (requests.reduce((acc, req) => {
        if (req.accepted && req.type === "Sick") {
            return acc + (new Date(req.end) - new Date(req.start));
        } else 
            return 0;
    }, 0)).toFixed(0);

    let [creatingRequest, setCreatingRequest] = useState(false);

    function createRequest() {
        setCreatingRequest(true);
    }

    return (
        <div className={styles.container}>
            {
                !creatingRequest && 
                <div className={styles.NewButton}>
                    <button className={styles.newRequest} onClick={createRequest}>
                        <span>
                            New Request <TiPlus className={styles.plus} />
                        </span>
                    </button>
                </div>
            }
            <div className={styles.HolidayInfo}>
                <div className={styles.titles}>
                    <h2 className={styles.title}>Type</h2>
                    <h2 className={styles.title}>Grant (Days)</h2>
                    <h2 className={styles.title}>Approved</h2>
                    <h2 className={styles.title}>Remaining Days</h2>
                </div>
                <HolidayInfoRow
                    type="Holiday"
                    grant={holidayDays}
                    approved={approvedHolidayDays}
                    remaining={Math.max(holidayDays - approvedHolidayDays, 0)}
                />
                <HolidayInfoRow
                    type="Holiday Carrying Over"
                    grant="0"
                    approved="0"
                    remaining="0"
                />
                <HolidayInfoRow
                    type="Sick Leave"
                    grant={sickDays}
                    approved={approvedSickLeave}
                    remaining={Math.max(sickDays - approvedSickLeave, 0)}
                />
            </div>
            {
                (creatingRequest && <TimeAwayRequest setCreatingRequest={setCreatingRequest} />) ||
                <RequestList requests={requests} />
            }
        </div>
    )
}

function RequestList({requests}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "long", year: 'numeric', month: "long", day: "numeric"});
    return (
        <div className={styles.RequestList}>
            {
            requests.map((request) => (
                <Request 
                    key={request._id}
                    type={request.type}
                    start_date={dateFormatter.format(new Date(request.start))}
                    end_date={dateFormatter.format(new Date(request.end))}
                    accepted={request.accepted}
                    active={request.active}
                />
            ))
            }
        </div>
    );
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

function Request({type, start_date, end_date, accepted, active}) {
    return (
            <div className={styles.request}>
                <div className={styles.req_text}>
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
                </div>

                <div className={styles.Accepted}>
                    <span>
                        {
                            (accepted && <CiCircleCheck className={styles.AcceptedIcon}/>)
                            || (active && <CiCircleQuestion className={styles.AcceptedIcon}/>)
                            || <CiCircleRemove className={styles.AcceptedIcon}/>
                        }
                    </span>
                    <h1>
                        {
                            (accepted && "Accepted")
                            || (active && "Active")
                            || "Rejected"
                        }
                    </h1>
                </div>
            </div>
    );
}

export default TimeAway
