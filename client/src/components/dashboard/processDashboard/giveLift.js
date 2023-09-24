import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import './lift.css'
export function GiveLift() {
    var { id } = useParams()
    function handlegodata(event) {
        event.preventDefault()
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
        if (from != '' && to != '' && date != '' && time != '') {
            axios.post('http://localhost:3009/insertglift', key)
                .then((res) => {
                    if (res.data.status === "error") {
                        alert("data are not inserted")
                        window.location.reload()
                    }
                    else if (res.data.status === "success") {
                        alert("data are inserted")
                        window.location.href = `/dashboard/${id}`
                    }
                })
        }
        else {
            alert('Please Enter data on all the fields')
        }
    }
    return (
        <>
            <form onSubmit={handlegodata}>
                <div className="gbody">
                    <div class="container">
                        <div class="form-container">
                            <h1 class="text-center text-info">Give a Lift</h1>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="lifterFrom" placeholder="place" />
                                <label for="lifterFrom">From</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="lifterTo" placeholder="place" />
                                <label for="lifterTo">To</label>
                            </div>
                            <div>
                                <label for="travelDate">Departure Date</label>
                                <input type="date" id="travelDate" class="form-control" />
                                <label for="travelDate">Departure Time</label>
                                <input type="time" id="travelTime" class="form-control" />
                            </div>
                            <button class="btn btn-primary mt-3" type="submit">Lifter</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}