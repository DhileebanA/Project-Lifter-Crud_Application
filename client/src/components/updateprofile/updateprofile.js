import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../registrationPage/regForm.css'

export function UpdateProfile(){
    const[getDet,setVehDet]=useState([])
    var[getVeh,setVeh]=useState([false])
    var {id}=useParams()
    
    var yes=()=>{
        setVehDet('1')
        setVeh(getVeh=[true])
    }
    var no=()=>{
        setVehDet([])
        setVeh(getVeh=[false])
    }
    var {id}=useParams()
    const[uname,setuname]=useState('')
    const[uemail,setuemail]=useState('')
    const[upass,setupass]=useState('')
    const[umob,setumob]=useState('')
    const[uAadhar,setuAadhar]=useState('')
    const[userVehNo,setuserVehNo]=useState('')
    const[userChNo,setuserChNo]=useState('')
    const[userInNo,setuserInNo]=useState('')
    
    useEffect(()=>{
        fetch("http://localhost:3009/singleUser/"+id)
    .then(res=>res.json())
    .then((data)=>{
        setuname(data[0].uname)
        setuemail(data[0].uemail)
        setupass(data[0].upass)
        setumob(data[0].umob)
        setuAadhar(data[0].uAadhar)
        setuserVehNo(data[0].userVehNo)
        setuserChNo(data[0].userChNo)
        setuserInNo(data[0].userInNo)
    })
    },[])

    function handlelogin(e){
        e.preventDefault()
        var userName=document.getElementById("userName").value
        var userEmail=document.getElementById("userEmail").value
        var userPass=document.getElementById("userPass").value
        var userMob=document.getElementById("userMob").value
        var userAad=document.getElementById("userAad").value

        if(userName===''){
            alert("Enter the Name")
        }
        else if(userEmail===''){
            alert("Enter the Email address")
        }
        else if(userPass===''){
            alert("Enter the Create Password")
        }
        else if(userMob===''){
            alert("Enter the Mobile Number")
        }
        else if(userAad===''){
            alert("Enter the Aadhaar Number")
        }
        else if(getVeh[0]==false){
            let key={
                id:id,
                userName:userName,
                userEmail:userEmail,
                userPass:userPass,
                userMob:userMob,
                userAad:userAad,
                getVeh:getVeh
            }
            axios.put("http://localhost:3009/updateUser",key)
            .then((res)=>{
                if(res.data.status==="error"){
                    alert("data are not updated")
                    window.location.reload()
                }
                else if(res.data.status==="success"){
                    alert("data are updated")
                    window.location.href=`/dashboard/${id}`
                }
            })
        }
        else if(getVeh[0]==true){
            if(userVehNo===''){
                alert("Enter the Vehicle Number")
            }
            else if(userChNo===''){
                alert("Enter the Chassis Number")
            }
            else if(userInNo===''){
                alert("Enter the Insurance Number")
            }
            else{
                var userVehNo=document.getElementById("userVehNo").value
                var userChNo=document.getElementById("userChNo").value
                var userInNo=document.getElementById("userInNo").value
                let key={
                    id:id,
                    userName:userName,
                    userEmail:userEmail,
                    userPass:userPass,
                    userMob:userMob,
                    userAad:userAad,
                    userVehNo:userVehNo,
                    userChNo:userChNo,
                    userInNo:userInNo,
                    getVeh:getVeh
                }
                axios.put("http://localhost:3009/updateUser",key)
                .then((res)=>{
                    if(res.data.status==="error"){
                        alert("data are not updated")
                        window.location.reload()
                    }
                    else if(res.data.status==="success"){
                        alert("data are updated")
                        window.location.href=`/dashboard/${id}`
                    }
                })
            }
        }
    }
    return(
        <div className="body  d-flex align-items-center">
            <div className="transBack container">
                <div className="container d-flex flex-column justify-content-center">
                    <h2 className="form-heading">Update Form</h2>
                    <form onSubmit={handlelogin}>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="userName" placeholder="Name" onChange={(event)=>setuname(event.target.value)} value={uname} />
                            <label className="form-label" for="userName">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="userEmail" placeholder="name@example.com" onChange={(event)=>setuemail(event.target.value)} value={uemail} />
                            <label className="form-label" for="userEmail">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="userPass" placeholder="Password" onChange={(event)=>setupass(event.target.value)} value={upass} />
                            <label className="form-label" for="userPass">Create Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="tel" pattern="[0-9]{10}" className="form-control" id="userMob" placeholder="1234567890" onChange={(event)=>setumob(event.target.value)} value={umob} />
                            <label className="form-label" for="userMob">Mobile Number</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" pattern="[0-9]{12}" className="form-control" id="userAad" placeholder="123456789012" onChange={(event)=>setuAadhar(event.target.value)} value={uAadhar} />
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
                                    <input type="text" className="form-control" id="userVehNo" placeholder="Vehicle Number" onChange={(event)=>setuserVehNo(event.target.value)} value={userVehNo} />
                                    <label className="form-label" for="userVehNo">Vehicle Number</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" pattern="[0-9]{5}" className="form-control" id="userChNo" placeholder="12345" onChange={(event)=>setuserChNo(event.target.value)} value={userChNo} />
                                    <label className="form-label" for="userChNo">Chassis Number</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" pattern="[0-9]{17}" className="form-control" id="userInNo" placeholder="12345678901234567" onChange={(event)=>setuserInNo(event.target.value)} value={userInNo} />
                                    <label className="form-label" for="userInNo">Insurance Number</label>
                                </div>
                            </div>
                        )}
                        <div className="btn-container">
                            <button type="submit" className="btn-primary">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}