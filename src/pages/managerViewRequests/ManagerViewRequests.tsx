import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "../adminViewRequests/adminViewRequests.module.css"
import css from "./managerViewRequests.module.css"


import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

interface RawRequest {
    start: Date,
    end: Date,
    comment: String,
    active: Boolean,
    proof: String,
    requestor: String,
    type: String,
};

interface EmployeeRequest {
    start: Date,
    end: Date,
    comment: String,
    active: Boolean,
    proof: String,
    requestor: String,
    type: String,
    employee: {
        first_name: String,
        last_name: String,
    }
};

function ManagerViewRequests() {
    const [teamIds, setTeamIds] = useState([]);
    const [rawRequests, setRawRequests] = useState([]);
    const [requests, setRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalRequest, setModalRequest] = useState();

    useEffect(() => {
        Axios.get("http://localhost:8000/api/getUsersTeams", { params: { userId: localStorage.getItem("userId") }})
        .then(res => res.data, console.error)
        .then(empteams => empteams.map(empteam => empteam.team_id))
        .then(setTeamIds);
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetLeaveRequestsForTeam", {
            params: {
                userId: localStorage.getItem("userId"),
                teamIds: teamIds
            }
        })
        .then(res => res.data, console.error)
        .then(setRawRequests);
    }, [teamIds]);

    useEffect(() => {
        const employees_p = Promise.all(rawRequests.map(rawRequest => Axios.post("http://localhost:8000/api/GetEmployeeById", { params: { userId: rawRequest.requestor }}).then(res => res.data, console.error)));
        employees_p.then(setEmployees);
    }, [rawRequests]);

    useEffect(() => {
        const requests = rawRequests.map(rawRequest => {
            let employee = employees.find(emp => emp._id === rawRequest.requestor);
            employee = employee || {first_name: "Unknown", last_name: "employee"};
            return {
                employee,
                ...rawRequest
            };
        });
        setRequests(requests);
    }, [rawRequests, employees]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.view_requests}>
                <h1>Employee Holiday Requests</h1>
                {requests.map(request => <RequestSection key={request._id} request={request} setModalRequest={setModalRequest} setShowModal={setShowModal}/>)}
                {showModal && <ReadMoreModal setShowModal={setShowModal} request={modalRequest} />}
            </div>
        </div>
    )
}

function StateButton({request}) {
    let [dropdown, setDropdown] = useState();
    let [state, setState_p] = useState(request.state);

    let styling = "";
    let icon = (<></>);
    let text = state;

    if (state === "Approved") {
        styling = styles.approved_button;
        icon = (<AiOutlineCheck className={styles.button_icon}/>);
    } else if (state === "Rejected") {
        styling = styles.rejected_button;
        icon = (<AiOutlineClose className={styles.button_icon}/>);
    } else if (state === "Pending") {
        styling = styles.pending_button;
        icon = (<AiOutlineEllipsis className={styles.button_icon}/>);
    }

    const setState = (newState) => {
        setState_p(newState);
        Axios.post("http://localhost:8000/api/UpdateLeaveRequest", {
            params: {
                userId: localStorage.getItem("userId"),
                requestId: request._id,
                newState
            }
        }).catch(console.error);
    };


    const addDropdown = () => {
        setDropdown(
                <div className={styles.dropdown}>
                    <p onClick={() => setState("Approved")}>Accepted</p>
                    <p onClick={() => setState("Rejected")}>Rejected</p>
                    <p onClick={() => setState("Pending")}>Pending</p>
                </div>
        );
        setTimeout(() => document.addEventListener("click", removeDropdown, { once: true }));
    };

    const removeDropdown = (event) => {
        if (event.target !== document.querySelector("#StateButton")) 
            setDropdown();
    }

    const clickHandler = (event) => {
        addDropdown();
    };


    return (
        <>
            <button id="StateButton" onClick={clickHandler} className={styling}>
                {dropdown}
                {icon}
                {text}
            </button>
        </>
    );
}

function ReadMoreModal({setShowModal, request}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "short", year: 'numeric', month: "long", day: "numeric"});

    return (
        <div className={styles.popup}>
            <div className={styles.popup_content}>
                <div className={styles.popup_heading}>
                    <h1>{`${request.employee.first_name} ${request.employee.last_name} (${request.employee._id})`}</h1>
                    <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                </div>
                <h2>{request.type} Leave Request</h2>
                <h2>{`From ${dateFormatter.format(new Date(request.start))} to ${dateFormatter.format(new Date(request.end))}`}</h2>
                <div className={styles.popup_description}>
                    <p>{request.comment || "No comment."}</p>
                </div>
            </div>
        </div>
    );
}

function RequestSection({setShowModal, setModalRequest, request}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "short", year: 'numeric', month: "long", day: "numeric"});

    const handleReadMore = () => {
        setModalRequest(request);
        setShowModal(true);
    };

    return (
        <div className={styles.request_block}>
            <div className={css.employee_name}>
                <h3>Name</h3>
                <h2>{`${request.employee.first_name} ${request.employee.last_name}`}</h2>
            </div>
            <div className={css.leave_type}>
                <h3>Type of Leave</h3>
                <h2>{request.type}</h2>
            </div>
            <div className={css.start_to_end}>
                <h3>Start Date - End Date</h3>
                <div className={css.date_range}>
                    <span>{dateFormatter.format(new Date(request.start))}</span>
                    <span>to</span>
                    <span>{dateFormatter.format(new Date(request.end))}</span>
                </div>
            </div>
            <div className={styles.buttons}>
                <button className={styles.read_more_button} onClick={handleReadMore}>Read More</button>
                <StateButton request={request} />
            </div>
        </div>
    );
}

export default ManagerViewRequests
