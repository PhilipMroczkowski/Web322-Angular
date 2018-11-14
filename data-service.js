var fs = require("fs");

var employees = [];
var departments = [];

module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./data/employees.json', 'utf8', (err, data) => {
            if (err) {
                reject("Cannot read file");
                return;
            }

            employees = JSON.parse(data);
        });
        
        fs.readFile('./data/departments.json', 'utf8', (err,data) => {
            if (err) {
                reject("Cannot read file");
                return;
            }
                
            departments = JSON.parse(data);
        });

        resolve();
            
    });
}

module.exports.getManagers = function() {
    return new Promise(function(resolve, reject) {
        var managers = [];   

        if(employees.length == 0) {
            reject("No results available");
        }
        else {
            for(var count = 0; count < employees.length; count++) {
                if (employees[count].isManager == true) {
                    managers.push(employees[count]);
                }
            }

            (managers.length == 0)? reject("No results available"):resolve(managers);
        }
    });
}

module.exports.getDepartments = function() {
    return new Promise(function(resolve, reject) {
        if(departments.length == 0) { 
            reject("No results available"); 
        }
        else { resolve(departments); }
    });
}

module.exports.AddEmployee = function(employeeData) { // new
    return new Promise(function(resolve, reject){
        if(employeeData.isManager == null){
            employeeData.isManager = false;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }else{
            employeeData.isManager = true;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }
    });
}

module.exports.getAllEmployees = function() {
    return new Promise(function(resolve, reject) {
        if(employees.length == 0) {
            reject("No results available");
        }
        else {
            resolve(employees);
        }
    });
}

module.exports.getEmployeesByStatus = function(status){
    return new Promise(function(resolve, reject){
        var statusEmployees = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].status == status){
                statusEmployees.push(employees[i]);
            }
        }
        if(statusEmployees.length == 0){
            reject("No results returned");
        }
        else{
            resolve(statusEmployees);
        }
    });
}

module.exports.getEmployeesByDepartment = function(department){
    return new Promise(function(resolve, reject){
        var departmentList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].department == department){
                departmentList.push(employees[i]);
            }
        }
        if(departmentList.length == 0){
            reject("No results returned");
        }
        else{
            resolve(departmentList);            
        }
    });
}

module.exports.getEmployeesByManager = function(manager){
    return new Promise(function(resolve, reject){
        var managerList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].employeeManagerNum == manager){
                managerList.push(employees[i]);
            }
        }
        if(managerList.length == 0){
            reject("No results returned");
        }
        else{
            resolve(managerList);
            
        }
    });
}

module.exports.getEmployeesByNum = (num) => {
    return new Promise ((resolve, reject) => {
        for (let i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num) {
                resolve(employees[i]);
            }
        }
        reject("This Employee does not exist");
    });
}
// new
module.exports.updateEmployee = function(employeeData) {
    return new Promise(function(resolve,reject) {
        try {
            for (let i = 0; i < employees.length; i++) {
                if (employees[i].employeeNum == employeeData.employeeNum) {
                    employees[i] = employeeData;
                }
            }
        } catch(ex) {
            reject("Failed to Update Employee");
        }

        resolve();
    });
}