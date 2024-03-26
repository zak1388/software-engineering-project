import React, { useState, useEffect } from 'react'
import styles from "./filterComponentsModal.module.css"
import { IoMdClose } from "react-icons/io";
import Axios from "axios"

function FilterComponentsModal({ setModal }) {
    const userId = localStorage.getItem("userId")
    // const component_list_string = localStorage.getItem("component_list")
    // const component_list = JSON.parse(component_list_string)
    const [componentListState, setComponentListState] = useState({})
    // console.log(component_list)

    const save_components = async () => {
        console.log(componentListState)
        
        await Axios.post("http://localhost:8000/api/filterHomeComponents", {
            userId: userId,
            components_list: componentListState
        }).then((response) => {
            console.log(response)
        })
    }

    const update_components = async (e, component) => {
        console.log(e.target.checked)
        setComponentListState(prev => ({
            ...prev,
            [component]: e.target.checked
        }))
    }

    useEffect(() => {
        const fetch_components = async () => {
            await Axios.get("http://localhost:8000/api/getProfile", {
                params: { userId }
            }).then((response) => {
                console.log(response)
                setComponentListState(response.data.dashboard_model.components_list)
            })
        }

        fetch_components()
    }, [])

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <IoMdClose onClick={() => setModal(false)} style={{ cursor: "pointer" }}/>
        </div>
        <div className={styles.components}>
            {Object.keys(componentListState).map((component, i) => (
                <div className={styles.component}>
                    <p>{component}</p>
                    <input type="checkbox" defaultChecked={componentListState[component]} onClick={((e) => update_components(e, component))}/>
                </div>
            ))}
        </div>
        <div className={styles.button}>
            <button onClick={save_components}>Save</button>
        </div>
    </div>
  )
}

export default FilterComponentsModal