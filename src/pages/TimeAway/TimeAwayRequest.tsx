import React from 'react';
import styles from "./TimeAwayRequest.module.css";
import { Form, Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar.tsx';
import Navbar from '../../components/navbar/Navbar.tsx';
import { TiPlus } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function TimeAwayRequest() {
    let navigate = useNavigate();
    function cancelFunction(){
        navigate("/TimeAway");
    }
    return (
        <div className={styles.container}>
            <div className={styles.HolidayInfo}>
                <div className={styles.titles}>
                    <h2 className={styles.title0}>Type</h2>
                    <h2 className={styles.title1}>Grant (Days)</h2>
                    <h2 className={styles.title1}>Approved</h2>
                    <h2 className={styles.title1}>Remaining Days</h2>
                </div>
                <div className={styles.dataset1}>
                    <h1 className={styles.HolidayTitle}>Holiday</h1>
                    <h1 className={styles.data1}>25.0</h1>
                    <h1 className={styles.data2}>2.0</h1>
                    <h1 className={styles.data3}>23.0</h1>
                </div>
                <div className={styles.dataset2}>
                    <h1 className={styles.HolidayCO}>Holiday Carrying Over</h1>
                    <h1 className={styles.data5}>0.0</h1>
                    <h1 className={styles.data6}>0.0</h1>
                    <h1 className={styles.data7}>0.0</h1>
                </div>
                <div className={styles.dataset3}>
                    <h1 className={styles.SickLeaveTitle}>Sick Leave</h1>
                    <h1 className={styles.data9}>N/A</h1>
                    <h1 className={styles.data10}>1.0</h1>
                    <h1 className={styles.data11}>N/A</h1>
                </div>
            </div>
            <div className={styles.HolidayRequestForum}>
                <div className={styles.DatesForHoliday}>
                    <div className={styles.FormField}>
                        <h1>Start Date:</h1>
                        <input className={styles.StartDate} type="date" id="StartDate" name="Start Date" />
                    </div>
                    <div className={styles.FormField}>
                        <h1>End Date:</h1>
                        <input className={styles.EndDate} type="date" id="EndDate" name="End Date" />
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
                <div>
                    <button className={styles.CancelButton} onClick={cancelFunction}>Cancel</button>
                    <button className={styles.SubmitButton}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default TimeAwayRequest;
