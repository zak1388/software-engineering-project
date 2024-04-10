import React, { useState } from 'react';
import styles from "./TimeAwayRequest.module.css";
import { Form, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar.tsx';
import Navbar from '../../components/navbar/Navbar.tsx';
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function TimeAwayRequest({ setCreatingRequest }) {
    const [errors, setErrors] = useState([]);

    function cancelFunction() {
        setCreatingRequest(false);
    }

    function verifyForm(form) {
        const startDate = new Date(form.querySelector("." + styles.StartDate).value);
        const endDate = new Date(form.querySelector("." + styles.EndDate).value);

        let succeeded = true;
        let errors = [];

        // make sure fields arent empty
        for (let field of form) {
            if (field.nodeName === "BUTTON") {
                continue;
            } else if (field.className === styles.Comments) {
                continue;
            } else if (field.value === "") {
                errors.push(field.name + " cannot be empty");
                succeeded = false;
            }
        }
        
        // make sure dates aren't backwards or sth
        const d = new Date();
        const today = new Date(d.getFullYear(), d.getMonth(), d.getDay());
        if (startDate.valueOf() < today.valueOf()) {
            succeeded = false;
            errors.push("Start date cannot be in the past");
        }

        if (endDate.valueOf() < today.valueOf()) {
            succeeded = false;
            errors.push("End date cannot be in the past");
        }

        if (endDate.valueOf() < startDate.valueOf()) {
            succeeded = false;
            errors.push("End date cannot be before start date");
        } 

        setErrors(errors);
        return succeeded;
    }

    function submitFunction(event) {
        event.preventDefault();

        const form = event.target;
        const start = new Date(form.querySelector("." + styles.StartDate).value);
        const end = new Date(form.querySelector("." + styles.EndDate).value);
        const comments = form.querySelector("." + styles.Comments).value;
        const type = form.querySelector("." + styles.Type).value;

        if (!verifyForm(form)) {
            console.error("Failed to submit form");
            return false;
        }

        Axios.post("http://localhost:8000/api/CreateLeaveRequest", {
            params: { 
                id: localStorage.getItem("userId"), 
                start, 
                end, 
                type, 
                comments, 
                proof: "",
            }
        }).then(() => window.location.reload(), err => console.error("Failed to send CreateLeaveRequest post request", err));

    }

    return (
        <form className={styles.HolidayRequestForum} onSubmit={submitFunction}>
            <div className={styles.Errors}>
                { errors.map((err, i) => <p key={i}>{err}</p>) }
            </div>
            <div className={styles.DatesForHoliday}>
                <div className={styles.FormField}>
                    <h1>Start Date:</h1>
                    <input className={styles.StartDate} type="date" id="StartDate" name="Start Date" required />
                </div>
                <div className={styles.FormField}>
                    <h1>End Date:</h1>
                    <input className={styles.EndDate} type="date" id="EndDate" name="End Date" required />
                </div>
                <div className={styles.FormField}>
                    <h1>Type:</h1>
                    <select className={styles.Type} required>
                        <option default>Sick Leave</option>
                        <option>Holiday</option>
                        <option>Jury Duty</option>
                        <option>Maternity/Paternity/Adoption Leave</option>
                        <option>Dependent Leave</option>
                        <option>Bereavement</option>
                    </select>
                </div>
            </div>  
            <div>
                <h1>Comments:</h1>
                <textarea className={styles.Comments} cols={113} rows={3}></textarea>
            </div>
            <div className={styles.Buttons}>
                <button className={styles.CancelButton} onClick={cancelFunction}>Cancel</button>
                <input type="submit" className={styles.SubmitButton} value="Submit" />
            </div>
        </form>
    );
}

export default TimeAwayRequest;
