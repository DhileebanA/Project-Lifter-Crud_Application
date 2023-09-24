import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './dashboard.css'
import Aos from "aos";
import 'aos/dist/aos.css'

export function Dashboard() {
    const [name, setName] = useState('')
    const [havVeh, setVeh] = useState('')
    const [getride, setride] = useState([])
    var { id } = useParams()
    //aos animation backage
    useEffect(()=>{
        Aos.init()
    },[])
    //get specific user from database
    useEffect(() => {
        fetch("http://localhost:3009/singleUser/" + id)
            .then(res => res.json())
            .then((data) => {
                setName(data[0].uname)
                setVeh(data[0].uvehicle)
            })
    })
    // get specific lifter details
    useEffect(() => {
        fetch("http://localhost:3009/lifterdet/" + id)
            .then(res => res.json())
            .then((data) => {
                data.length > 0 && setride([data[0].depfrom, data[0].depto, data[0].depdate, data[0].deptime])
            })
    })
    var delt = () => {
        var key = { id: id }
        axios.post("http://localhost:3009/deleteglift", key)
            .then((res) => {
                if (res.data.status === "error") {
                    alert("data are not deleted")
                    window.location.reload()
                }
                else if (res.data.status === "success") {
                    alert("data are deleted")
                    console.log(res.data.result)
                    window.location.reload()
                }
            })
    }
    return (
        <>
            <div className="bodyImg py-5">
                <div data-aos="zoom-in-up" className="container-fluid container-lg">
                    <div className="profile-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="name-color">Hi, {name} </h1>
                            <a href={`/update/${id}`} className="btn btn-info profile-button"> Update Profile</a>
                            <a href='/loginPage' className="btn btn-danger profile-button"> Log Out</a>
                        </div>
                        <h4>You're gonna</h4>
                        <div className="d-flex">
                            {havVeh !== null && (
                                <div>
                                    <a href={`/glift/${id}`} className="btn btn-primary ride-button"><i className="fas fa-car"></i> Give LIFT</a>
                                </div>
                            )}
                            <div>
                                <a href={`/tlift/${id}`} className="btn btn-primary ride-button"><i className="fas fa-hand-hitch"></i> Take LIFT</a>
                            </div>
                        </div>
                    </div>
                    {getride.length > 0 && (
                        <div data-aos="fade-right" data-aos-delay="100" className="ride-details">
                            <h3>Your Ride</h3>
                            <div className="row">
                                <div className="col-md-3">
                                    <h5>From</h5>
                                    <p>{getride[0]}</p>
                                </div>
                                <div className="col-md-3">
                                    <h5>To</h5>
                                    <p>{getride[1]}</p>
                                </div>
                                <div className="col-md-3">
                                    <h5>Date</h5>
                                    <p>{getride[2]}</p>
                                </div>
                                <div className="col-md-3">
                                    <h5>Time</h5>
                                    <p>{getride[3]}</p>
                                </div>
                            </div>
                            <button onClick={() => { delt() }} className="btn btn-danger ride-button"><i className="fas fa-times"></i> Cancel Ride</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}