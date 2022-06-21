const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const userroute = require('./src/routes/user-routes')
const usercontroller = require('./src/controllers/user-controllers')
const dbops = require('./src/utils/db_operations')
const env = require("./src/config/env");
const config = require("./src/config/config.json")[env]
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize());
app.use(userroute)

require('./src/middleware/auth')
require('./src/db_models/mongodb/mongodb')
require('./src/db_models/postgres/db')

const jwt = require('jsonwebtoken')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = config.JSONWEBSECRET;


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("JWT BASED  VALIDATION GETTING CALLED")
    console.log("JWT", jwt_payload)
    if (  dbops.CheckUser(jwt_payload.data.email)) {
        return done(null, jwt_payload.data)
    } else {
        // user account doesnt exists in the DATA
        return done(null, false);
    }
}));

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/google/callback",
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED", profile)
      return cb(null, profile)
  }
));

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8000/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
    console.log('I should have jack ')
    cb(null, user);
});
  
  passport.deserializeUser(function(obj, cb) {
    console.log('I wont have jack shit')
    cb(null, obj);
});


const port = process.env.PORT || 8000
app.listen( port, ()=>{
    console.log(`Sever ARG0 listening on port ${port}`)
})