var fs = require("fs");

var employess = []; 
var departments = []; 

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) throw err;
                employess = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err,data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("successfully read JSON file.");
    });
}

module.exports.getAllEmployees = function(){
    var arryAllEmployees=[];
    return new Promise(function(resolve,reject){
        for (var i = 0; i < employess.length; i++) {
            arryAllEmployees.push(employess[i]);
        }
        if (arryAllEmployees.length == 0){
            reject("No Result Returned");
        }
    resolve(arryAllEmployees);
    })
}

module.exports.getEmployeesByStatus = function(status){
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employess.length; i++){
            if(employess[i].status == status){
                arryByStatus.push(employess[i]);
            }
        }
        if (arryByStatus.length == 0){
            reject("No Result Returned");
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department){
    var arryByDepartment = [];
    return new Promise(function(resolve,reject){
        for(let i = 0; i < employess.length; i++){
            if(employess[i].department == department){
                arryByDepartment.push(employess[i]);
            }
        }
        if(arryByDepartment.length == 0){
            reject("No Result Returned");
        }
    resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) {
    var managers = [];

    return new Promise(function(resolve,reject) {
        for (var i = 0; i < employess.length; i++) {
            if (employess[i].employeeManagerNum == manager) {
                managers.push(employess[i]);
            }
        }
        if (managers.length == 0 ) {
            reject("No Result Returned");
        }
    resolve(managers);
    });
}

module.exports.getEmployeeByNum = function(num) {
    return new Promise(function(resolve,reject){
        for(let j = 0; j < employess.length; j++){
            if(employess[j].employeeNum == num){
                resolve(employess[j]);
            }
        }
    reject("No Result Returned");
    });
}

module.exports.getManagers = function() {
    var arryGetManagers = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned");
        }else{
            for (var q = 0; q < employess.length; q++) {
                 if (employess[q].isManager == true) {
                    arryGetManagers.push(employess[q]);       
                 }
            }
            if (arryGetManagers.length == 0) {
                     reject("No Result Returned");
             }
        }
        resolve(arryGetManagers);
     });
}

module.exports.getDepartments = function() {
    var arryGetDepartments = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned");
        }else{
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);       
            }
            if (arryGetDepartments.length == 0) {
                reject("No Result Return");
            }
        }
    resolve(arryGetDepartments);
    });
}