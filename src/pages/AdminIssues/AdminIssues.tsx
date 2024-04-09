import React, { useState, useEffect } from 'react'
import styles from "./AdminIssues.module.css"
import Axios from "axios";

function AdminIssues () {
    const [showModal, setShowModal] = useState(false);
    const [modalIssue, setModalIssue] = useState();
    const [issues, setIssues] = useState([]);
    const [relevantEmployees, setRelevantEmployees] = useState([]);
    const [issuesWithEmployee, setIssuesWithEmployee] = useState([]);


    useEffect(() => {
        Axios.post("http://localhost:8000/api/GetIssues", { params: { userId: localStorage.getItem("userId") }})
        .then(response => response.data, console.error)
        .then(issues => setIssues(issues));
    }, []);

    useEffect(() => {
        let promisesAll = Promise.all(issues.map(issue => 
            Axios.post("http://localhost:8000/api/GetEmployeeById", { params: { userId: issue.creator }}) 
        ));
        promisesAll.then(employees_reqs => employees_reqs.map(req => req.data))
        .then((relevantEmployees) => setRelevantEmployees(relevantEmployees));
    }, [issues]);

    useEffect(() => {
        let issuesWithEmployee = issues.map(issue => ({
            employee: {
                first_name: "Couldn't find user",
                last_name: "",
            },
            ...issue
        }));

        issuesWithEmployee.forEach(issue => {
            let emp = relevantEmployees.find(emp => emp._id === issue.creator);
            if (emp) {
                issue.employee = emp;
            }
        });

        setIssuesWithEmployee(issuesWithEmployee);
    }, [issues, relevantEmployees]);


    return (
        <div className={styles.container}>
        {showModal && <IssueModal issue={modalIssue} setShowModal={setShowModal} />}
            <div className={styles.IssuesBundle}>
                <h1>Employee Issues</h1>
                {
                    issuesWithEmployee.map(issue => (<Issue 
                        key={issue._id} 
                        issue={issue} 
                        setShowModal={setShowModal} 
                        setModalIssue={setModalIssue}
                    />))
                }
            </div>    
        </div>
    )
}

function IssueModal({ issue, setShowModal }) {
    return (
        <div className={styles.Modal}>
            <div className={styles.ModalContent}>
                <div className={styles.ModalHeading}>
                    <h1>{`${issue.employee.first_name} ${issue.employee.last_name}`}</h1>
                    <h2>{issue.employee._id}</h2>
                    <span className={styles.close} onClick={() => setShowModal(false)}>&times;</span>
                </div>
                <h2>{issue.brief}</h2>
                <p className={styles.FullText}>{issue.fullText}</p>
            </div>
        </div>
   );
}

function Issue({ issue, setModalIssue, setShowModal }) {
    const dateFormat = new Intl.DateTimeFormat("en-UK", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const handleReadMoreClick = () => {
        setModalIssue(issue);
        setShowModal(true);
    };

    const handleDelete = async (event) => {
        Axios.post("http://localhost:8000/api/DeleteIssue", {
            params: { userId: localStorage.getItem("userId"), issueId: issue._id }
        }).then(() => event.target.closest("." + styles.SingleIssue).style.display = "none", console.error);
    }

    return (
        <div className={styles.SingleIssue}>
            <div className={styles.Name}>
                <h3>Employee Name</h3>
                <h1>{issue.employee.first_name + " " + issue.employee.last_name}</h1>
            </div>
            <div className={styles.Date}>
                <h3>Date Raised</h3>
                <h1>{dateFormat.format(new Date(issue.createdAt))}</h1>
            </div>

            <div className={styles.Brief}>
                <h3>Brief</h3>
                <h1>{issue.brief}</h1>
            </div>

            <div className={styles.Buttons}>
                <button className={styles.ReadMoreButton} onClick={handleReadMoreClick} >Read More</button>
                <button className={styles.DeleteButton} onClick={handleDelete} >Delete</button>
            </div>
        </div>
    );
}

export default AdminIssues
