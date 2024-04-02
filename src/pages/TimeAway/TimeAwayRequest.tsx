import React from 'react';
import styles from "./TimeAwayRequest.module.css";
import { Form, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar.tsx';
import Navbar from '../../components/navbar/Navbar.tsx';
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function TimeAwayRequest({ setCreatingRequest }) {
    function cancelFunction() {
        setCreatingRequest(false);
    }

    return (
        <div className={styles.HolidayRequestForum}>
            <div className={styles.DatesForHoliday}>
                <div className={styles.FormField}>
                    <h1>Start Date:</h1>
                    <input className={styles.StartDate} type="text" id="StartDate" name="Start Date" />
                </div>
                <div className={styles.FormField}>
                    <h1>End Date:</h1>
                    <input className={styles.EndDate} type="text" id="EndDate" name="End Date" />
                </div>
                <div className={styles.FormField}>
                    <h1>Reason:</h1>
                    <input className={styles.Reason} type="text" id="Reason" name="Reason" />
                </div>
            </div>  
            <div>
                <h1>Comments:</h1>
                <textarea className={styles.Comments} cols={113} rows={3}></textarea>
            </div>
            <div className={styles.Buttons}>
                <button className={styles.CancelButton} onClick={cancelFunction}>Cancel</button>
                <button className={styles.SubmitButton}>Submit</button>
            </div>
        </div>
    );
}

export default TimeAwayRequest;
