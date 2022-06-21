const jwt = require('jsonwebtoken')
const db = require('../db_models/postgres/db')
const env = require("../config/env");
const config = require("../config/config.json")[env]
const auth = async(req,res, next)=>{
    try{
        let token = req.cookies;
        console.log("token in middleware", token)
        console.log("dd",config.JSONWEBSECRET)
        const decodedToekn = jwt.verify(token.jwt,config.JSONWEBSECRET)
        console.log("decodedToekn",decodedToekn)
        if(decodedToekn.data.provider == 'google'){
        console.log("ggggggg", decodedToekn.data.provider)
        const user = await db.user_detail.findOne({ where : { google_id : decodedToekn.data.email}})
        if(!user){
            return new console.error('not match');
        }
        else {
            console.log("middleware next");
            req.token = decodedToekn,
            console.log("lll", req.token)
            req.user = user
            next()
          }
        }else if(decodedToekn.data.provider == 'facebook'){ 
        console.log("fffffffff", decodedToekn.data.provider)
            const user = await db.user_detail.findOne({ where : { facebook_id : decodedToekn.data.email}})
             if(!user){
                 return new console.error('not match');
             }
             else {
                 console.log("middleware next");
                 req.token = token,
                 req.user = user
                 next()
               }
        }else{
            //need to check in email table
            console.log("middleware next");
            req.token = token,
            req.user = user
            console.log("ppppppppppp", token, user)
            next()

        }
    }
catch(e){
    res.send('no match').status(401)
}
}
module.exports= auth
