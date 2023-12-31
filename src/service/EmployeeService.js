import React from "react";
import axios from 'axios';

const getAllEmployeesUrl = "http://localhost:8080/api/employees";
const getEmployeeUrl = "http://localhost:8080/api/employee/";
const addEmployeeUrl = "http://localhost:8080/api/addEmployee";
const updateEmployeeUrl = "http://localhost:8080/api/updateEmployee";
const deactivateEmployeeUrl = "http://localhost:8080/api/updateEmployee";

class EmployeeService {
    
    getAllEmployees() {
        return axios.get(getAllEmployeesUrl);
    }

    findEmployee(id) {
        return axios.get(getEmployeeUrl + id);
    }

    addEmployee(employee) {
        return axios.post(addEmployeeUrl, employee);
    }

    updateEmployee(employee) {
        return axios.put(updateEmployeeUrl, employee);
    }

    deactivateEmployee(employee) {
        return axios.put(updateEmployeeUrl, employee);
    }

}

export default new EmployeeService();