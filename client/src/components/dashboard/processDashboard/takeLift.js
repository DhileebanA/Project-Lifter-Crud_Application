import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './tlift.css'
export function TakeLift() {
    const [getData, setData] = useState([])
    const [getTravel, setTravel] = useState([])
    var { id } = useParams()
    useEffect(() => {
        fetch('http://localhost:3009/getlifter')
            .then(res => res.json())
            .then(data => setData(data))
    })
    var getLifter = () => {
        getData.map((value, index) => {
            if (document.getElementById('lifterFrom').value == value.depfrom &&
                document.getElementById('lifterTo').value == value.depto &&
                document.getElementById('travelDate').value == value.depdate) {
                setTravel([value.gl_id, value.depfrom, value.depto, value.depdate, value.deptime, value.user_id])
            }
        })
        var from = document.getElementById('lifterFrom').value
        var to = document.getElementById('lifterTo').value
        var date = document.getElementById('travelDate').value
        var time = document.getElementById('travelTime').value
        var key = {
            from: from,
            to: to,
            date: date,
            time: time,
            id: id
        }
        axios.post('http://localhost:3009/insertglift', key)
            .then((res) => {
                if (res.data.status === "error") {
                    alert("data are not inserted")
                    window.location.reload()
                }
                else if (res.data.status === "success") {
                    alert("data are inserted")
                }
            })
    }
    return (
        <>
        <div className="body pt-5">
                <div id="container">
                    <h1 id="pageTitle">Find a Lift</h1>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="lifterFrom" placeholder="Place" />
                        <label for="lifterFrom" id="lifterFromLabel">From</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="lifterTo" placeholder="Place" />
                        <label for="lifterTo" id="lifterToLabel">To</label>
                    </div>
                    <div>
                        <div className="form-group">
                            <label for="travelDate" id="travelDateLabel">Travel Date</label>
                            <input type="date" id="travelDate" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="travelTime" id="travelTimeLabel">Departure Time</label>
                            <input type="time" id="travelTime" className="form-control" />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={()=>{getLifter()}} type="submit">Lift</button>                    {getTravel.length>0 && (<div id="result">
                        <h3 id="resultHeading" className="text-success">Available Lift</h3>
                        <h5 id="resultFrom">From : <span>{getTravel[1]}</span></h5>
                        <h5 id="resultTo">To : <span>{getTravel[2]}</span></h5>
                        <h5 id="resultDate">Date : <span>{getTravel[3]}</span></h5>
                        <h5 id="resultTime">Time : <span>{getTravel[4]}</span></h5>
                        <a href={`/dashboard/${id}`} className="btn btn-primary btn-block" id="bookButton">Book</a>
                    </div>)}
                </div>
                </div>
        </>
    );
}