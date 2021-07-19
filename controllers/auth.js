require("dotenv").config();
const axios = require('axios');

exports.getToken = (req, res) => {
    axios.post(
        `https://us.battle.net/oauth/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`
      )
      .then((itm) => {
        if(itm){
          return res.status(200).json({
            success: true,
            result: itm.data,
          });
        }else{
          return res.status(400).json({
            success: false,
            result: "THERE WAS AN ERROR"
          })
        }
        
      })
      .catch((err) => {
          console.error(err)
      })
}