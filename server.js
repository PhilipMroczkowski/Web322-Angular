/*********************************************************************************
*  WEB322 –Assignment02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Philip Mroczkowski Student ID: 21772174 Date: 2018-10-03
*
*  Online (Heroku) Link:  https://secure-sea-97478.herokuapp.com/
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise (function(res,req){
    data_service.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});
}

// Load CSS file
app.use(express.static('public'));

app.get("/", function(req,res){

   res.sendFile(path.join(__dirname + "/views/home.html"));
});

app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", function(req,res){

    if(req.query.status){
      data_service.getEmployeesByStatus(req.query.status).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }else if(req.query.department){
      data_service.getEmployeesByDepartment(req.query.department).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }else if(req.query.manager){
      data_service.getEmployeesByManager(req.query.manager).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }else{
      data_service.getAllEmployees().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
    }
});

app.get("/employee/:num", function(req,res){
  data_service.getEmployeeByNum(req.params.num).then(function(data){
    res.json(data);
  }).catch(function(err){
      res.json({message: err});
  });
});

app.get("/managers", function(req, res)
{
    res.json(dataService.getManagers);
      }).catch(function(err){
        res.json({message: err});
      });


app.get("/departments", function(req,res){
      data_service.getDepartments().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json({message: err});
      });
});

app.use(function(req, res) {
  res.status(404).send("Sorry, Page Not Found! ");
});

app.listen(HTTP_PORT, onHttpStart);