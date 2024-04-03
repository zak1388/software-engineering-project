import React, { useState } from 'react'
import styles from "./AdminIssues.module.css"

function AdminIssues () {
    const [showModal, setShowModal] = useState(false);

    const handleReadMoreClick = () => {
        setShowModal(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.IssuesBundle}>
                <h1>Employee Issues</h1>
                <Issue name="Rochak Sharma" raisedOn="19th March 2024" brief="Cannot change emergency contact to a landline number"/>
                <Issue name="Donald Trump" raisedOn="30th January 2024" brief="Cannot win an election with this thing."/>
            </div>    
        </div>
    )
}

function Issue({name, raisedOn, brief, description}) {
    return (
        <div className={styles.SingleIssue}>
            <div className={styles.Name}>
                <h3>Employee Name</h3>
                <h1>{name}</h1>
            </div>
            <div className={styles.Date}>
                <h3>Date Raised</h3>
                <h1>{raisedOn}</h1>
            </div>

            <div className={styles.Brief}>
                <h3>Brief</h3>
                <h1>{brief}</h1> {/*should have a word limit when uploading*/}
            </div>

            <div className={styles.Buttons}>
                <button className={styles.ReadMoreButton}>Read More</button>
                <button className={styles.DeleteButton}>Delete</button>
            </div>
        </div>
    );
}

export default AdminIssues
