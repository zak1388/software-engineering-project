import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "./TimeAway.module.css"
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import { AiOutlineEllipsis, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import TimeAwayRequestForm from "./TimeAwayRequest.tsx";
import Request from "../../components/request/Request.tsx";

function TimeAway () {
    const [requestsRaw, setRequestsRaw] = useState([]);
    const [responses, setResponses] = useState([]);
    const [requests, setRequests] = useState([]);
    const [holidayDays, setHolidayDays] = useState(0);
    const [sickDays, setSickDays] = useState(0);
    const [approvedHolidayDays, setApprovedHolidayDays] = useState([]);
    const [approvedSickDays, setApprovedSickDays] = useState([]);

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

    useEffect(() => {
        const acceptedSickRequests = requests.filter(req => req && req.accepted && req.type === "Sick");
        const acceptedSickPeriods = acceptedSickRequests.map(req => new Date(req.end) - new Date(req.start));
        const allSickPeriods = requests.reduce((acc, req) => acceptedSickPeriods, 0);
        const allSickDays = allSickPeriods / (24 * 60 * 60 * 1000);
        const noDecimal = allSickDays.toFixed(0);
        setApprovedSickDays(noDecimal);
    }, [requests]);
    let [creatingRequest, setCreatingRequest] = useState(false);

    function createRequest() {
        setCreatingRequest(true);
    }

    function deleteRequest(request) {
        // TODO: im getting lazy
        // Axios.post();
        setRequests(requests.filter(req => req._id !== request._id));
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
                    approved={approvedSickDays}
                    remaining={Math.max(sickDays - approvedSickDays, 0)}
                />
            </div>
            {
                (creatingRequest && <TimeAwayRequestForm setCreatingRequest={setCreatingRequest} />) ||
                <RequestList requests={requests} deleteRequest={deleteRequest} />
            }
        </div>
    )
}

function RequestList({requests, deleteRequest}) {
    return (
        <div className={styles.RequestList}>
            {
            requests.map((request) => (
                <TimeAwayRequest 
                    key={request._id}
                    request={request}
                    deleteRequest={deleteRequest}
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

function TimeAwayRequest({request, deleteRequest}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "long", year: 'numeric', month: "long", day: "numeric"});
    return (
            <Request>
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

                <StateButton request={request} deleteRequest={deleteRequest} />
            </Request>
    );
}

function StateButton({request, deleteRequest}) {
    let [dropdown, setDropdown] = useState();

    let icon = (<></>);
    let text = request.state;

    if (request.state === "Approved") {
        icon = (<AiOutlineCheck className={styles.button_icon}/>);
    } else if (request.state === "Rejected") {
        icon = (<AiOutlineClose className={styles.button_icon}/>);
    } else if (request.state === "Pending") {
        icon = (<AiOutlineEllipsis className={styles.button_icon}/>);
    }

    const addDropdown = () => {
        if (request.state !== "Pending" && request.state !== "Rejected") {
            return;
        }

        setDropdown(
                <div className={styles.dropdown}>
                    <p onClick={() => deleteRequest(request)}>Delete</p>
                </div>
        );
        setTimeout(() => document.addEventListener("click", removeDropdown, { once: true }));
    };

    const removeDropdown = (event) => {
        if (event.target !== document.querySelector("#StateButton") && request.state !== "Approved") 
            setDropdown();
    }

    const clickHandler = (event) => {
        addDropdown();
    };


    return (
        <>
            <button id="StateButton" onClick={clickHandler} className={styles.Accepted}>
                {dropdown}
                {icon}
                {text}
            </button>
        </>
    );
}

export default TimeAway
