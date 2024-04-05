import React, { useEffect, useState } from 'react'
import styles from "./teamChat.module.css"
import { CgProfile } from "react-icons/cg";
import Axios from "axios"

interface Team{
  _id: String
  team_id: String
}


interface CurrentChat{
  team: String
}

function TeamChat() {

  const userId = localStorage.getItem("userId")
  const firstName = localStorage.getItem("first_name")
  const lastName = localStorage.getItem("last_name")

  const [teams, setTeams] = useState([])
  const [currentChat, setCurrentChat] = useState<CurrentChat>([])
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    const teamId = currentChat[0].team
    // console.log(teamId)
    await Axios.post("http://localhost:8000/api/CreateTeamMessage", {
      firstName: firstName,
      lastName: lastName,
      sent_at:  Date.now(),
      message: message,
      userId: userId,
      teamId: teamId
    }).then((response) => {
      // console.log(response)
    })
  }

  
  const fetchMessages = async (teamId) => {
    await Axios.get("http://localhost:8000/api/GetTeamMessages", {
      params: { teamId }
    }).then((response) => {
      // console.log(response)
      setCurrentChat(response.data)
    })
  }


  useEffect(() => {
    const getTeams = async () => {
      await Axios.get("http://localhost:8000/api/getTeams", {
        params: { userId }
      }).then((response) => {
        // console.log(response)
        setTeams(response.data)
      })
    }

    getTeams()
  }, [])


  // useEffect(() => {
  //   fetchMessages(currentChat[0]?.team_id)
  // }, [sendMessage])

  return (
    <div className={styles.container}>
      <div className={styles.chat_sidebar}>
        <h4>Your chats</h4>
        <div className={styles.user_chats}>
          {teams.map((team: Team, idx) => {
            return (
              <div className={styles.user_chat} onClick={() => fetchMessages(team.team_id)}>
                <CgProfile style={{ fontSize: "30px" }}/>
                  <div className={styles.user_chat_details}>
                    <h6>{team._id}</h6>
                    <p>let's have a meeting</p>
                  </div>
              </div>
            )
          })}
          {/* <div className={styles.user_chat}>
            <CgProfile style={{ fontSize: "30px" }}/>
            <div className={styles.user_chat_details}>
              <h6>Your team</h6>
              <p>let's have a meeting</p>
            </div>
          </div> */}
        </div>
      </div>
      <div className={styles.chat_wrapper}>
        <div className={styles.header}>
          <h2>{currentChat[0]?.team}</h2>
        </div>
        <div className={styles.chat_messages}>
          {currentChat?.map((message, idx) => {
            return (
              <>
                {(message.sender == userId) ? (
                  <div className={styles.own_message}>
                    <div className={styles.own_message_content}>
                    <div className={styles.user_details}>
                        <p>You</p>
                        <p>{message.sent_at}</p>
                      </div>
                      <p>{message.message}</p>
                    </div>
                    <CgProfile style={{ fontSize: "30px" }}/>
                  </div>
                ) : (
                <div className={styles.message}>
                    <CgProfile style={{ fontSize: "30px" }}/>
                    <div className={styles.message_content}>
                      <div className={styles.user_details}>
                        <p>{message.first_name} {message.last_name}</p>
                        <p>{message.sent_at}</p>
                      </div>
                      <p>{message.message}</p>
                    </div>
                </div>
                )}
              
              </>
            )
          })}
        </div>
        <div className={styles.send_message}>
          <input type="text" placeholder='Type a message...' onChange={((e) => setMessage(e.target.value))}/>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default TeamChat