const fast2sms = require("fast-two-sms");
exports.generateOTP = (otp_length) => {
otp_length = 6
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  console.log("ooo", OTP)
  return OTP;
};

// exports.fast2sms = async ({ message, contactNumber }) => {
//   try {
//     const res = await fast2sms.sendMessage({
//       authorization: 'rDRXWH1CZfqmt0PgRhSEg2tRSDqJYxrBG3nyuZCTbpyhNwuXSFxmjfblCoxJ',
//       message: "hello world",
//       numbers: [8349521229],
//     });
//     console.log("response",res);
//   } catch (error) {
//     console.log(error);
//     //next(error);
//   }
// };



const { Auth } = require("two-step-auth");
  
 async function login(emailId) {
  const res = await Auth(emailId);
  // You can follow this approach,
  // but the second approach is suggested,
  // as the mails will be treated as important
  const res2 = await Auth(emailId, "Company Name");
  console.log(res);
  console.log(res.mail);
  console.log(res.OTP);
  console.log(res.success);
}
  
//login("deepanshudhurwey2022@gmail.com");
//generateOTP(9)


const now = new Date();
function AddMinutesToDate(date, minutes) {
  console.log("ppp",new Date(date.getTime()),new Date(date.getTime() + minutes*60000))
  return new Date(date.getTime() + minutes*60000);
}
AddMinutesToDate(now,1)