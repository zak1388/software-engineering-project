import React, { useDebugValue, useEffect, useState } from 'react'
import styles from "./profile.module.css"
import Sidebar from '../../../components/sidebar/Sidebar.tsx'
import Navbar from '../../../components/navbar/Navbar.tsx'
import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
import Axios from "axios"
import { FaPencilAlt } from 'react-icons/fa';

interface userDetails{
    first_name: String,
    last_name: String,
    email: String,
    address: String,
    personal_number: String,
    emergency_number: String,
    holiday_days: Number,
    office_location: String,
    gender: String,
    position: String,
    date_of_birth: String
}


function Profile() {
    const userId = localStorage.getItem("userId")
    const { id } = useParams()

    const [userDetails, setUserDetails] = useState<userDetails>()

    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const userId = id
            await Axios.get("http://localhost:8000/api/getProfile", {
                params: { userId }
            }).then((response) => {
                setUserDetails(response.data)
            })
        }

        getProfile()
    }, [id])

    function gotoEdit() {
        navigate(`/editprofile/${id}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.info_panel}>
                    <div className={styles.title}>
                        <h1>Personal Information: </h1>
                        {userId == id && <button onClick={gotoEdit} className={styles.edit_btn}>< FaPencilAlt size={20}/></button>}
                    </div>
                    <div className={styles.name}>
                        <p className={styles.ttl}>Details:</p>
                        <p className={styles.data}>
                            <p>{`First Name: ${userDetails?.first_name}`}</p>
                            <p>{`Last Name: ${userDetails?.last_name}`}</p>
                            <p>{`Date of Birth: ${new Date(userDetails?.date_of_birth).toLocaleDateString()}`}</p>
                        </p>
                    </div>
                    <div className={styles.office_loc}>
                        <p className={styles.ttl}>Office Location:</p>
                        <p className={styles.data}>
                            <p>{`${userDetails?.office_location}`}</p>
                        </p>
                    </div>
                    <div className={styles.work_details}>
                        <p className={styles.ttl}>Work Details:</p>
                        <p className={styles.data}>
                            <p>{`Position: ${userDetails?.position}`}</p>
                            <p>{`Holiday Days: ${userDetails?.holiday_days}`}</p>
                        </p>
                    </div>
                </div>
                <div className={styles.contact_panel}>
                    <div className={styles.title}>
                        <h1>Contact Information: </h1>
                        {userId == id && <button onClick={gotoEdit} className={styles.edit_btn}>< FaPencilAlt size={20}/></button>}
                    </div>
                    <div className={styles.address}>
                        <p className={styles.ttl}>Address:</p>
                        <p className={styles.data}>
                            <p>{`${userDetails?.address}`}</p>
                        </p>
                    </div>
                    <div className={styles.emcontact}>
                        <p className={styles.ttl}>Emergency Contact:</p>
                        <p className={styles.data}>
                            <p>{`Emergency Phone Number: ${userDetails?.emergency_number}`}</p>
                        </p>
                    </div>
                    <div className={styles.contact}>
                        <p className={styles.ttl}>Contact:</p>
                        <p className={styles.data}>
                            <p>{`E-mail: ${userDetails?.email}`}</p>
                            <p>{`Personal Tele: ${userDetails?.personal_number}`}</p>
                        </p>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Profile