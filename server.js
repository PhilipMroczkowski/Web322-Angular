/*********************************************************************************
*  WEB322 –Assignment02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Philip Mroczkowski Student ID: 21772174 Date: 2018-11-16
*
*  Online (Heroku) Link:  https://secure-sea-97478.herokuapp.com/
*
********************************************************************************/ 

var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");
var bodyParser = require('body-parser');
var multer = require("multer");
var path = require("path");
var fs = require("fs");
const exphbs = require('express-handlebars'); // new

var http_port = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on " + http_port);
}
// new
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'main',
    helpers: {
        navLink: (url, options) => {
            return '<li' + 
                ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
                '><a href="' + url + '">' + options.fn(this) + '</a></li>';
        },
        
        equal: (lvalue, rvalue, options) => {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});
//new
app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});


app.get("/", function(req, res) {
    res.render("home"); // new
});

app.get("/about", function(req, res) {
    res.render("about"); // new
});

app.get("/employees", function(req, res) {
    if(req.query.status){
        dataService.getEmployeesByStatus(req.query.status)
        .then(function(data){
            res.render("employees", {employees: data}); // new
        })
        .catch(function(err){
            res.render({message: "no results"}); // new
        })
    }
    else if(req.query.department){
        dataService.getEmployeesByDepartment(req.query.department)
        .then(function(data){
            res.render("employees", {employees: data}); // new
        })
        .catch(function(err){
            res.render({message: "no results"}); // new
        })
    }
    else if(req.query.manager){
        dataService.getEmployeesByManager(req.query.manager)
        .then(function(data){
            res.render("employees", {employees: data}); // new
        })
        .catch(function(err){
            res.render({message: "no results"}); // new
        })
    }
    else{
        dataService.getAllEmployees()
        .then(function(data){
            res.render("employees", {employees: data}); // new
        })
        .catch(function(err){
            res.render({message: "no results"}); // new
        })
    }    
});

app.get("/employees/value", function(req, res){
    dataService.getEmployeesByNum(req.body)
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.send(err);
    });
});

app.get("/employees/add", function(req, res){
    res.render("addEmployee");
});

app.post("/employees/add", function(req, res) {
    dataService.AddEmployee(req.body)
    .then(function(data){
        res.redirect("/employees")
    })
    .catch(function(err){
        res.send(err);
    });
});
// new
app.get("/employee/:num", (req, res) => {
    var num = req.params.num;
    dataService.getEmployeesByNum(num).then((data) => {
        res.render("employee", {
            employee: data
        });
    }).catch((err) => {
        res.render("employee", {
            message: "no results"
        });
    });
});

// new
app.post("/employee/update", function(req, res) {
    dataService.updateEmployee(req.body)
    .then(function() {
      res.redirect("/employees");
    })
    .catch(function(err){
      console.log(err);
    });
});
app.get("/departments", function(req, res) {
    dataService.getDepartments()
    .then(function(data) {
        res.render("departments", {departments: data});
    })
    .catch(function(error) {
        res.json({"message": error});
    })
});


app.get("/images", function(req, res){
    fs.readdir(__dirname + "/public/images/uploaded", function(err, images){
        res.render("images", {data: images}); //new
    });
});

app.get("/images/add", function(req, res){
    res.render("addImage");
});

app.post("/images/add", upload.single("imageFile"), function(req, res) {
    res.redirect("/images");
});

app.use(function(req, res) {
    res.status(404).send("Page Not Found");
});

dataService.initialize()
.then(function() {
    app.listen(http_port, onHttpStart);
})
.catch(function() {

    console.log("unable to start server");
});