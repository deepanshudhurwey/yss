const nodemailer = require('nodemailer')
const {google} = require('googleapis');
const OAuth2 =google.auth.OAuth2;
const env = require("../config/env");
const config = require("../config/config.json")[env]

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      config.client_id_email,
      config.client_secret_email,
      config.redirected_url
    );
    oauth2Client.setCredentials({
       refresh_token : config.refresh_token
   });
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
            console.log("reject======================================================================", err)
          reject();
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "yssdeveloper22@gmail.com",
        accessToken : accessToken,
        clientId: config.client_id_email,
        clientSecret: config.client_secret_email,
        refresh_token: config.refresh_token
  
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    return transporter;
  };
const sendEmail = async (emailOptions) => {
      try{
    let emailTransporter = await createTransporter();
    await emailTransporter.sendMail(emailOptions);
      }catch(e){
          console.log("ee", e)
      }
  };
const generateOTP = (otp_length) => {
    otp_length = 6
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < otp_length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      console.log("ooo", OTP)
      return OTP;
    };
const AddMinutesToDate = (date, minutes)=>{

  console.log("ppp",new Date(date.getTime()),new Date(date.getTime() + minutes*60000))
  return new Date(date.getTime() + minutes*60000);
}
module.exports = {sendEmail, generateOTP, AddMinutesToDate}