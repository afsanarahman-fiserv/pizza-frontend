import React from "react";
import axios from 'axios';

const getAllEmployeesUrl = "http://localhost:8080/api/employees";
const addEmployeeUrl = "http://localhost:8080/api/addEmployee";
const updateEmployeeUrl = "http://localhost:8080/api/updateEmployee";
const deleteEmployeeUrl = "http://localhost:8080/api/deleteEmployee";

class EmployeeService {
    
    getAllEmployees() {
        return axios.get(getAllEmployeesUrl);
    }

    addEmployee() {

    }

    updateEmployee() {

    }

    deleteEmployee() {

    }

}

export default new EmployeeService();