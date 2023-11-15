import React from "react";
import axios from 'axios';

const getAllEmployeesUrl = "http://localhost:8080/api/employees";
const addEmployeeUrl = "http://localhost:8080/api/addEmployee";
const updateEmployeeUrl = "http://localhost:8080/api/updateEmployee";
const deactivateEmployeeUrl = "http://localhost:8080/api/updateEmployee";

class EmployeeService {
    
    getAllEmployees() {
        return axios.get(getAllEmployeesUrl);
    }

    addEmployee(employee) {
        return axios.post(addEmployeeUrl, employee);
    }

    updateEmployee() {

    }

    deactivateEmployee() {

    }

}

export default new EmployeeService();