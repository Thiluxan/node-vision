var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk')
require('dotenv').config()

router.post('/classify', function(req, res, next) {

  // Your code starts here //
  AWS.config.update({
    accessKeyId:process.env.ACCESS_KEY,
    secretAccessKey:process.env.SECRET_KEY,
    region:'ap-southeast-2'
  })

  var recoknition = new AWS.Rekognition()

  var params = {
    Image: {
        Bytes:req.files.file.data
    },
    MaxLabels:20,
    MinConfidence:80
  };

  recoknition.detectLabels(params,  (err, data) => {
      if(err){
          res.status(500).json({"error":"Unable to process the request"});
      } else{
          var response = [];
          data.Labels.map(label => {response.push(label.Name)})
          res.status(200).json({"labels":response})
      }
  })

  // Your code ends here //

});

module.exports = router;
