const db = require('../db_models/postgres/db')
const bcrypt = require('bcrypt')
const env = require("../config/env");
const jwt = require('jsonwebtoken')
const config = require("../config/config.json")[env]

const register_user = async (req,res)=>{
    try { 
        console.log("bodddy", req.body)
        const searchq = `SELECT * FROM "YSS".user_details
        where email_id = '${req.body.email_id}' or facebook_id = '${req.body.facebook_id}' or google_id = '${req.body.google_id}'`
        let users =   await db.Sequelize.query(searchq)
        //console.log("user count", users, users[0].length)
        if(!users[0].length){
            let newuser = db.user_detail.create(req.body)
            console.log("reb body in registration", req.body)
            newuser.then((new_usr)=>{
                console.log("new user", new_usr.toJSON())
                if(req.body.sevadhari == true){
                    db.user_role_mapping.create({ role_id : 1 , user_id : new_usr.user_id})
                }else{
                db.user_role_mapping.create({ role_id : 0, user_id : new_usr.user_id})
                }
                res.send("user registered successfully")
            })
            .catch((e)=>{console.log("e",e)})
        }else{
            res.send("user already exists-----")
            
        }
     }catch(e){
        res.send("error in registration", e).status(500)
    }
}
const FindOrCreate = async (data) =>{
try {
    console.log("res",data)
    
   // await db.user_detail.findOne({where:{ facebook_id : data.email}})
    if( data.provider == 'facebook'){
        await db.user_detail.findOne({where:{ facebook_id : data.email}})
        .then((user)=>{
            if(!user){
                let newuser = db.user_detail.create({facebook_id :  data.email})
                newuser.then((new_usr)=>{
                    console.log("new user", new_usr.toJSON())
                    result = new_usr.toJSON().email_id
                })
                .catch((e)=>{console.log("e",e)})
            }else{
                result = 'user already exists'
                console.log(result, user)
            }})        
        .catch((e)=>{console.log("e",e)})
    }
    else if( data.provider == 'google'){
        await db.user_detail.findOne({where:{ google_id : data.email}})
        .then((user)=>{
            if(!user){
                let newuser = db.user_detail.create({google_id :  data.email})
                newuser.then((new_usr)=>{
                    console.log("new user", new_usr.toJSON())
                    result = new_usr.toJSON().email_id
                })
                .catch((e)=>{console.log("e",e)})
            }else{
                result = 'user already exists'
                console.log(result, user)
            }})        
        .catch((e)=>{console.log("e",e)})
    }
   

}catch(e){
    console.log("error in CheckUser",e)
}
}
const CheckUser = async(data)=>{
    await db.user_detail.findOne({where:{ email_id : data}})
    .then((u)=>{
        console.log("check user found", u)
        return u
        })
    .catch((e)=>{console.log("checkuser e", e)})
}
// get middleware for User ID - updated profile
const updateProfile = async (req,res)=>{
    try{
    console.log("reqqqq",req.body, req.token)
    console.log("profile================", req.user.toJSON())
    let loggedUser =  req.user.toJSON()
    await db.user_detail.findOne({where : { user_id : loggedUser.user_id}})
    .then((result)=>{
        console.log("result", result.toJSON())
        if(result){
            console.log("result11", result.toJSON())
            db.user_detail.update(
                req.body,
                {where : { user_id : loggedUser.user_id}}
            );
            if(req.body.sevadhari == true){
                db.user_role_mapping.create({ role_id : 1 , user_id : loggedUser.user_id})
            }else{
            db.user_role_mapping.create({ role_id : 0, user_id : loggedUser.user_id})
            }
        }
        res.send("user profile updated successfully")
    })
    .catch((err)=>{console.log("err",err)})
    }
    catch(e){
        res.send(e).status(500)
    }
    
}
const findemail = async(data) =>{
    return await db.Sequelize.query(`select * from "YSS".user_details where email_id = '${data.email}'`)
    
}
const verifyOTP = async(req,res) =>{
    try{
        console.log("dd", req.body)
        await db.login_otp.findOne({where : { otp : req.body.otp}})
          .then((result)=>{ 
            console.log("yyy",result.toJSON())
            let hashed_userkey = result.toJSON().user_mail
            bcrypt.compare(req.body.email + config.OTPSECRET, hashed_userkey,function(err, result) {
             if(!err){
                 console.log("ressss22", result)
                 let token =   jwt.sign({
                    data: req.body.email
                    },config.JSONWEBSECRET, { expiresIn: '12h' });
                    res.cookie('jwt', token)
                    console.log("token", token)
                    res.send("user verified")
             }else{
                 console.log("Erong Otp ", err)
                 res.send("err in verification")
             }
         })
          }).catch((e)=>{
              
            res.send("err in verification, please check OTP")
            console.log("eeeeee",e)
          })
      
        }
   catch(e){
       res.send("err in verification")
    console.log("e",e)
   }
}
module.exports = { register_user, updateProfile,FindOrCreate, CheckUser,findemail, verifyOTP}