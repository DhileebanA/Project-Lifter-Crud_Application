const express = require("express")
const crud = require("cors")
const encoder = require("body-parser")
const database = require("mysql")

const connect = express()

connect.use(crud())
connect.use(encoder.json())
connect.use(express.json())
connect.use(express.static("public"))
connect.use(encoder.urlencoded({extended:true}))

let dbconnect = database.createConnection({
    host:"localhost",
    port:3306,
    user: "root",
    password: 'A9360297756a@',
    database:"lifter"
})

dbconnect.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("successfully connected")
    }
})
//user's data insert
connect.post('/insertUser',(request,response)=>{
    let {getVeh}=request.body
    if(getVeh){
        let {userName,userEmail,userPass,userMob,userAad,userVehNo,userChNo,userInNo}=request.body
        let sql='insert into user_details (uname,uemail,upass,umob,uAadhar,uvehicle,uchassis,uInsurance) values(?,?,?,?,?,?,?,?)'
        dbconnect.query(sql,[userName,userEmail,userPass,userMob,userAad,userVehNo,userChNo,userInNo],(error,result)=>{
            if(error){
                response.send({"status":"error"})
            }
            else{
                response.send({"status":"success"})
            }
        })
    }
    else{
        let {userName,userEmail,userPass,userMob,userAad}=request.body
        let sql='insert into user_details (uname,uemail,upass,umob,uAadhar) values(?,?,?,?,?)'
        dbconnect.query(sql,[userName,userEmail,userPass,userMob,userAad],(error,result)=>{
            if(error){
                response.send({"status":"error"})
            }
            else{
                response.send({"status":"success"})
            }
        })
    }
})
// get user data using email
connect.post('/userdb',(request,response)=>{
    let {username,password}=request.body
    let sql='select * from user_details where uemail=?'
    dbconnect.query(sql,[username],(error,result)=>{
        if(error){
            response.send({"status":"empty"})
        }
        else if(result.length>0){
            let dbuser=result[0].uemail
            let dbpass=result[0].upass
            if(dbuser===username && dbpass===password){
                let id=result[0].user_id
                response.send({"status":"success","id":id})
            }
            else if(dbuser==username && dbpass!=password){
                response.send({"status":"invalid_pass"})
            }
        }
        else{
            response.send({"status":"error"})
        }
    })
})
// get user data using id
connect.get('/singleUser/:id',(request,response)=>{
    let {id}=request.params
    let sql='select * from user_details where user_id=?'
    dbconnect.query(sql,[id],(error,result)=>{
    if(error){
        response.send(error)
    }
    else{
        response.send(result)
    }
    })
})
//insert give lift details
connect.post('/insertglift',(request,response)=>{
    let {from,to,date,time,id}=request.body
    let sql='insert into glift (depfrom,depto,depdate,deptime,user_id) values(?,?,?,?,?)'
    dbconnect.query(sql,[from,to,date,time,id],(error,result)=>{
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})
// get lifter details using user id
connect.get('/lifterdet/:id',(request,response)=>{
    let {id}=request.params
    let sql='select * from glift where user_id=?'
    dbconnect.query(sql,[id],(error,result)=>{
    if(error){
        response.send(error)
    }
    else{
        response.send(result)
    }
    })
})
// get lifter details
connect.get('/getlifter',(request,response)=>{
    let sql="select * from glift"
    dbconnect.query(sql,(error,result)=>{
    if(error){
        response.send(error)
    }
    else{
        response.send(result)
    }
    })
})
// delete from travel table
connect.post('/deleteglift',(request,response)=>{
    let {id}=request.body
    let sql='delete from glift where user_id=?'
    dbconnect.query(sql,[id],(error,result)=>{
        if(error){
            response.send({"status":"error"})
        }
        else{
            response.send({"status":"success"})
        }
    })
})
// update existing user details
connect.put('/updateUser',(request,response)=>{
    let {getVeh}=request.body
    if(getVeh){
        let {userName,userEmail,userPass,userMob,userAad,userVehNo,userChNo,userInNo,id}=request.body
        let sql='update user_details set uname=?,uemail=?,upass=?,umob=?,uAadhar=?,uvehicle=?,uchassis=?,uInsurance=? where user_id=?'
        dbconnect.query(sql,[userName,userEmail,userPass,userMob,userAad,userVehNo,userChNo,userInNo,id],(error,result)=>{
            if(error){
                response.send({"status":"error"})
            }
            else{
                response.send({"status":"success"})
            }
        })
    }
    else{
        let {userName,userEmail,userPass,userMob,userAad,id}=request.body
        let sql='update user_details set uname=?,uemail=?,upass=?,umob=?,uAadhar=? where user_id=?'
        dbconnect.query(sql,[userName,userEmail,userPass,userMob,userAad,id],(error,result)=>{
            if(error){
                response.send({"status":"error"})
            }
            else{
                response.send({"status":"success"})
            }
        })
    }
})
connect.listen(3009,()=>{
    console.log("Your Server is running in '3009' port")
})