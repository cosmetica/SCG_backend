var express = require('express');
var router = express.Router();



router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SCG',mvc_name: 'Express' });
});

router.get('/helloWorld', function (req, res) {
  res.render('index', { hello_world: 'Hello, World'});
});

router.get("/showBangsueRestaurants",function (req,res){
  res.render('restuarunts_in_bangsue', {data:[]})
});
router.get('/getBangsueRestaurants/:location', function (req, res) {
    console.log("location:" + req.params.location);
    var key = "AIzaSyDN2VogMc3abkzW48N1v9uTe_kKcSt2StU";
    var location = encodeURIComponent(req.params.location);
    var radius = 6000;
    var types = "cafe|restaurant";
    var fields = "photos,formatted_address,name,rating,opening_hours,geometry"
    var https = require('https');
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+key+"&location=13.82820,100.52969&radius="+radius+"&type="+types+"&fields="+fields;
    //console.log(url);
    https.get(url, function(response) {
      var body ='';
      response.on('data', function(chunk) {
        body += chunk;
      });
  
      response.on('end', function() {
        var places = JSON.parse(body);
        console.log(JSON.parse(body));
        res.send(JSON.parse(body));
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
});

router.get('/findXYZ', function(req,res){
  var htmlReturn = "";
  function sumSeries(arr){
    //document.write(arr[0]);
    for(i=0;i<arr.length;i++){
      if(typeof arr[i] == "number"){
        htmlReturn += (parseInt(3 +i +i*i) + "<br/>");
      }
      else{
        htmlReturn += (arr[i] + "=" + parseInt(3 +i +i*i) + "<br/>");
      }
    }
  };
    
  var testSet = ["X", 5, 9, 15, 23, "Y", "Z"];
  sumSeries(testSet)
  res.send(htmlReturn);
})



module.exports = router;
