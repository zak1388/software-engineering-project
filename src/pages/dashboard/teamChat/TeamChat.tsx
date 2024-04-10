import React, { useEffect, useState } from 'react'
import styles from "./teamChat.module.css"
import { CgProfile } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [currentChat, setCurrentChat] = useState([])
  const [chosenTeam, setChosenTeam] = useState("")
  const [message, setMessage] = useState("")
  const [teamSpinner, setTeamSpinner] = useState(false)
  const [chatSpinner, setChatSpinner] = useState(false)

  const sendMessage = async () => {
    const teamId = chosenTeam
    // console.log(teamId)
    await Axios.post("http://localhost:8000/api/CreateTeamMessage", {
      firstName: firstName,
      lastName: lastName,
      sent_at:  Date.now(),
      message: message,
      userId: userId,
      teamId: teamId
    }).then((response) => {
      console.log(response)
    })
  }

  
  const fetchMessages = async (teamId) => {
    setChatSpinner(true)
    console.log(teamId)
    setChosenTeam(teamId)
    await Axios.get("http://localhost:8000/api/GetTeamMessages", {
      params: { teamId }
    }).then((response) => {
      // console.log(response)
      setCurrentChat(response.data)
      setChatSpinner(false)
    })
  }


  useEffect(() => {
    const getTeams = async () => {
      setTeamSpinner(true)
      await Axios.get("http://localhost:8000/api/getUsersTeams", {
        params: { userId }
      }).then((response) => {
        console.log(response)
        setTeams(response.data)
        setTeamSpinner(false)
      })
    }

    getTeams()
  }, [])


  // useEffect(() => {
  //   fetchMessages(chosenTeam)
  // }, [sendMessage])

  return (
    <>
      {teamSpinner ? (
        <ClipLoader color="#36d7b7" />
      ) : (
        <>
        {teams.length > 0 ? (
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
               {chosenTeam ? (
                <>
                  <div className={styles.header}>
                    <h2>{chosenTeam}</h2>
                  </div>
                    {chatSpinner ? (
                      <ClipLoader color="#36d7b7" />
                    ) : (
                      <>
                      {currentChat?.map((message, idx) => {
                        return (
                          <>
                          <div className={styles.chat_messages}>
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
                            </div>
                          
                          </>
                        )
                      })}
                      </>
                    )}
                      <div className={styles.send_message}>
                        <input type="text" placeholder='Type a message...' onChange={((e) => setMessage(e.target.value))}/>
                        <button onClick={sendMessage}>Send</button>
                      </div>
                </>
               ) : (
                <p>Pick a chat</p>
               )}
                {/* {currentChat ? (
                  <>
                {currentChat?.map((message, idx) => {
                  return (
                    <>
                    <div className={styles.chat_messages}>
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
                      </div>
                      <div className={styles.send_message}>
                        <input type="text" placeholder='Type a message...' onChange={((e) => setMessage(e.target.value))}/>
                        <button onClick={sendMessage}>Send</button>
                      </div>
                    
                     </>
                  )
                })}
                </>
              ) : (
                <p>Pick a chat</p>
              )} */}

           </div>
         </div>
      ) : (
        <p>You are currently not in any teams</p>
      )}
        </>
      )}

    </>
  )
}

export default TeamChat