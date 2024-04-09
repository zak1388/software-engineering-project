import React from 'react'
import styles from './AdminNotice.module.css'
import Form from "../../components/form/Form.tsx";
import Axios from "axios";

function AdminAnnouncement() {
    const submitHandler = (event) => {
        event.preventDefault();

        let title = event.target.title.value;
        let notice = event.target.notice.value;
        let urgent = event.target.urgent.value;

        Axios.post("http://localhost:8000/api/AdminPostNotice", {
            params: {
                userId: localStorage.getItem("userId"),
                title,
                notice,
                urgent,
            }
        }).then(() => window.location.pathname = "/", console.error);
    };

    return (
            <div className={styles.container}>
                <Form onSubmit={submitHandler} className={styles.AdminPost}>
                    <textarea className='Title' name="title" cols={70} rows={2} placeholder='Enter Title' required></textarea>
                    <select name="urgent">
                        <option value="false" default>Non-urgent</option>
                        <option value="true">Urgent</option>
                    </select>
                    <textarea className='Notice' name="notice" cols={70} rows={10} placeholder='Enter Announcement' required></textarea>
                    <input className={styles.submit} type="submit" value="Post Announcement" />
                </Form>
            </div>
    );
}
  
  export default AdminAnnouncement
