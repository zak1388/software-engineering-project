import React, { useEffect, useState } from 'react'
import styles from "./editprofile.module.css"
import Sidebar from '../../../components/sidebar/Sidebar.tsx'
import Navbar from '../../../components/navbar/Navbar.tsx'
import { CgProfile } from "react-icons/cg";
import { useParams } from 'react-router-dom';
import Axios from "axios"

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
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        const getProfile = async () => {
            const userId = id
            await Axios.get("http://localhost:8000/api/getProfile", {
                params: { userId }
            }).then((response) => {
                //console.log(response)
                console.log(`saved UID: ${savedUserId}  ID: ${userId}`)
                setUserDetails(response.data)
            })
        }

        getProfile()
    }, [id])

    const updateProfile = async () => {
        const userId = id
        await Axios.post("http://localhost:8000/api/updateProfile", {
            userId: userId,
            first_name: firstName ? firstName : userDetails?.first_name,
            last_name: lastName ? lastName : userDetails?.last_name,
            email: email ? email : userDetails?.email,
            address: address ? address : userDetails?.address
        })
    }

    


  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.profile}>
                <div className={styles.profilePic}>
                    <CgProfile className={styles.profilePicIcon}/>
                </div>
                <div className={styles.userDetails}>
                    {savedUserId == id ? (
                        <div className={styles.inputs}>
                            <input type="text" placeholder={userDetails?.first_name} value={firstName} onChange={((e) => setFirstName(e.target.value))} />
                            <input type="text" placeholder={userDetails?.last_name}  value={lastName} onChange={((e) => setLastName(e.target.value))} />
                            <input type="text" placeholder={userDetails?.email} value={email} onChange={((e) => setEmail(e.target.value))} />
                            <input type="text" placeholder={userDetails?.address} value={address} onChange={((e) => setAddress(e.target.value))} />
                            <div className={styles.button}>
                                <button onClick={updateProfile}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.privateDetails}>
                            <div className={styles.detail}>
                                <p>{userDetails?.first_name}</p>
                            </div>
                            <div className={styles.detail}>
                                <p>{userDetails?.last_name}</p>
                            </div>
                            <div className={styles.detail}>
                                <p>{userDetails?.email}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button>Message</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile