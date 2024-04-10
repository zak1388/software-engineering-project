import React, { useState, useEffect } from 'react'
import Axios from "axios";
import styles from "./adminViewRequests.module.css"

import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import Request from "../../components/request/Request.tsx";

// Icons
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";

function AdminViewRequests() {
    const [showModal, setShowModal] = useState(false);
    const [modalRequest, setModalRequest] = useState();
    const [requests, setRequests] = useState([]);
    const [requestsRaw, setRequestsRaw] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetChangeRequests", { params: { userId: localStorage.getItem("userId") } })
        .then(req => req.data, console.error)
        .then(setRequestsRaw);
    }, []);

    useEffect(() => {
        const requests = requestsRaw.map(raw_req => Axios.post("http://localhost:8000/api/GetEmployeeById", { 
            params: { userId: raw_req.employee_id }
        }));
        Promise.all(requests)
        .then(reqs => reqs.map(req => req.data))
        .then(setEmployees, console.error);
    }, [requestsRaw]);

    useEffect(() => {
        const reqs = requestsRaw.map(req => {
            let employee = employees.find(emp => emp._id === req.employee_id);
            employee = employee || { first_name: "Unknown", last_name: "name" };
            const new_req = {employee, ...req};
            return new_req;
        });
        setRequests(reqs);
    }, [employees, requestsRaw]);

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.view_requests}>
                    <h1 className={styles.title}>Personal Information Change Requests</h1>
                    <RequestList requests={requests} setShowModal={setShowModal} setModalRequest={setModalRequest} />
                    {showModal && <ChangeModal setShowModal={setShowModal} request={modalRequest} />}
                </div>
            </div>
        </div>
    )
}

function ChangeModal({request, setShowModal}) {
    return (<div className={styles.popup}>
            <div className={styles.popup_content}>
                <div className={styles.popup_heading}>
                    <h1>{`${request.employee.first_name} ${request.employee.last_name}`} ({request.employee_id})</h1>
                    <IoCloseSharp className={styles.close_button} onClick={() => setShowModal(false)}/>
                </div>
                <h2>Request to change {request.type}</h2>
                <div className={styles.popup_description}>
                    <p>{request.from}</p>
                    <FaArrowRight />
                    <p>{request.to}</p>
                </div>
                <img src={request.proof} alt={`Proof for ${request.type} change request`} />
            </div>
        </div>
    );
}

function RequestList({requests, setShowModal, setModalRequest}) {
    return (
        <div className={styles.RequestList}>
            {
            requests.map((request) => (
                <ChangeRequest 
                    key={request._id}
                    request={request}
                    setShowModal={setShowModal}
                    setModalRequest={setModalRequest}
                />
            ))
            }
        </div>
    );
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
        Axios.post("http://localhost:8000/api/UpdateChangeRequest", {
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

function ChangeRequest({request, setShowModal, setModalRequest}) {
    const dateFormatter = new Intl.DateTimeFormat("en-GB", {weekday: "long", year: 'numeric', month: "long", day: "numeric"});

    const handleReadMore = () => {
        setModalRequest(request);
        setShowModal(true);
    };

    return (
        <Request>
            <div className={styles.employee_id}>
                <h3>Employee ID</h3>
                <h2>{request.employee_id}</h2>
            </div>
            <div className={styles.info_type}>
                <h3>Type</h3>
                <h2>{request.type}</h2>
            </div>
            <div className={styles.date_requested}>
                <h3>Date Requested</h3>
                <h2>{dateFormatter.format(new Date(request.date))}</h2>
            </div>
            <div className={styles.buttons}>
                <button className={styles.read_more_button} onClick={handleReadMore}>Read More</button>
                <StateButton request={request} />
            </div>
        </Request>
    );
}

export default AdminViewRequests
