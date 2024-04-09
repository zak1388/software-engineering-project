import React, { useState }from 'react'
import styles from "./issue.module.css"
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar.tsx'
import Navbar from '../../components/navbar/Navbar.tsx'
import Axios from "axios";

const BriefCharacterLimit = 30;

function validateForm(form, setErrors) {
    const brief = form.querySelector("." + styles.Brief).value;
    const fullText = form.querySelector("." + styles.Feedback).value;

    let valid = true;
    let errors = [];
    if (brief === "") {
        errors.push("Brief cannot be empty.");
        valid = false;
    } else if (brief.length > BriefCharacterLimit) {
        errors.push(`Brief must be under ${BriefCharacterLimit} characters.`);
        valid = false;
    }
    if (fullText === "") {
        errors.push("Description cannot be empty.");
        valid = false;
    }
    setErrors(errors);
    return valid;
}

function Issue() {
    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();

        let valid = validateForm(e.target, setErrors);
        if (!valid) {
            return;
        }

        const brief = e.target.querySelector("." + styles.Brief).value;
        const fullText = e.target.querySelector("." + styles.Feedback).value;

        Axios.post("http://localhost:8000/api/CreateIssue", {
            params: {
                userId: localStorage.getItem("userId"),
                brief,
                fullText
            }
        }).then(() => window.location.pathname = "", console.error);
    };

  return (
        <div className={styles.container}>
            <form className={styles.issueForm} onSubmit={submitHandler}>
                <div className={styles.Errors}>
                    {
                        errors.map(error => <div>{error}</div>)
                    }
                </div>
                <input className={styles.Brief} type="text" placeholder="Brief - A short description" name="brief"/>
                <textarea className={styles.Feedback} placeholder='Describe Issue' name="fullText"></textarea>
                <input className={styles.submit} type="submit" value="Submit" />
            </form>
        </div>
  )
}

export default Issue
