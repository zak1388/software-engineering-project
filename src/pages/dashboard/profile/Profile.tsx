import React, { useEffect, useState } from 'react'
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
    address: String
}


function Profile() {
    const savedUserId = localStorage.getItem("userId")
    const { id } = useParams()

    const [userDetails, setUserDetails] = useState<userDetails>()

    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            const userId = id
            await Axios.get("http://localhost:8000/api/getProfile", {
                params: { userId }
            }).then((response) => {
                // console.log(response)
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
                        <button onClick={gotoEdit} className={styles.edit_btn}>< FaPencilAlt size={20}/></button>
                    </div>
                    <div className={styles.name}>
                        <p className={styles.ttl}>Name:</p>
                        <p className={styles.data}>
                            <p>{`First Name: ${userDetails?.first_name}`}</p>
                            <p>{`Last Name: ${userDetails?.last_name}`}</p>
                        </p>
                    </div>
                    <div className={styles.contact}>
                        <p className={styles.ttl}>Contact:</p>
                        <p className={styles.data}>
                            <p>{`E-mail: ${userDetails?.email}`}</p>
                        </p>
                    </div>
                    <div className={styles.address}>
                        <p className={styles.ttl}>Address:</p>
                        <p className={styles.data}>
                            <p>{`${userDetails?.address}`}</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile