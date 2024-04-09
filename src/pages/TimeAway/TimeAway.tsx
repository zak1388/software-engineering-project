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
    const [approvedHolidayDays, setApprovedHolidayDays] = useState([]);

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
                let response = responses.find(response => response && request._id === response.request);
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
        .then((response) => response.data, err => { 
            console.error(err);
            return -1;
        })
        .then((sickDays) => setSickDays(sickDays));
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetHolidayDays")
        .then((response) => response.data, err => { 
            console.error(err);
            return -1;
        })
        .then((holidayDays) => setHolidayDays(holidayDays));
    });

    useEffect(() => {
        const acceptedHolidayRequests = requests.filter(req => req && req.accepted && req.type === "Holiday");
        const acceptedHolidayPeriods = acceptedHolidayRequests.map(req => new Date(req.end) - new Date(req.start));
        const allHolidayPeriods = requests.reduce((acc, req) => acceptedHolidayPeriods, 0);
        const allHolidayDays = allHolidayPeriods / (24 * 60 * 60 * 1000);
        const noDecimal = allHolidayDays.toFixed(0);
        setApprovedHolidayDays(noDecimal);
    }, [requests]);

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
    return (
        <div className={styles.RequestList}>
            {
            requests.map((request) => (
                <Request 
                    key={request._id}
                    request={request}
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

function Request({request}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "long", year: 'numeric', month: "long", day: "numeric"});
    return (
            <div className={styles.request}>
                {console.log(request)}
                <div className={styles.req_text}>
                    <div>
                        <h3>Type</h3>
                        <h1>{request.type}</h1>
                    </div>
                    <div>
                        <h3>Start Date</h3>
                        <h1>{dateFormatter.format(new Date(request.start))}</h1>
                    </div>
                    <div>
                        <h3>End Date</h3>
                        <h1>{dateFormatter.format(new Date(request.end))}</h1>
                    </div>
                </div>

                <div onClick={() => alert(request._id)} className={styles.Accepted}>
                    <span>
                        {
                            (request.accepted && <CiCircleCheck className={styles.AcceptedIcon}/>)
                            || (request.active && <CiCircleQuestion className={styles.AcceptedIcon}/>)
                            || <CiCircleRemove className={styles.AcceptedIcon}/>
                        }
                    </span>
                    <h1>
                        {
                            (request.accepted && "Accepted")
                            || (request.active && "Active")
                            || "Rejected"
                        }
                    </h1>
                </div>
            </div>
    );
}

export default TimeAway
