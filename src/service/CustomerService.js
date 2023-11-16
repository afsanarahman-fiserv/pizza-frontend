import React from "react";
import axios from 'axios';

// DOUBLE CHECK IF URL IS CORRECT
const getAllCustomersUrl = "http://localhost:8080/api/customers";
const addCustomerUrl = "http://localhost:8080/api/addCustomer";

class CustomerService {
    
    getAllCustomers() {
        return axios.get(getAllCustomersUrl);
    }

    addCustomer(customer) {
        return axios.post(addCustomerUrl, employee);
    }
}

export default new EmployeeService();