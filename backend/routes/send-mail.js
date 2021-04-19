const express = require('express');
const router = express.Router({mergeParams: true});
const nodemail = require('./mailingService/mailer');

router.post('/', async (req, res) => {

  const details = req.body.details;
  const subject = "@Home Dashboard Invite";

  const invite = Math.floor(Math.random() * 1000000000000);
  const params = `?i=${invite}&d=${details.id}`;

  const link = process.env.NODE_ENV !== 'production' ? 
  `http://localhost:3030${params}` : 
  `https://dashboard-310905.wl.r.appspot.com/${params}`;

  const body = `
  <div style='display:block; margin:auto; width:300px; height:auto; border-style: solid; border-width:1px; border-color:lightgrey; padding:20px; text-align:center; border-radius:5px; '>
  <h3>
  ${details.name} has sent you an <a style='color: rgb(128, 118, 251);' href='${link}'>@Home</a> dashboard invite. 
  </h3>
  <br>
  <button style='outline-color:transparent; cursor:pointer; color:white; background-color:rgb(128, 118, 251); display:block; margin:auto; margin-bottom:15px; padding:15px; width:100px; border:none; border-radius: 5px;'><a style='color:white; text-decoration:none;' href='${link}'>ACCEPT</a></button>
  </div>`;
  
  try{
    await nodemail.letter(details.name, details.recipient, subject, body);
    res.sendStatus(200);
  } catch(err) {
    console.log('Failed to send invite: ', err);
    res.sendStatus(500);
  }
});

module.exports = router;



