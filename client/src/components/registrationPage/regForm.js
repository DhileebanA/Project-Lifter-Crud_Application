import axios from "axios";
import React, { useState } from "react";
import './regForm.css'

export function Registration() {
    const [getDet, setVehDet] = useState([])
    var [getVeh, setVeh] = useState([false])

    var yes = () => {
        setVehDet('1')
        setVeh(getVeh = [true])
    }
    var no = () => {
        setVehDet([])
        setVeh(getVeh = [false])
    }

    function handlelogin(e) {
        e.preventDefault()
        var userName = document.getElementById("userName").value
        var userEmail = document.getElementById("userEmail").value
        var userPass = document.getElementById("userPass").value
        var userMob = document.getElementById("userMob").value
        var userAad = document.getElementById("userAad").value

        if (userName === '') {
            alert("Enter the Name")
        }
        else if (userEmail === '') {
            alert("Enter the Email address")
        }
        else if (userPass === '') {
            alert("Enter the Create Password")
        }
        else if (userMob === '') {
            alert("Enter the Mobile Number")
        }
        else if (userAad === '') {
            alert("Enter the Aadhaar Number")
        }
        else if (getVeh[0] == false) {
            let key = {
                userName: userName,
                userEmail: userEmail,
                userPass: userPass,
                userMob: userMob,
                userAad: userAad,
                getVeh: getVeh
            }
            axios.post("http://localhost:3009/insertUser", key)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("data are not inserted")

                        window.location.reload()
                    }
                    else if (res.data.status === "success") {
                        alert("data are inserted")
                        window.location.href = '/loginpage'
                    }
                })
        }
        else if (getVeh[0] == true) {
            if (userVehNo === '') {
                alert("Enter the Vehicle Number")
            }
            else if (userChNo === '') {
                alert("Enter the Chassis Number")
            }
            else if (userInNo === '') {
                alert("Enter the Insurance Number")
            }
            else {
                var userVehNo = document.getElementById("userVehNo").value
                var userChNo = document.getElementById("userChNo").value
                var userInNo = document.getElementById("userInNo").value
                let key = {
                    userName: userName,
                    userEmail: userEmail,
                    userPass: userPass,
                    userMob: userMob,
                    userAad: userAad,
                    userVehNo: userVehNo,
                    userChNo: userChNo,
                    userInNo: userInNo,
                    getVeh: getVeh
                }
                axios.post("http://localhost:3009/insertUser", key)
                    .then((res) => {
                        if (res.data.status === "error") {
                            alert("data are not inserted")
                            window.location.reload()
                        }
                        else if (res.data.status === "success") {
                            alert("data are inserted")
                            window.location.href = '/loginpage'
                        }
                    })
            }
        }
    }
    return (
        <div className="body  d-flex align-items-center">
            <div className="transBack container">
                <div className="container d-flex flex-column justify-content-center">
                    <h2 className="form-heading">Registration Form</h2>
                    <form onSubmit={handlelogin}>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="userName" placeholder="Name" />
                            <label className="form-label" for="userName">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="userEmail" placeholder="name@example.com" />
                            <label className="form-label" for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="userPass" placeholder="Password" />
                            <label className="form-label" for="userPass">Create Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="tel" pattern="[0-9]{10}" className="form-control" id="userMob" placeholder="1234567890" />
                            <label className="form-label" for="userMob">Mobile Number</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" pattern="[0-9]{12}" className="form-control" id="userAad" placeholder="123456789012" />
                            <label className="form-label" for="userAad">Aadhaar Number</label>
                        </div>
                        <div className="radio-group d-flex justify-content-center align-items-center">
                            <span className="form-label">Having Vehicle:</span>
                            <input type="radio" className="radio-input" name="options" id="option1" />
                            <label className="radio-label" for="option1" onClick={() => { yes() }}>Yes</label>
                            <input type="radio" className="radio-input" name="options" id="option2" checked />
                            <label className="radio-label" for="option2" onClick={() => { no() }}>No</label>
                        </div>
                        {getDet.length > 0 && (
                            <div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="userVehNo" placeholder="Vehicle Number" />
                                    <label className="form-label" for="userVehNo">Vehicle Number</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" pattern="[0-9]{5}" className="form-control" id="userChNo" placeholder="12345" />
                                    <label className="form-label" for="userChNo">Chassis Number</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" pattern="[0-9]{17}" className="form-control" id="userInNo" placeholder="12345678901234567" />
                                    <label className="form-label" for="userInNo">Insurance Number</label>
                                </div>
                            </div>
                        )}
                        <div className="btn-container">
                            <button type="submit" className="btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}