import React, { useState } from 'react'
import styles from "./Signup.module.css"
import fdmlogo from "./fdmIcon.png"
import Axios from "axios"
import { useNavigate } from 'react-router-dom'


function Signup() {
  const [username, setUsername] = useState<String>("")
  const [password, setPassword] = useState<String>("")
  
  const [firstName, setFirstName] = useState<String>("")
  const [lastName, setLastName] = useState<String>("")
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [gender, setGender] = useState<String>("")

  const [email, setEmail] = useState<String>("")
  const [personalNumber, setPersonalNumber] = useState<String>("")
  const [emergencyNumber, setEmergencyNumber] = useState<String>("")

  const [holidayDays, setHolidayDays] = useState<String>("")//dont need to set this in the form backend team will handle this, it is default for the whole company

  const [officeLocation, setOfficeLocation] = useState<String>("")
  const [position, setPosition] = useState<String>("")
  const [address, setAddress] = useState<String>("")

  const [first, setFirst] = useState(true)
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fourth, setFourth] = useState(false)


  const handleButtonClick = (sect, dir) => {

    if(sect === 1){
      const fn = document.getElementById("firstName") as HTMLInputElement
      const ln = document.getElementById("lastName") as HTMLInputElement
      const gender = document.getElementById("gender") as HTMLInputElement

      if(fn !== null && ln !== null && gender !== null){
        setFirstName(fn.value)
        setLastName(ln.value)
        setGender(gender.value)////for backend team: might want to make sure in correct form sample ("male") or ("female")
        setFirst(false)
        setSecond(true)
      }
    }
    else if(sect === 2){
      const email = document.getElementById("email") as HTMLInputElement
      const un = document.getElementById("username") as HTMLInputElement;
      const pw = document.getElementById("password") as HTMLInputElement;

      if(email !== null && un !== null && pw !== null){
        setEmail(email.value)
        setUsername(un.value)
        setPassword(pw.value)

        if(dir === 'n'){
          setSecond(false)
          setThird(true)
        }
        else{
          setSecond(false)
          setFirst(true)
        }
      }
    }
    else if(sect === 3){
      const dob = document.getElementById("dateOfBirth") as HTMLInputElement
      const phn = document.getElementById("personalNumber") as HTMLInputElement
      const ephn = document.getElementById("emergencyNumber") as HTMLInputElement

      if(dob !== null && phn !== null && ephn !== null){
        setDateOfBirth(new Date(dob.value))////for backend team: might want to make sure in correct format sample ("Sat Aug 08 2020 01:00:00 GMT+0100 (British Summer Time)")
        setPersonalNumber(phn.value)
        setEmergencyNumber(ephn.value)

        if(dir === 'n'){
          setThird(false)
          setFourth(true)
        }
        else{
          setThird(false)
          setSecond(true)
        }
      }
    }
    else if(sect === 4){
      const add = document.getElementById("address") as HTMLInputElement
      const oloc = document.getElementById("officeLocation") as HTMLInputElement
      const pos = document.getElementById("position") as HTMLInputElement

      if(add !== null && oloc !== null && pos !== null){
        setAddress(add.value)
        setOfficeLocation(oloc.value)
        setPosition(pos.value)

        if(dir === 'n'){
        //This button will submit the form, backend team from here.
        }
        else{
          setFourth(false)
          setThird(true)
        }
      }
    }
  };
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <img src={fdmlogo} alt="FDMLogo"/>
      </div>
        <form  className={styles.loginForm}>
          <div><h1>Create A New Account</h1></div>
            {first && (
              <>
                <div>
                  <label className={styles.label} htmlFor="firstName">First Name: </label>
                  <input className={styles.input} type="text" id="firstName" name="firstName" defaultValue={firstName.toString()}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="lastName">Last Name: </label>
                  <input className={styles.input} type="text" id="lastName" name="lastName" defaultValue={lastName.toString()}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="gender">Gender: </label>
                  <select className={styles.dropdown} name="gender" id="gender" defaultValue={gender.toString()}>
                    <option disabled selected value="">Select an option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x25BC;</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className={styles.progressBox}>
                  <div className={styles.progress1}>&nbsp;</div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.submit} onClick={() => handleButtonClick(1,'n')}>Next</button>
                </div>
              </>
            )}
            {second && (
              <>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">Email: </label>
                    <input className={styles.input} type="email" id="email" name="email" defaultValue={email.toString()}/>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="username">Username: </label>
                    <input className={styles.input} type="text" id="username" name="username" defaultValue={username.toString()}/>
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Password: </label>
                    <input className={styles.input} type="text" id="password" name="password" defaultValue={password.toString()}/>
                </div>
                <div className={styles.progressBox}>
                  <div className={styles.progress2}>&nbsp;</div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.submitP} onClick={() => handleButtonClick(2,'p')}>Prev</button>
                  <button className={styles.submit} onClick={() => handleButtonClick(2,'n')}>Next</button>
                </div>
              </>
            )}
            {third && (
              <>
                <div>
                  <label className={styles.label} htmlFor="dateOfBirth">Date Of Birth: </label>
                  <input className={styles.input} type="date" id="dateOfBirth" name="dateOfBirth" defaultValue={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="personalNumber">Personal Number: </label>
                  <input className={styles.input} type="tel" id="personalNumber" name="personalNumber" defaultValue={personalNumber.toString()}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="emergencyNumber">Emergency Number: </label>
                  <input className={styles.input} type="tel" id="emergencyNumber" name="emergencyNumber" defaultValue={emergencyNumber.toString()}/>
                </div>
                <div className={styles.progressBox}>
                  <div className={styles.progress3}>&nbsp;</div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.submitP} onClick={() => handleButtonClick(3,'p')}>Prev</button>
                  <button className={styles.submit} onClick={() => handleButtonClick(3,'n')}>Next</button>
                </div>
              </>
            )}
            {fourth && (
              <>
                <div>
                  <label className={styles.label} htmlFor="address">Address: </label>
                  <input className={styles.input} type="text" id="address" name="address" defaultValue={address.toString()}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="officeLocation">Office Location: </label>
                  <input className={styles.input} type="text" id="officeLocation" name="officeLocation" defaultValue={officeLocation.toString()}/>
                </div>
                <div>
                  <label className={styles.label} htmlFor="position">Position: </label>
                  <select className={styles.dropdown} name="position" id="position" defaultValue={position.toString()}>
                    <option className={styles.default} disabled selected value="">Select an option&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#x25BC;</option>
                    <optgroup label='Internal Staff'>
                      <option value="Internal Staff - Employee">Internal Staff - Employee</option>
                      <option value="Internal Staff - Manager">Internal Staff - Manager</option>
                    </optgroup>
                    <optgroup label='Consultants'>
                      <option value="Consultant - Ex Forces">Consultant - Ex Forces</option>
                      <option value="Consultant - Graduate Programme">Consultant - Graduate Programme</option>
                      <option value="Consultant - Returner">Consultant - Returner</option>
                    </optgroup>
                    <optgroup label='Admin'>
                      <option value="Admin">Admin</option>
                    </optgroup>
                  </select>
                </div>
                <div className={styles.progressBox}>
                  <div className={styles.progress4}>&nbsp;</div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.submitP} onClick={() => handleButtonClick(4,'p')}>Prev</button>
                  <button className={styles.submit} onClick={() => handleButtonClick(4,'n')}>Next</button>
                </div>
              </>
            )}
            {/* Get working error messages "required" in html tags is useless since buttons dont submit*/}
        </form>
    </div>
  )
}

export default Signup
