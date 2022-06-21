const express = require('express');
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const env = require("../config/env");
const config = require("../config/config.json")[env]
const usercontroller = require('../controllers/user-controllers')
const dbops = require('../utils/db_operations')
const auth = require('../middleware/auth');
const db = require('../db_models/postgres/db');
const login_via_email = require('../utils/email')
router.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
router.get('/auth/facebook',  passport.authenticate('facebook', {scope:'email'}))
router.post('/user/updateprofile', auth, dbops.updateProfile)
router.post('/user/register', dbops.register_user)

router.post('/auth/email',  async (req, res)=>{
try{
   console.log("req.body", req.body.email+ config.OTPSECRET )
   let userkey = req.body.email+ config.OTPSECRET
   let resultfound = dbops.findemail(req.body)
   resultfound.then((u)=>{
    console.log("UU", u[0].length)
    if(!u[0].length)
    {
        let content = login_via_email.generateOTP(6)
        login_via_email.sendEmail({
                    subject: "login to KBS_YUVA",
                    text: `your 6 digit OTP is ${content}`,
                    to: req.body.email,
                    from: 'yssdeveloper22@gmail'
                  })
      
        bcrypt.hash(userkey, 10, function(err, hash) {
            if(err){
                console.log("err in hash", err)
            }else{
                db.login_otp.create({
                    otp : content,
                    user_mail : hash,
                })
            }
        });
       
        res.send({"Status":"Success"})
    }else{
        res.send('email ID already registered')
    }}).catch((e)=>{
        res.send('rejected')
    console.log("ee", e)
   })
}
catch(e){
    res.send('in catch block')
    console.log("in catch block",e)
}
  
})
router.post('/user/verifyOtp', dbops.verifyOTP)
router.get('/profile', passport.authenticate('jwt', { session: false }) ,(req,res)=>{
    res.send(`THIS IS UR PROFILE  ${req.user.email}`)
})
router.get('/google/callback', passport.authenticate('google'), (req, res)=>{
    console.log('redirected', req.user)
    let user = {
        email: req.user._json.email,
        provider: req.user.provider
       }
    console.log(user)

    dbops.FindOrCreate(user)
 
    let token = jwt.sign({
        data: user
        }, config.JSONWEBSECRET, { expiresIn: '12h' });
    res.cookie('jwt', token)
    console.log("token", token)
    res.redirect('/profile')
})
router.get('/facebook/callback', passport.authenticate('facebook', {scope: 'email'}),(req, res)=>{
    console.log('redirected', req.user)
    let user = {
        email: req.user._json.email,
        provider: req.user.provider }
    console.log(user)  

    dbops.FindOrCreate(user)
    let token = jwt.sign({
        data: user
        }, config.JSONWEBSECRET, { expiresIn: '1hr' });
    res.cookie('jwt', token)
    res.redirect('/profile')
})
router.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    res.end()
})

module.exports = router