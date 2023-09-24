import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
import './loginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function LoginPage() {
    //aos animation backage
    useEffect(()=>{
        Aos.init()
    },[])
    //handling login data
    function handlelogin(event){
        event.preventDefault()
        var user=document.getElementById("user").value
        var pass=document.getElementById("pass").value
        var key={
            username:user,
            password:pass
        }
        //form validation
        if(user==='' && pass===''){
            alert("Please Enter your Username and Password")
        }
        else if(user===''){ 
            alert("Please Enter your Username")
        }
        else if(pass===''){ 
            alert("Please Enter your Password")
        }
        else{
            axios.post('http://localhost:3009/userdb',key)
            .then((res)=>{
                if(res.data.status==="empty"){
                    alert("Finish your Registration first")
                }
                else if(res.data.status==="success"){
                    alert("Successfully Logged in")
                    window.location.href=`/dashboard/${res.data.id}`
                }
                else if(res.data.status==="invalid_pass"){
                    alert("Check your Password")
                }
                else if(res.data.status==="error"){
                    alert("Check your Username or Please Register")
                }
                else{
                    alert("Contact admin")
                }
            })
        }
    }
    return (
        <>
        <h1 data-aos="zoom-in-up" className='text-center text-info stickey-top'>Lifter</h1>
            <div className='memBody d-flex flex-column justify-content-center align-items-center'>
                <div className='row bg-white w-75 d-flex justify-content-center rounded-5'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <img data-aos="fade-right" src='https://freepngimg.com/download/laptop/162431-laptop-vector-notebook-png-free-photo.png' alt="Login" className='loginImg img-fluid' />
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div data-aos="fade-left" className='d-flex justify-content-center align-items-center p-3'>
                            <form onSubmit={handlelogin}>
                                <h4 className='text-center text-info'>Member Login</h4>
                                <div className='bgTextBox rounded-pill ps-3 mt-3'>
                                    <span><FontAwesomeIcon icon={faEnvelope} /></span> <input type='email' placeholder='Email' id='user' className='borderTextBox col-10' />
                                </div>
                                <div className='bgTextBox rounded-pill ps-3 mt-3'>
                                    <span><FontAwesomeIcon icon={faLock} /></span><input type='password' placeholder='Password' id='pass' className='borderTextBox col-10' />
                                </div>
                                <div>
                                    <input type='submit' className='col-12 btn btn-info fw-bold text-white rounded-pill mt-3 mb-3' value="LOGIN"/>
                                </div>
                                <div className='text-center'>
                                    <Link className=" text-decoration-none" to="/reg"><span className='text-success text-center'>Create your account</span></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}