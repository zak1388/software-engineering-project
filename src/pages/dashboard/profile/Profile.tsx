import React, { useEffect, useState } from 'react'
import styles from "./profile.module.css"
import Sidebar from '../../../components/sidebar/Sidebar.tsx'
import Navbar from '../../../components/navbar/Navbar.tsx'
import { CgProfile } from "react-icons/cg";
import { useNavigate, useParams } from 'react-router-dom';
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
        <button onClick={gotoEdit}>Edit</button>
        
    )
}

export default Profile